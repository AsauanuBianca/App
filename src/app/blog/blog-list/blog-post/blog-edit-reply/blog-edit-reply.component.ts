import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-childbox',
  templateUrl: './blog-edit-reply.component.html',
  styleUrls: ['./blog-edit-reply.component.css']
})
export class  BlogEditReplyComponent implements OnInit {

  childForm: FormGroup;
  replyComment: any;

  submitted: Boolean = false;
  @Output() userReplycomment = new EventEmitter();
  @Output() deletNo = new EventEmitter();
  @Input() commentNo: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  
  }

  createForm() {
    this.childForm = this.formBuilder.group({
      comment: [''],
      name: [''],
      email: ['']
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.childForm.invalid) {
      return false;
    } else {
      this.replyComment = {
        currentDate : new Date(),
        commentTxt: this.childForm.controls['comment'].value,
        commentName: this.childForm.controls['name'].value,
        commentEmail: this.childForm.controls['email'].value,
      };
      this.userReplycomment.emit(this.replyComment);
      this.deletNo.emit(this.commentNo);
    }
  }

}
