import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
})
export class AddUserComponent implements OnInit {
  private userService = inject(UserService);
  userForm!: FormGroup;
  @Output('loadUsers') loadUsers: EventEmitter<any> = new EventEmitter();

  userInfo: any = {};
  submitted: boolean = false;
  updateStatus: boolean = false;
  errorMessage: string = '';
  ngOnInit(): void {
    this.userForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      userEmail: new FormControl('', [Validators.required, Validators.email]),
      userPhoneNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      userAddress: new FormControl('', Validators.required),
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }

  cancelUpdate() {
    this.updateStatus = false;
    this.userForm.reset();
  }
  setuserInfo(data: any) {
    this.submitted = false;
    this.updateStatus = true;
    this.userInfo = data;
    this.userForm.controls['userName'].setValue(data.name);
    this.userForm.controls['userEmail'].setValue(data.email);
    this.userForm.controls['userPhoneNumber'].setValue(data.phoneNumber);
    this.userForm.controls['userAddress'].setValue(data.address);
  }
  createUser() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    this.userInfo.name = this.userForm.value.userName;
    this.userInfo.email = this.userForm.value.userEmail;
    this.userInfo.phoneNumber = this.userForm.value.userPhoneNumber;
    this.userInfo.address = this.userForm.value.userAddress;
    this.userService
      .addUser(this.userInfo)
      .pipe(
        catchError((error) => {
          this.errorMessage =
            'Error while Creating user . Please try again later.';
          this.errorTimer();
          return throwError(error);
        })
      )
      .subscribe((res) => {
        this.submitted = false;
        this.userForm.reset();
        this.loadUsers.emit();
      });
  }

  updateUserInfo() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    this.userInfo.name = this.userForm.value.userName;
    this.userInfo.email = this.userForm.value.userEmail;
    this.userInfo.phoneNumber = this.userForm.value.userPhone;
    this.userInfo.address = this.userForm.value.userAddress;
    this.userService
      .updateUser(this.userInfo.id, this.userInfo)
      .subscribe((res) => {
        this.submitted = false;
        this.loadUsers.emit();
        this.updateStatus = false;
        this.userForm.reset();
      });
  }

  errorTimer() {
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }

  validateNumber(event: any) {
    const keyCode = event.keyCode;

    const excludedKeys = [8, 37, 39, 46];

    if (
      !(
        (keyCode >= 48 && keyCode <= 57) ||
        (keyCode >= 96 && keyCode <= 105) ||
        excludedKeys.includes(keyCode)
      )
    ) {
      event.preventDefault();
    }
  }

  validateAlphabet(event: any) {
    const keyCode = event.keyCode;

    const excludedKeys = [8, 37, 39, 46];

    if (!((keyCode >= 65 && keyCode <= 90) || excludedKeys.includes(keyCode))) {
      event.preventDefault();
    }
  }

  onPaste(event: any) {
    event.preventDefault();
    return false;
  }
}
