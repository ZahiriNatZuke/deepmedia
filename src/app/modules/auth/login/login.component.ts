import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public angularForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
  }

  checkValid(input: string) {
    return this.angularForm.get(input).invalid;
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
