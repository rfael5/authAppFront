import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public authService:AuthService, public router:Router){}

  ngOnInit(): void {
    this.buscarUsuario();
  }

  buscarUsuario(){
    let userId = localStorage.getItem("userId");
    this.authService.buscarUsuario(Number(userId)).subscribe(
      (dados) => {
        this.authService.sessaoUsuario = dados.data;
      }
    );
  }

  direcionar(pagina:string){
    this.router.navigate([pagina]);
  }

  logout(){
    this.authService.logout();
  }

  title = 'authAppFront';
}
