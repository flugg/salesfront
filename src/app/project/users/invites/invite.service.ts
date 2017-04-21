import { Injectable } from '@angular/core';
import { RestApiService } from '../../../core/rest-api.service';
import { Paginator } from '../../../core/paginator.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '../../../core/models/user.model';
import { Observable } from 'rxjs/Observable';
import { ResourceSubject } from '../../../core/utils/subjects/resource-subject';
import { SocketApiService } from '../../../core/socket-api.service';

@Injectable()
export class InviteService {
    /**
     * Construct the service.
     */
    constructor(private api: RestApiService,
                private sockets: SocketApiService,
                private paginator: Paginator) {
    }

    /**
     * Fetch a list of the account's users.
     */
    get(cursor: BehaviorSubject<number>): Observable<User[]> {
        const invites = this.paginator.paginate('invites', cursor);

        return invites.asObservable();
    }

    /**
     * Fetch an updating stream of the users belonging to a project.
     */
    getWithUpdates(projectId: string, cursor: BehaviorSubject<number>): Observable<User[]> {
        const invites = this.paginator.paginate(`projects/${projectId}/invites`, cursor, {include: 'project'});

        this.onInvite(projectId, invite => invites.prepend(invite));
            // .on

        return invites.asObservable();
    }

    /**
     * Fetch an updating stream of the users belonging to an account.
     */
    getAllWithUpdates(cursor: BehaviorSubject<number>): Observable<User[]> {
        const invites = this.paginator.paginate('invites', cursor);

        return invites.asObservable();
    }

    /**
     * Fetch an invite by id.
     */
    find(id: string): Observable<User> {
        return this.api.get(`invites/${id}`).map(response => response.data);
    }

    /**
     * Fetch an updating stream of a single user by id.
     */
    findWithUpdates(id: string): Observable<User> {
        const invite = new ResourceSubject(null);

        this.find(id).subscribe(data => {
            invite.next(data);
        });

        return invite.asObservable();
    }

    /**
     * Sends an invite to another user to join this project
     * */
    invite(user: User, projectId: string) {
        return this.api.post(`/projects/${projectId}/invites`, user).then(response => response.data);
    }

    /**
     * Registers a listener for new invites.
     * */
    onInvite(projectId: string, callback: Function) {
        this.sockets.listenForProject(projectId, 'invite_sent', invite => callback(invite));
    }

    /**
     * Registers a listener for new accepted invites
     * */
    onInviteAccepted(projectId: string, callback: Function) {
        this.sockets.listenForProject(projectId, 'member_added', invite => callback(invite));
    }

    /**
     * Registers a listener for new invites.
     * */
    onInviteCancelled(projectId: string, callback: Function) {
        this.sockets.listenForProject(projectId, 'invite_cancelled', invite => callback(invite));
    }
}
