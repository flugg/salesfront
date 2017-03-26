import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { project } from '../../shared/templates';
import { Router } from '@angular/router';

@Component({
  selector: 'sf-projectslist',
  templateUrl: './projectslist.component.html',
  styleUrls: ['./projectslist.component.css'],
})
export class ProjectslistComponent implements OnInit {
  private projects;

  constructor(private service: ProjectService, private router: Router) {
  }

  ngOnInit() {
    this.service.all().subscribe(p => this.projects = p);
    this.projects = [];
    this.projects.push(new project('name', 'image'));
  }

  chooseProject(id) {
    console.log(id);
    localStorage.setItem('current_project', id);
    this.router.navigateByUrl('/projects/' + id);
  }

}
