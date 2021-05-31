import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { MyAccountComponent } from './my-account/my-account.component';
import { BlogComponent } from './blog/blog.component';
import { BookingComponent } from './booking/booking.component';
import { RulesComponent } from './rules/rules.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BlogListResolve } from './blog/blog-list/blog-list.resolver';




const routes: Routes = [


  { path: '', redirectTo: "/home", pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'blog',
    component: BlogComponent,
    resolve: {
      comments: BlogListResolve
    }
  },
  {
    path: "",
    loadChildren: () =>
      import("./host/host.module").then(m => m.HostModule)
  },
  {
    path: "login",
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
  },

  { path: 'rules', component: RulesComponent },
  { path: 'admin', component: BookingComponent },
  { path: 'myProfile', component: MyAccountComponent, canActivate: [AuthGuard] },

  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },



];

@NgModule({
  imports: [RouterModule.forRoot(routes),RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
