import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  private userSub: Subscription;
 
  constructor(
   
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
   
  ) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;

      
      
    });
  }

  onLogout() {
    this.authService.logout();
    
    this.router.navigate(['/home'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
