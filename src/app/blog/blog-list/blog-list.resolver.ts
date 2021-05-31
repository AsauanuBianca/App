import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { of } from "rxjs";
import { catchError } from 'rxjs/operators';
import { PostsService } from "../blog.service";

@Injectable()
export class BlogListResolve implements Resolve<any>{

    constructor(
        private router: Router,
        private postsService: PostsService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const lastRoute = this.router.url;
        return this.postsService.fetchPosts().pipe(
            catchError((error) => {
                this.router.navigate([lastRoute]);
                return of(null);
            })
        );
    }
}