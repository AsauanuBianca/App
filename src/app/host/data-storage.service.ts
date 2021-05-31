import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { hostService } from './host.service';
import { Host } from './host.model';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  
  constructor(private http: HttpClient, private hostService: hostService) {}

  storeHost() {
    const hosts = this.hostService.getHosts();
    this.http
      .put(
        'https://aroundworld-host.firebaseio.com/host.json',
        hosts
      )
      .subscribe(response => {
       
      });
      
  }

  fetchHost() {
    return this.http
      .get<Host[]>(
        'https://aroundworld-host.firebaseio.com/host.json',
      )
      .pipe(
        map(hosts => {
          return hosts.map(host => {
            return {
              ...host,
             
            };
          });
        }),
        tap(hosts => {
          this.hostService.sethosts(hosts);
          
        })
      )
      
  }
}