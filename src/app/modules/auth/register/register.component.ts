import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {CrudService} from '../../../services/crud.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  hideP: boolean;
  hideC: boolean;

  public registerForm: FormGroup = this.formBuilder.group({
    fullname: ['', [Validators.required]],
    username: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', Validators.email],
    password: ['', [Validators.required, Validators.minLength(8)]],
    password_confirmation: ['', [Validators.required, Validators.minLength(8), Validators.pattern]]
  });

  constructor(private formBuilder: FormBuilder,
              private crudService: CrudService,
              private router: Router) {
    this.hideC = true;
    this.hideP = true;
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
    this.crudService.POSTForRegister(this.registerForm.value)
      .subscribe(() => {
        this.router.navigate(['/auth/login']).then();
      });
  }
}
