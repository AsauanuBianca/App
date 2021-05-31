import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Host } from '../host.model';
import { hostService } from '../host.service';


@Component({
  selector: 'app-host-detail',
  templateUrl: './host-detail.component.html',
  styleUrls: ['./host-detail.component.css']
})
export class HostDetailComponent implements OnInit {
  host: Host;
  id: number;

  constructor(private hostService: hostService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.host = this.hostService.getHost(this.id);
        }
      );
  }


  onEditHost() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    
  }

  onDeleteHost() {
    this.hostService.deleteHost(this.id);
    this.router.navigate(['/host-page']);
  }


}
