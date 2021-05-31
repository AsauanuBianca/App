import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-commentbox',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css']
})
export class BlogEditComponent implements OnInit {
  @Input() commentsLength: number;

  commentForm: FormGroup;
  commentInfo: any;

  submitted: Boolean = false;
  @Output() usercomment = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.commentForm = this.formBuilder.group({
      comment: [''],
      name: [''],
      email: ['']
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.commentForm.invalid) {
      return false;
    } else {
      this.commentInfo = {
        commentId : this.commentsLength + 1,
        currentDate : new Date(),
        commentTxt: this.commentForm.controls['comment'].value,
        commentName: this.commentForm.controls['name'].value,
        commentEmail: this.commentForm.controls['email'].value,
        replyComment: []
      };
      this.usercomment.emit(this.commentInfo);
    }
    this.commentForm.reset();
  }


}

