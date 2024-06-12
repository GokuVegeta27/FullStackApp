import { Component, ViewChild } from '@angular/core';
import { AddUserComponent } from '../add-user/add-user.component';
import { ViewAllUsersComponent } from '../view-all-users/view-all-users.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AddUserComponent, ViewAllUsersComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  @ViewChild(ViewAllUsersComponent) viewUsers!: ViewAllUsersComponent;
  @ViewChild(AddUserComponent) eidtUser!: AddUserComponent;

  modalStatus: boolean = false;
  loadUsers() {
    this.viewUsers.getUserList();
  }

  edituser(e: any) {
    this.eidtUser.setuserInfo(e);
  }
}
