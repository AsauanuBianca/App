import {
  Component,
  OnInit,
  Host,
} from '@angular/core';
import { Book } from '../host/host-detail-book/host-detail.mode';
import { BookingService } from '../host/host-detail-book/host-detail.service';


@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  host: Host;
  id: number;
  loadedPosts: Book[] = [];
  isFetching = false;
  error = null;


  constructor( private bookService: BookingService) {
  }

  ngOnInit() {
    
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

}
