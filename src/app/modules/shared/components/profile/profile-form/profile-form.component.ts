import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  hideP: boolean;
  hideC: boolean;

  public angularForm: FormGroup = this.formBuilder.group({
    fullname: ['', [Validators.required]],
    username: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', Validators.email],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirm: ['', [Validators.required, Validators.minLength(8), Validators.pattern]],
    image: ['']
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

  onChange(event) {
    const file = event.target.files[0];
    $('.custom-file-label').html(file.name);
    $(`.mh-profile`).css({
      background: `url('${window.URL.createObjectURL(file)}') center`,
      backgroundSize: 'cover',
      transition: 'all .4s'
    });
  }

}
