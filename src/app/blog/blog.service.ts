import {
  HttpClient,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { Post, Reply } from './blog.model';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';



@Injectable({ providedIn: 'root' })
export class PostsService {

  error = new Subject<string>();
  commentRef: AngularFirestoreCollection<Post> = null;
  constructor(private http: HttpClient) { }

  createAndStorePost(comment: Post) {
    this.http
      .post<{ name: string }>(
        'https://aroundworld-host.firebaseio.com/blog.json',
        comment,
        {
          observe: 'response'
        }
      )
      .subscribe(
        responseData => {
        },
        error => {
          this.error.next(error.message);
        }
      );
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    return this.http
      .get<{ [key: string]: Post }>(
        'https://aroundworld-host.firebaseio.com/blog/post.json',
        {
          headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
          params: searchParams,
          responseType: 'json'
        }
      )
      .pipe(
        map(responseData => {

          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        }),
        catchError(errorRes => {

          return throwError(errorRes);
        })
      );
  }

  deletePosts() {
    return this.http
      .delete('https://aroundworld-host.firebaseio.com/blog.json', {
        observe: 'events',
        responseType: 'text'
      })
  }

  updatePost(post: Post) {
    this.http
    .patch(
      'https://aroundworld-host.firebaseio.com/blog.json', { post: post }
    )
    .subscribe(response => {
     
    });
  }


}