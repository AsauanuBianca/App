import { Component, OnInit, Input } from '@angular/core';
import { Host } from '../host.model';


@Component({
  selector: 'app-host-item',
  templateUrl: './host-item.component.html',
  styleUrls: ['./host-item.component.css']
})
export class HostItemComponent implements OnInit{
  @Input() host: Host;
  @Input() index: number;

  ngOnInit() {
  
  }


}
