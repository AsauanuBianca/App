import { Injectable } from '@angular/core';
import { Subject} from 'rxjs';
import { Host} from './host.model';

@Injectable()
export class hostService {
  hostChanged = new Subject<Host[]>();
  private hosts: Host[] = [];

  sethosts(hosts: Host[]) {
    this.hosts = hosts;
    this.hostChanged.next(this.hosts.slice());
  }
  getHosts() {
    return this.hosts.slice();
  }

  getHost(index: number) {
    return this.hosts[index];
  }
  addHost(host: Host) {
    this.hosts.push(host);
    this.hostChanged.next(this.hosts.slice());
  }
  updateHost(index: number, newhost: Host) {
    this.hosts[index] = newhost;
    this.hostChanged.next(this.hosts.slice());
  }
  deleteHost(index: number) {
    this.hosts.splice(index, 1);
    this.hostChanged.next(this.hosts.slice());
  }
}
