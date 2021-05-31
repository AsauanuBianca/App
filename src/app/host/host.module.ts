import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { BookingAvailableComponent } from "../booking/booking-available/booking-available.component";

import { HostDetailBookComponent } from "./host-detail-book/host-detail-book.component";
import { HostDetailComponent } from "./host-detail/host-detail.component";
import { HostEditComponent } from "./host-edit/host-edit.component";
import { HostItemBookComponent } from "./host-item-book/host-item-book.component";
import { HostItemComponent } from "./host-item/host-item.component";
import { HostListComponent } from "./host-list/host-list.component";
import { HostPageComponent } from "./host-page/host-page.component";
import { HostRoutingModule } from "./host-routing.module";
import { HostComponent } from "./host.component";
import { ToastrModule } from 'ngx-toastr';

@NgModule({
    declarations: [
        HostComponent,
        HostListComponent,
        HostItemComponent,
        HostDetailComponent,
        HostEditComponent,
        HostPageComponent,
        HostItemBookComponent,
        HostDetailBookComponent,
        BookingAvailableComponent
    
    ],
      imports: [
        RouterModule,
        ReactiveFormsModule,
        HostRoutingModule,
        FormsModule,
        CommonModule,
        HttpClientModule,
        Ng2SearchPipeModule,
        NgbModalModule,
        ToastrModule.forRoot(), 
      ],
      
  })
  export class HostModule {}