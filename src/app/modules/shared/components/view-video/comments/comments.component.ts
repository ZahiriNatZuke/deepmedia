import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Comment} from '../../../../../models/comment';
import {CrudService} from '../../../../../services/crud.service';
import {API} from '../../../../../services/API';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../../../../../services/authentication.service';
import {Channel} from '../../../../../models/channel';
import {ThemeConfigService} from '../../../../../services/theme-config.service';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';

const api = new API();

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnChanges {
  User_Channel: Channel;
  Comments: Comment[];
  @Input() idVideo: number;
  @Input() Focus: boolean;
  postCommentForm: FormGroup;
  @Output() postSent: EventEmitter<boolean> = new EventEmitter<boolean>(true);
  showPostForm: boolean;
  currentTheme: { theme: string } = this.themeConfigService.config;
  minHeight: number;
  maxHeight: number;

  constructor(private _formBuilder: FormBuilder,
              private crudService: CrudService,
              private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private themeConfigService: ThemeConfigService,
              private breakpointObserver: BreakpointObserver) {
    this.authenticationService.currentUser.subscribe(x => this.User_Channel = x);
    this.showPostForm = false;
    this.postCommentForm = this._formBuilder.group({
      body: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.watchMediaQuery();
    this.getComments();
    window.addEventListener('resize', () => {
      this.watchMediaQuery();
    });
  }

  getComments() {
    this.crudService.GETWithOutAuth(api.getCommentURL(), this.idVideo.toString())
        .subscribe(response => {
          this.Comments = response.comments;
        });
  }

  checkValid(input: string) {
    return this.postCommentForm.get(input).invalid;
  }

  checkRequired(input: string) {
    return this.postCommentForm.get(input).hasError('required') ? 'Este campo no puede estar vacío' : '';
  }

  onSubmit() {
    if (this.postCommentForm.valid) {
      this.crudService.POSTForStore(api.getCommentURL(), 'comment',
          this.postCommentForm.value, this.idVideo.toString()).subscribe(() => {
        this.postCommentForm.patchValue({body: 'Enviado :)'});
        this.crudService.GETWithOutAuth(api.getCommentURL(), this.idVideo.toString())
            .subscribe(response => {
              this.Comments = response.comments;
              this.postSent.emit(true);
            });
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.idVideo && !changes.idVideo.isFirstChange())
      this.getComments();
    if (changes.Focus && !changes.Focus.currentValue) {
      this.showPostForm = false;
      this.postCommentForm.reset();
    }
  }

  private watchMediaQuery() {
    this.breakpointObserver.observe(['all and (max-width: 1199.98px)'])
        .subscribe((state: BreakpointState) => {
          if (state.matches) {
            this.minHeight = 455;
            this.maxHeight = 500;
          }
        });
    this.breakpointObserver.observe(['all and (min-width: 1200px)'])
        .subscribe((state: BreakpointState) => {
          if (state.matches) {
            this.minHeight = 361;
            this.maxHeight = 406;
          }
        });
    this.breakpointObserver.observe(['all and (min-width: 1300px)'])
        .subscribe((state: BreakpointState) => {
          if (state.matches) {
            this.minHeight = 406;
            this.maxHeight = 451;
          }
        });
    this.breakpointObserver.observe(['all and (min-width: 1920px)'])
        .subscribe((state: BreakpointState) => {
          if (state.matches) {
            this.minHeight = 608;
            this.maxHeight = 653;
          }
        });
  }
}
