import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {CrudService} from "../../../services/crud.service";
import {API} from "../../../services/API";
import {Router} from "@angular/router";

const api = new API();

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

  constructor(private formBuilder: FormBuilder, private crudService: CrudService, private router: Router) {
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
    this.crudService.POSTForLoginOrRegister(api.getLoginURL(), this.loginForm.value)
      .subscribe((response) => {
        sessionStorage.setItem('User-Auth', JSON.stringify(response['auth:user'].user));
        sessionStorage.setItem('X-Authentication-JWT', response['X-Authentication-JWT']);
        sessionStorage.setItem('X-Encode-ID', response['X-Encode-ID']);
        localStorage.setItem('X-Refresh-JWT', response['X-Refresh-JWT']);
        this.router.navigate(['/video/categories']).then();
      });
  }

}
