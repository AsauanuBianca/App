import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookingComponent } from './booking/booking.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { hostService } from './host/host.service';
import { MyAccountComponent } from './my-account/my-account.component';
import { BlogComponent } from './blog/blog.component';
import { RulesComponent } from './rules/rules.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { BlogPostComponent, DatacontainerDirective } from './blog/blog-list/blog-post/blog-post.component';
import { BlogEditComponent } from './blog/blog-list/blog-post/blog-edit/blog-edit.component';
import { HostModule } from './host/host.module';
import { HostRoutingModule } from './host/host-routing.module';
import { AuthModule } from './auth/auth.module';
import { BlogEditReplyComponent } from './blog/blog-list/blog-post/blog-edit-reply/blog-edit-reply.component';
import { BlogListResolve } from './blog/blog-list/blog-list.resolver';


const firebaseConfig = {
  apiKey: "<Firebase API key>",
  authDomain: "<Firebase auth domain>",
  databaseURL: "<Firebase database URL>",
  projectId: "<Firebase project ID>",
  storageBucket: "<Firebase storage bucket>",
  messagingSenderId: "<Firebase messaging sender ID>",
};

@NgModule({
  
  declarations: [
    AppComponent,
    BookingComponent,
    HeaderComponent,
    HomeComponent,
    MyAccountComponent,
    BlogComponent,
    RulesComponent,
    NotFoundComponent,
    BlogListComponent,
    BlogPostComponent,
    BlogEditComponent,
    BlogEditReplyComponent,
    DatacontainerDirective 
  ],
    
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HostModule,
    HostRoutingModule,
    AuthModule,
   
  ],
  providers: [
    hostService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    BlogListResolve
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
