import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import Swal from 'sweetalert2'


@Injectable({
    providedIn:'root'
})

export class HasRoleGuard implements CanActivate {
    rolesUsuario:any;

    constructor(public authService:AuthService, public router:Router) {}

    canActivate(
        route:ActivatedRouteSnapshot,
        state:RouterStateSnapshot
    ): Observable<boolean | UrlTree>
        | Promise<boolean>
        | boolean
        | UrlTree {

            this.rolesUsuario = this.authService.getUserToken();
            const isAuthorized = this.rolesUsuario['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'].includes(route.data['role']);

            if(!isAuthorized) {
                Swal.fire({
                    title: 'Não autorizado',
                    text: `Somente usuários do tipo ${route.data['role']} podem acessar essa página`,
                    background: 'black',
                    color:'white',                
                  })
                return false;
            }else{
                return true;
            }
            
        } 
}