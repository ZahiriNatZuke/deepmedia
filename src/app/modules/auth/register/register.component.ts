import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

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

  public angularForm: FormGroup = this.formBuilder.group({
    fullname: ['', [Validators.required]],
    username: ['', [Validators.required, Validators.minLength(4)]],
    email: [''],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirm: ['', [Validators.required, Validators.minLength(8), Validators.pattern]]
  });

  constructor(private formBuilder: FormBuilder) {
    this.hideC = true;
    this.hideP = true;
  }

  ngOnInit(): void {
  }

  checkValid(input: string) {
    return this.angularForm.get(input).invalid;
  }

  checkEmail(input: string) {
    return this.angularForm.get(input).hasError('email') ? 'Debe entrar un correo válido' : '';
  }

  checkMinLength(input: string) {
    return this.angularForm.get(input).hasError('minlength') ? `Debe entrar al menos ${(input === 'password' || input === 'confirm') ? '8' : '4'} caracteres` : '';
  }

  checkRequired(input: string) {
    return this.angularForm.get(input).hasError('required') ? 'Este campo no puede estar vacío' : '';
  }

  onSubmit() {
    console.log(this.angularForm.value);
  }
}
