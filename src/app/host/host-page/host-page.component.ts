import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Host } from '../host.model';
import { Router, ActivatedRoute } from '@angular/router';
import { hostService } from '../host.service';
import { DataStorageService } from '../data-storage.service';

@Component({
  selector: 'app-host-page',
  templateUrl: './host-page.component.html',
  styleUrls: ['./host-page.component.css']
})
export class HostPageComponent implements OnInit, OnDestroy  {

  hosts: Host[];
  subscription: Subscription;

  constructor(private hostService: hostService,
              private router: Router,
              private route: ActivatedRoute,
              private dataStorageService: DataStorageService) {
  }

  ngOnInit() {
    this.subscription = this.hostService.hostChanged
      .subscribe(
        (hosts:Host[]) => {
          this.hosts = hosts;
        }
      );
    this.hosts = this.hostService.getHosts();
    this.dataStorageService.fetchHost().subscribe();
      }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  onFetchData() {
    this.dataStorageService.fetchHost().subscribe();
  }
  onCancel() {
    this.router.navigate(['/admin'], { relativeTo: this.route });
  }
}

