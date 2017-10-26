import { Injectable, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import 'rxjs/add/observable/combineLatest';
import { Observable } from 'rxjs/Observable';
import { Project } from '../core/models/project.model';
import { Sale } from '../core/models/sale.model';
import { Team } from '../core/models/team.model';

import { ObservableResourceList } from '../core/observable-resource-list';
import { LeaderboardService } from '../core/services/leaderboard.service';
import { SocketApiService } from '../core/socket-api.service';
import { ActiveMembershipService } from './active-membership.service';
import { DatepickerService } from './shared/datepicker/datepicker.service';

@Injectable()
export class ProjectListService extends ObservableResourceList implements OnDestroy {
  readonly projects: Observable<Project[]> = this.subject.asObservable();

  constructor(private sockets: SocketApiService,
              private activeMembershipService: ActiveMembershipService,
              private leaderboardService: LeaderboardService,
              private datepicker: DatepickerService) {
    super();

    this.socketSubscription = this.sockets.connects.subscribe(() => {
      this.sockets.stopListening(this);

      this.activeMembershipService.membership.subscribe(membership => {
        this.datepicker.range.distinctUntilChanged().subscribe(range => {
          const [after, before] = range;
          this.leaderboardService.projects(membership.organizationId, moment(after).startOf('day'), moment(before).endOf('day')).subscribe(projects => {
            this.set(projects);
          });
        });

        this.sockets.listenForOrganization(membership.organizationId, {
          'project_created': project => this.addProject(project),
          'project_updated': project => this.updateProject(project),
          'sale_registered': sale => this.addSale(sale),
          'sale_deleted': sale => this.removeSale(sale)
        }, this);
      });
    });
  }

  ngOnDestroy(): void {
    this.sockets.stopListening(this);
    super.ngOnDestroy();
  }

  protected updateFromSnapshot() {
    this.snapshot = this.sortProjects(this.snapshot.map(project => {
      project.teams = this.sortTeams(project.teams).map(team => {
        return { ...team, position: this.calculatePosition(project.teams, team) };
      });
      return project;
    }));

    super.updateFromSnapshot();
  }

  protected sortProjects(projects: Project[]): Project[] {
    return projects.sort((previous, current) => {
      if (previous.value > current.value) {
        return -1;
      } else if (previous.value < current.value) {
        return 1;
      } else {
        return current.teams.length > previous.teams.length ? 1 : -1;
      }
    });
  }

  protected sortTeams(teams: Team[]): Team[] {
    return teams.sort((previous, current) => {
      if (previous.value > current.value) {
        return -1;
      } else if (previous.value < current.value) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  private calculatePosition(teams: Team[], team: Team): number {
    const index = teams.indexOf(team);
    return teams.reduce((value, current) => {
      return teams.indexOf(current) >= index || current.value === team.value ? value : value + 1;
    }, 1);
  }

  private addProject(project: Project) {
    this.snapshot.push(project);
    this.updateFromSnapshot();
  }

  private updateProject(project: Project) {
    this.snapshot = this.snapshot.map(item => item.id === project.id ? { ...item, ...project } : item);
    this.updateFromSnapshot();
  }

  private addSale(sale: Sale) {
    const project = this.snapshot.find(item => item.id === sale.projectId);
    if (project) {
      project.value += project.type === 'count' ? 1 : sale.value;

      project.teams = project.teams.map(team => {
        if (team.id !== sale.teamId) {
          return team;
        }

        team.value += project.type === 'count' ? 1 : sale.value;
        return team;
      });

      this.updateFromSnapshot();
    }
  }

  private removeSale(sale: Sale) {
    const project = this.snapshot.find(item => item.id === sale.projectId);
    if (project) {
      project.value -= project.type === 'count' ? 1 : sale.value;

      project.teams = project.teams.map(team => {
        if (team.id !== sale.teamId) {
          return team;
        }

        team.value -= project.type === 'count' ? 1 : sale.value;
        return team;
      });

      this.updateFromSnapshot();
    }
  }
}