import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  hide: boolean;

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router) {
    if (this.authenticationService.currentUserValue)
      this.router.navigate(['/video/categories']).then();
    this.hide = true;
  }

  ngOnInit(): void {
  }

  checkValid(input: string) {
    return this.loginForm.get(input).invalid;
  }

  checkMinLength(input: string) {
    return this.loginForm.get(input).hasError('minlength') ? `Debe entrar al menos ${(input === 'password' || input === 'confirm') ? '8' : '4'} caracteres` : '';
  }

  checkRequired(input: string) {
    return this.loginForm.get(input).hasError('required') ? 'Este campo no puede estar vacío' : '';
  }

  onSubmit() {
    this.authenticationService.POSTForLogin(this.loginForm.value).pipe(first()).subscribe(() => {
      this.router.navigate(['/video/categories']).then();
    });
  }

}
