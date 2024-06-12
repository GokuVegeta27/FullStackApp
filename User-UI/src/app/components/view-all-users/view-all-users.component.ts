import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { catchError, throwError } from 'rxjs';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-view-all-users',
  standalone: true,
  imports: [],
  templateUrl: './view-all-users.component.html',
  styleUrl: './view-all-users.component.css',
})
export class ViewAllUsersComponent implements OnInit {
  userList: any[] = [];
  private userService = inject(UserService);
  errorMessage: string = '';
  @Output('edituser') editUser: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {
    this.userService
      .getUsers()
      .pipe(
        catchError((error) => {
          this.errorMessage =
            'Error fetching user list. Please try again later.';
          this.errorTimer();
          return throwError(error);
        })
      )
      .subscribe((res: any) => {
        this.userList = res;
      });
  }

  updateuser(data: any) {
    this.editUser.emit(data);
  }

  deleteUser(userId: string) {
    this.userService
      .deleteUser(userId)
      .pipe(
        catchError((error) => {
          this.errorMessage = 'Error deleting user. Please try again later.';
          console.log(this.errorMessage);
          this.errorTimer();
          return throwError(error);
        })
      )
      .subscribe((res: any) => {
        console.log(res);
        this.getUserList();
      });
  }
  generatePDF(action = 'open') {
    let docDefinition = {
      content: [
        {
          text: "User's Table",
          style: 'header',
          tocItem: true,
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['Name', 'Email', 'PhoneNumber', 'Address'],
              ...this.userList.map((user) => [
                user.name,
                user.email,
                user.phoneNumber,
                user.address,
              ]),
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true,
        },
        anotherStyle: {
          italics: true,
          // alignment: 'right'
        },
      },
    };
    if (action === 'download') {
      pdfMake.createPdf(docDefinition).download('users-list.pdf');
    } else if (action === 'print') {
      pdfMake.createPdf(docDefinition).print();
    } else {
      pdfMake.createPdf(docDefinition).open();
    }
  }

  errorTimer() {
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}
