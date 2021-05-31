import { Component, OnInit, Input } from '@angular/core';
import { Host } from '../host.model';

@Component({
  selector: 'app-host-item-book',
  templateUrl: './host-item-book.component.html',
  styleUrls: ['./host-item-book.component.css']
})
export class HostItemBookComponent implements OnInit {
  @Input() host: Host;
  @Input() index: number;
  constructor() { }

  ngOnInit() {
  }

}
