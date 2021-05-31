import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/host/host-detail-book/host-detail.mode';
import { BookingService } from 'src/app/host/host-detail-book/host-detail.service';
import { Location } from '@angular/common'


@Component({
  selector: 'app-booking-available',
  templateUrl: './booking-available.component.html',
  styleUrls: ['./booking-available.component.css']
})
export class BookingAvailableComponent implements OnInit {

  loadedPosts: Book[] = [];
  isFetching = false;
  error = null;
  private errorSub: Subscription;

  constructor(private bookService: BookingService,   
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) {}

  ngOnInit() {
    this.errorSub = this.bookService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });

    this.isFetching = true;
    this.bookService.fetchEvent().subscribe(
      posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
        
      },
      error => {
        this.isFetching = false;
        this.error = error.message;
      }
    );
    
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }


  onBook() {
    this.location.back();
  }
  
}