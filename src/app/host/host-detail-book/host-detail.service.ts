
import {
    HttpClient,
    HttpHeaders,
    HttpParams,
  } from '@angular/common/http';
  import { map, catchError } from 'rxjs/operators';
  import { Subject, throwError } from 'rxjs';
  import { Injectable } from '@angular/core';
  import { Book } from './host-detail.mode';

  
  @Injectable({ providedIn: 'root' })
  export class BookingService {

    error = new Subject<string>();
   
    constructor(private http: HttpClient) {}
  
    SaveEvent(place: string, start: Date, end: Date) {
      const postData: Book = { place: place, start: start, end: end};
      this.http
        .post<{ name: string }>(
          'https://aroundworld-host.firebaseio.com/booking.json',
          postData,
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
  
    fetchEvent() {
        let searchParams = new HttpParams();
        return this.http
          .get<{ [key: string]: Book }>(
            'https://aroundworld-host.firebaseio.com/booking.json',
            {
              headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
              params: searchParams,
              responseType: 'json'
            }
          )
          .pipe(
            map(responseData => {
              const postsArray: Book[] = [];
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
  }
  