import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { hostService } from './host.service';
import { DataStorageService } from './data-storage.service';
import { Host } from './host.model';


@Injectable({ providedIn: 'root' })
export class HostResolverService implements Resolve<Host[]> {
 
  constructor(
    private dataStorageService: DataStorageService,
    private hostService: hostService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const hosts = this.hostService.getHosts();

    if (hosts.length === 0) {
      return this.dataStorageService.fetchHost();
    } else {
      return hosts;
    }
  }
}