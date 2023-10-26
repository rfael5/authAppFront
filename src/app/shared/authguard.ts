import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import Swal from 'sweetalert2'


@Injectable({
    providedIn:'root'
})

export class AuthGuard implements CanActivate {
    constructor(private authService:AuthService, private router:Router) {}

    canActivate(
        route:ActivatedRouteSnapshot,
        state:RouterStateSnapshot
    ):
        | Observable <boolean | UrlTree>
        | Promise <boolean | UrlTree>
        | boolean
        | UrlTree
    {
        let token = localStorage.getItem('jwtToken');

        if(token) {
            if (token == '' || token == null){
                this.router.navigate(['login']);
                return false;
            }else {
                return true;
            }
        }else {
            this.router.navigate(['login']);
            return false;
        }
    }
} 