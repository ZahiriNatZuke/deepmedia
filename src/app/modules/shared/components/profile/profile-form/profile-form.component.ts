import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Channel} from '../../../../../models/channel';
import {ActivatedRoute} from '@angular/router';
import {CrudService} from '../../../../../services/crud.service';
import {API} from '../../../../../services/API';
import {HelpersService} from '../../../../../services/helpers.service';
import {AuthenticationService} from '../../../../../services/authentication.service';
import {VideoService} from '../../../../../services/video.service';
import {NotificationService} from '../../../../../services/notification.service';
import {faLock} from '@fortawesome/free-solid-svg-icons';

const api = new API();

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {
  formData = new FormData();
  Channel: Channel;
  Avatar: File;
  faLock = faLock;

  public profileForm: FormGroup = this.formBuilder.group({
    fullname: ['', {disable: true}],
    username: ['', [Validators.minLength(4)]],
    email: ['', Validators.email],
    avatar: ['']
  });

  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private crudService: CrudService,
              private helpersService: HelpersService,
              private authenticationService: AuthenticationService,
              private videoService: VideoService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.getChannel();
  }

  getChannel() {
    if (this.helpersService.currentChannelValue) {
      this.helpersService.currentChannel.subscribe(channel => this.Channel = channel);
      this.profileForm.patchValue({
        fullname: this.Channel.user.fullname,
        username: this.Channel.user.username,
        email: this.Channel.user.email
      });
    } else {
      setTimeout(() => this.getChannel(), 200);
    }
  }

  checkValid(input: string) {
    return this.profileForm.get(input).invalid;
  }

  checkEmail(input: string) {
    return this.profileForm.get(input).hasError('email') ? 'Debe entrar un correo válido' : '';
  }

  checkMinLength(input: string) {
    return this.profileForm.get(input).hasError('minlength') ? `Debe entrar al menos 4 caracteres` : '';
  }

  checkRequired(input: string) {
    return this.profileForm.get(input).hasError('required') ? 'Este campo no puede estar vacío' : '';
  }

  onSubmit() {
    const values = this.profileForm.value;
    this.formData.append('_method', 'PATCH');
    if (!this.profileForm.get('fullname').pristine) this.formData.append('fullname', values.fullname);
    if (!this.profileForm.get('username').pristine) this.formData.append('username', values.username);
    if (!this.profileForm.get('email').pristine) this.formData.append('email', values.email);
    if (!this.profileForm.get('avatar').pristine) this.formData.append('avatar', this.Avatar, this.Avatar.name);
    if (!this.profileForm.pristine && this.profileForm.dirty && this.profileForm.valid)
      this.crudService.POSTForUpdate(api.getUserURL(), 'user', this.formData, this.Channel.user.id.toString())
        .subscribe((response) => {
          const user: Channel = response.user;
          this.authenticationService.UpdateCurrentUserValue(user);
          this.helpersService.UpdateChannel(user);
          $('.custom-file-label').html('Actualizar Imagen del Perfil');
          this.profileForm.reset();
        });
    else
      this.notificationService.showNotification('Perfil Info', 'Por Favor Modifique Algún Campo', 'warning');
  }

  onChange(event) {
    const file = event.target.files[0];
    const checkSize: boolean = this.videoService.checkSize('avatar', file.size);
    const checkMimeType: boolean = this.videoService.checkMimeType('avatar', file.type);
    if (checkSize && checkMimeType) {
      this.Avatar = file;
      $('.custom-file-label').html(file.name);
      const avatar = document.getElementById('profile-avatar') as HTMLElement;
      avatar.style.background = `url('${window.URL.createObjectURL(file)}') center / cover`;
      avatar.style.transition = 'all .4s ease';
    } else {
      const msg: string = `${!checkSize ? 'La imagen excede el límite de 10MB.\n' : ''}
                           ${!checkMimeType ? 'El formato de la imagen no es admisible.' : ''}`;
      this.notificationService.showNotification('Perfil Info', msg, 'warning');
    }

  }
}
