import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from '../blog.model';
import { PostsService } from '../blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit, OnDestroy {
  commentsSubscription: Subscription;
  comments: any[];
  comment: Post;
  count: number;
  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.comments = this.route.snapshot.data['comments'];
    this.count = this.comments.length;
  }

  receiveComment($event) {
    this.comment = $event;
    this.count = this.comments.length;
    this.postsService.createAndStorePost(this.comment);
    this.comments.push(this.comment);
  }

  ngOnDestroy() {
  }

}

