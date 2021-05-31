import {
  Component, OnInit, Input, Output, EventEmitter,
  Directive, ViewContainerRef, ViewChildren, QueryList, ComponentFactoryResolver, AfterContentInit, ViewChild
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostsService } from '../../blog.service';
import { BlogEditReplyComponent } from './blog-edit-reply/blog-edit-reply.component';


@Directive({

  selector: '[datacontainer]',
})
export class DatacontainerDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}

@Component({
  selector: 'app-comments',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})

export class BlogPostComponent implements OnInit {
  @Input() postComments: any;

  @Output() countComments = new EventEmitter();
  public loadComponent = false;
  public commentIndex = 0;
  public reply: Array<object> = [];
  commentsSubscription: Subscription;

  @ViewChildren(DatacontainerDirective) entry: QueryList<DatacontainerDirective>;
  constructor(
    private resolver: ComponentFactoryResolver,
    private postService: PostsService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {

  }

  replyComment(index, id) {
    this.loadComponent = true;
    const myFactory = this.resolver.resolveComponentFactory(BlogEditReplyComponent);
    if (this.entry.toArray()[index].viewContainerRef.length <= 0) {
      const myRef = this.entry.toArray()[index].viewContainerRef.createComponent(myFactory);
      myRef.instance['commentNo'] = index;
      myRef.changeDetectorRef.detectChanges();
      myRef.instance.userReplycomment.subscribe(
        data => {

          this.receiveReplyComment(data, index);
        }
      );
      myRef.instance.deletNo.subscribe(
        no => {
          myRef.destroy();
        }
      );
    }
  }

  receiveReplyComment($event, i) {
    this.reply = $event;
    this.postComments.forEach((element) => {
      if (element.commentId === i + 1) {
        if (!element['replyComment']) {
          element['replyComment'] = [];
          element['replyComment'].push(this.reply);
        } else {
          element['replyComment'].push(this.reply);
        }
        this.postService.updatePost(this.postComments);
       
      }
    });

    this.loadComponent = false;
  }


}
