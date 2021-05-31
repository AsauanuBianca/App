import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})
export class HomeComponent implements OnInit {

  constructor( private router: Router,
               private route: ActivatedRoute,) { }

  ngOnInit() {
    
  }
  onBlog() {
    this.router.navigate(['/blog'], { relativeTo: this.route });
  }
}
