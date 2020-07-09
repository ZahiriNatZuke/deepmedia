import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {faEye, faEyeSlash, faKey} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication.service';
import {ThemeConfigService} from '../../../services/theme-config.service';

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
  faKey = faKey;
  hide: boolean;
  returnURL: string;
  errorLogin: boolean;
  currentTheme: { theme: string } = this.themeConfigService.config;

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private themeConfigService: ThemeConfigService) {
    this.hide = true;
    this.errorLogin = false;
  }

  ngOnInit(): void {
    this.returnURL = this.activatedRoute.snapshot.queryParamMap.get('returnUrl') || '/video/categories';
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
    this.authenticationService.POSTForLogin(this.loginForm.value).subscribe(() => {
      this.router.navigate([this.returnURL]).then();
    }, () => this.errorLogin = true);
  }

}
