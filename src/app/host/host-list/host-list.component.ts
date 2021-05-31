import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Host } from '../host.model';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../data-storage.service';
import { hostService } from '../host.service';


@Component({
  selector: 'app-host-list',
  templateUrl: './host-list.component.html',
  styleUrls: ['./host-list.component.css']
})
export class HostListComponent implements OnInit , OnDestroy{

  loadedEvents = [];
  searchText;
  hosts: Host[];
  subscription: Subscription;

  constructor(private hostService: hostService,
              private dataStorageService: DataStorageService,) {}

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
 
}
