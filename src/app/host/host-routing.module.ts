import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BookingAvailableComponent } from "../booking/booking-available/booking-available.component";

import { HostDetailBookComponent } from "./host-detail-book/host-detail-book.component";
import { HostDetailComponent } from "./host-detail/host-detail.component";
import { HostEditComponent } from "./host-edit/host-edit.component";
import { HostListComponent } from "./host-list/host-list.component";
import { HostResolverService } from "./host-rezolver.service";
import { HostComponent } from "./host.component";

const routes: Routes = [
    
    {path: 'my-houses', component: HostComponent, children: [
        {
           path: ':id',
           component: HostDetailComponent,
           resolve: [HostResolverService]
         },
         {
           path: ':id/edit',
           component: HostEditComponent,
           resolve: [HostResolverService]
         }
         
       ]
     },
     {path: 'host', component: HostListComponent},
     {path: 'host/:id', component: HostDetailBookComponent,  resolve: [HostResolverService]},
     {path: 'host-add', component: HostEditComponent},
     {path: 'booking-available', component: BookingAvailableComponent}
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class HostRoutingModule {}