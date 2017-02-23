import { Injectable } from '@angular/core';
import { Session } from "../shared/templates";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class UserService {
  private session: Session;

  constructor(private auth: AuthService) {
    // TODO: do token stuff and fill session values
  }

}
