import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {faEnvelopeOpenText, faPlus, faTimes} from '@fortawesome/free-solid-svg-icons';
import {Comment} from '../../../../../models/comment';
import {CrudService} from '../../../../../services/crud.service';
import {API} from '../../../../../services/API';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../../../../../services/authentication.service';
import {Channel} from '../../../../../models/channel';

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
  faEnvelopeOpenText = faEnvelopeOpenText;
  faPlus = faPlus;
  faTimes = faTimes;
  showPostForm: boolean;

  constructor(private _formBuilder: FormBuilder,
              private crudService: CrudService,
              private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.User_Channel = x);
    this.showPostForm = false;
    this.postCommentForm = this._formBuilder.group({
      body: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getComments();
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
}
