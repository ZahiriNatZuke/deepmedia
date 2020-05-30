import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CrudService} from '../../../services/crud.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../../services/notification.service';
import {AuthenticationService} from '../../../services/authentication.service';
import {faCopy, faLock} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public resetPasswordForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    array_numbers: ['', [Validators.required]],
    first_word: ['', [Validators.required]],
    second_word: ['', [Validators.required]],
    third_word: ['', [Validators.required]],
  });
  faLock = faLock;
  faCopy = faCopy;
  randomNumbers: number[] = new Array(3);
  passwordRestored: boolean;
  newPassword: string;

  constructor(private formBuilder: FormBuilder,
              private crudService: CrudService,
              private router: Router,
              private notificationService: NotificationService,
              private authenticationService: AuthenticationService) {
    this.passwordRestored = false;
    this.authenticationService.GETForRandomNumbers().subscribe(response => {
      this.randomNumbers = response.array_numbers;
      this.resetPasswordForm.get('array_numbers').setValue(response.array_numbers);
    });
  }

  ngOnInit(): void {
  }

  checkValid(input: string) {
    return this.resetPasswordForm.get(input).invalid;
  }

  checkEmail(input: string) {
    return this.resetPasswordForm.get(input).hasError('email') ? 'Debe entrar un correo válido' : '';
  }

  checkRequired(input: string) {
    return this.resetPasswordForm.get(input).hasError('required') ? 'Este campo no puede estar vacío' : '';
  }

  onSubmit() {
    this.authenticationService.POSTForResetPassword(this.resetPasswordForm.value).subscribe(response => {
      this.newPassword = response.new_password;
      this.passwordRestored = true;
    });
  }
}
