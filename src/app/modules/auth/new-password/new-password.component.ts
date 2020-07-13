import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../services/authentication.service';
import {faEye, faEyeSlash, faLock} from '@fortawesome/free-solid-svg-icons';
import {Channel} from '../../../models/channel';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  newPasswordForm: FormGroup = this.formBuilder.group({
    current_password: ['', [Validators.required, Validators.minLength(4)]],
    new_password: ['', [Validators.required, Validators.minLength(8)]],
    new_password_confirmation: ['', [Validators.required, Validators.minLength(8), Validators.pattern]]
  });
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faLock = faLock;
  hideCP: boolean;
  hideNP: boolean;
  hideNPC: boolean;
  User_Channel: Channel;

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private titleService: Title) {
    this.authenticationService.currentUser.subscribe(x => this.User_Channel = x);
    this.hideCP = true;
    this.hideNP = true;
    this.hideNPC = true;
  }

  ngOnInit(): void {
    this.titleService.setTitle('#DeepMedia | Nueva Contraseña');
  }

  checkValid(input: string) {
    return this.newPasswordForm.get(input).invalid;
  }

  checkMinLength(input: string) {
    return this.newPasswordForm.get(input).hasError('minlength') ? 'Debe entrar al menos 8 caracteres' : '';
  }

  checkRequired(input: string) {
    return this.newPasswordForm.get(input).hasError('required') ? 'Este campo no puede estar vacío' : '';
  }

  onSubmit() {
    this.authenticationService.POSTForNewPassword(this.newPasswordForm.value);
  }

}
