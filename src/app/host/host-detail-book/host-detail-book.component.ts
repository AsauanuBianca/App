
import { Host } from '../host.model';
import { ActivatedRoute,  Params, Router } from '@angular/router';
import { hostService } from '../host.service';
import {Component,OnInit} from '@angular/core';
import { BookingService } from './host-detail.service';
import { Book } from './host-detail.mode';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { AuthService } from 'src/app/auth/auth.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-host-detail-book',
  templateUrl: './host-detail-book.component.html',
  styleUrls: ['./host-detail-book.component.css']
})
export class HostDetailBookComponent implements OnInit {

  host: Host;
  id: number;
  loadedPosts: Book[] = [];
  isFetching = false;
  error = null;
  private errorSub: Subscription;
  hosts: Host[];
  showModal: boolean = false;
  content: any;
  title: any;
  isAuthenticated = false;
  private userSub: Subscription;
  
  constructor(private hostService: hostService,
              private route: ActivatedRoute,
              private bookService: BookingService,
              private router: Router,
              private toastr: ToastrService,
              private authService: AuthService,
              ) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.host = this.hostService.getHost(this.id);
         
        }
      );
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
       this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;

      
      
    });
      
      }
      
 
      onCreateEvent(postData: Book) {
         let isAlreadyBook = false;
         this.loadedPosts.forEach(post => {
         let localStartDate = moment(postData.start);
         let localEndDate = moment(postData.end);
         let DBStartDate = moment(post.start);
         let BDEndDate = moment(post.end);
       
         if(localStartDate.isAfter(localEndDate))
         {
    
           this.toastr.error('The check-in is after the check-out');
            isAlreadyBook=true;
            this.router.navigate(['/booking-available'], { relativeTo: this.route });
         }

         if(DBStartDate.isBefore(localEndDate)  &&  BDEndDate.isAfter(localStartDate)){
           isAlreadyBook=true;
           
         }
           
        });
        if(this.isAuthenticated)
              {if(isAlreadyBook)
              { 
                this.loadedPosts;
                this.showModal = true; 
                this.content = "This period is already reserved, choose another date "; 
                this.title = "Unsuccessful reservation"; 
              }
              else {
              this.bookService.SaveEvent(postData.place,postData.start, postData.end);
                    this.toastr.success('Successful reservation');
                    this.router.navigate(['/myProfile'], { relativeTo: this.route });
              
              }
        
      
       }
       else this.router.navigate(['/login'], { relativeTo: this.route });
      
      }
      ok() {
        this.showModal = false;
        this.router.navigate(['/booking-available'], { relativeTo: this.route });
      }
    
      ngOnDestroy() {
        this.errorSub.unsubscribe();
      }
  
}
