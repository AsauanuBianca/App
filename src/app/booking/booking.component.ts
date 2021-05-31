import {
  Component,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from '../host/host-detail-book/host-detail.mode';
import { BookingService } from '../host/host-detail-book/host-detail.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit  {

  loadedPosts: Book[] = [];
  isFetching = false;
  error = null;
  private errorSub: Subscription;

  constructor(  private bookService: BookingService,   
                private route: ActivatedRoute,
                private router: Router) {}

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

  onCreateEvent(postData: Book) {

    this.bookService.SaveEvent(postData.place,postData.start, postData.end);
    
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }


  onAddHost() {
    this.router.navigate(['/host-add'], { relativeTo: this.route });
  }
  onReservation() {
    this.router.navigate(['/my-houses'], { relativeTo: this.route });
  }

}