import {environment} from '../../environments/environment';

export class User {
  public firstName: string;
  public lastName: string;
  public email: string;
  public debug: boolean = false;
  public subscribedToFeedback: boolean = false;
  public role: string;
  public company: string;
  public companyInternalId: string;
  public isUserInitialized: boolean = false;
  public id: string;
  public updateUserClicked: boolean = false;
  public deleteUserClicked: boolean = false;
  public cancelDeleteUserClicked: boolean = false;
  public visible: boolean = true;
  public token: string;
  public password: string;
  public user_id: string;
  public username: string;
  public refresh_token: string;

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }

  // public API
  setUser(user: Partial<User>): void {
    Object.assign(this, user);
  }

  public get isAdmin(): boolean {
    return this.role === environment.C_ADMIN;
  }

  public get isYamasee(): boolean {
    return this.company && this.company === environment.C_YAMASEE_COMPANY;
  }

  public get isPilot(): boolean {
    return this.role === environment.C_PILOT;
  }

  public get isDispatcher(): boolean {
    return this.role === environment.C_DISPATCHER;
  }
}
