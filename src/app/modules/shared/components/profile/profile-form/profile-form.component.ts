import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {Channel} from "../../../../../models/channel";
import {ActivatedRoute} from "@angular/router";
import {CrudService} from "../../../../../services/crud.service";
import {API} from "../../../../../services/API";

const api = new API();

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
  Channel: Channel;
  formData = new FormData();
  @Output() profileUpdated: EventEmitter<boolean> = new EventEmitter<boolean>();

  public profileForm: FormGroup = this.formBuilder.group({
    fullname: ['', [Validators.required]],
    username: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', Validators.email],
    password: ['', [Validators.minLength(8)]],
    password_confirmation: ['', [Validators.minLength(8), Validators.pattern]],
    avatar: ['']
  });

  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private crudService: CrudService) {
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.crudService.GETWithOutAuth(api.getUserURL(), id)
        .subscribe(response => {
          this.Channel = response.channel;
          this.profileForm.patchValue({
            fullname: this.Channel.user.fullname,
            username: this.Channel.user.username,
            email: this.Channel.user.email
          });
          $('.custom-file-label').html(this.Channel.avatar.name);
        });
    });
    this.hideC = true;
    this.hideP = true;
  }

  ngOnInit(): void {

  }

  checkValid(input: string) {
    return this.profileForm.get(input).invalid;
  }

  checkEmail(input: string) {
    return this.profileForm.get(input).hasError('email') ? 'Debe entrar un correo válido' : '';
  }

  checkMinLength(input: string) {
    return this.profileForm.get(input).hasError('minlength') ? `Debe entrar al menos ${(input === 'password' || input === 'password_confirmation') ? '8' : '4'} caracteres` : '';
  }

  checkRequired(input: string) {
    return this.profileForm.get(input).hasError('required') ? 'Este campo no puede estar vacío' : '';
  }

  onSubmit() {
    const values = this.profileForm.value;
    this.formData.append('_method', 'PATCH');
    this.formData.append('fullname', values.fullname);
    this.formData.append('username', values.username);
    this.formData.append('email', values.email);
    if (this.profileForm.get('password').value) {
      this.formData.append('password', values.password);
      this.formData.append('password_confirmation', values.password_confirmation);
    }
    this.crudService.POSTForUpdate(api.getUserURL(), this.formData, this.Channel.user.id.toString())
      .subscribe(response => {
        this.crudService.GETWithOutAuth(api.getUserURL(), this.Channel.user.id.toString())
          .subscribe(response => {
            sessionStorage.setItem('User-Auth', JSON.stringify(response.channel));
            this.profileUpdated.emit(true);
          });
      });
  }

  onChange(event) {
    const file = event.target.files[0];
    this.formData.append('avatar', file, file.name);
    $('.custom-file-label').html(file.name);
    $(`.mh-profile`).css({
      background: `url('${window.URL.createObjectURL(file)}') center`,
      backgroundSize: 'cover',
      transition: 'all .4s'
    });
  }

}
