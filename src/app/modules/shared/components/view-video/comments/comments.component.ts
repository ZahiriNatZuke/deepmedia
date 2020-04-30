import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {faEnvelopeOpenText, faPlus, faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  postCommentForm: FormGroup;
  faEnvelopeOpenText = faEnvelopeOpenText;
  faPlus = faPlus;
  faTimes = faTimes;
  showPostForm: boolean;
  containerStyle: any;

  constructor(private _formBuilder: FormBuilder) {
    this.showPostForm = false;
    this.postCommentForm = this._formBuilder.group({
      comment: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  checkValid(input: string) {
    return this.postCommentForm.get(input).invalid;
  }

  checkRequired(input: string) {
    return this.postCommentForm.get(input).hasError('required') ? 'Este campo no puede estar vacío' : '';
  }

  onSubmit() {
    if (this.postCommentForm.valid)
      console.log(this.postCommentForm.value);
  }
}
