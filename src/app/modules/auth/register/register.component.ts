import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {faEye, faEyeSlash, faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {CrudService} from '../../../services/crud.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faUserPlus = faUserPlus;
  hideP: boolean;
  hideC: boolean;

  public registerForm: FormGroup = this.formBuilder.group({
    fullname: ['', [Validators.required]],
    username: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    password_confirmation: ['', [Validators.required, Validators.minLength(8), Validators.pattern]]
  });

  constructor(private formBuilder: FormBuilder,
              private crudService: CrudService,
              private router: Router,
              private authenticationService: AuthenticationService) {
    this.hideC = true;
    this.hideP = true;
    this.authenticationService.GETForTempJWT();
  }

  ngOnInit(): void {
  }

  checkValid(input: string) {
    return this.registerForm.get(input).invalid;
  }

  checkEmail(input: string) {
    return this.registerForm.get(input).hasError('email') ? 'Debe entrar un correo válido' : '';
  }

  checkMinLength(input: string) {
    return this.registerForm.get(input).hasError('minlength') ? `Debe entrar al menos ${(input === 'password' || input === 'password_confirmation') ? '8' : '4'} caracteres` : '';
  }

  checkRequired(input: string) {
    return this.registerForm.get(input).hasError('required') ? 'Este campo no puede estar vacío' : '';
  }

  onSubmit() {
    this.authenticationService.POSTForCheckNewUser(this.registerForm.value).subscribe(() => {
      sessionStorage.setItem('X-NEW-USER', JSON.stringify(this.registerForm.value));
      this.router.navigate(['/auth/secret-list'], {
        skipLocationChange: true
      }).then();
    });
  }
}
