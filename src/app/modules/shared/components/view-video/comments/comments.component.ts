import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {faEnvelopeOpenText, faPlus, faTimes} from '@fortawesome/free-solid-svg-icons';
import {Comment} from '../../../../../models/comment';
import {CrudService} from "../../../../../services/crud.service";
import {API} from "../../../../../services/API";
import {ActivatedRoute} from "@angular/router";
import {AuthenticationService} from "../../../../../services/authentication.service";
import {Channel} from "../../../../../models/channel";

const api = new API();

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  User_Channel: Channel;
  Comments: Comment[];
  idVideo: string;
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
    this.activatedRoute.params.subscribe(params => {
      this.idVideo = params.id;
      this.crudService.GETWithOutAuth(api.getCommentURL(), this.idVideo)
        .subscribe(response => {
          this.Comments = response.comments;
        });
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
        this.postCommentForm.value, this.idVideo).subscribe(() => {
        this.postCommentForm.patchValue({body: 'Enviado :)'});
        this.crudService.GETWithOutAuth(api.getCommentURL(), this.idVideo)
          .subscribe(response => {
            this.Comments = response.comments;
            this.postSent.emit(true);
          });
      });
    }
  }
}
