import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../shared/login';
import { Router } from '@angular/router';
import { SHA512 } from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin!:FormGroup;

  erroFormulario:boolean = false;
  erroLogin:boolean = false;
  msgErro!:string;

  userLogin!:Login;
  
  text = "Auth Application";
  typingText = "";
  typingDelay = 200;
  charIndex = 0;

  constructor(
    public authService:AuthService, 
    private formBuilder:FormBuilder,
    private router:Router){}

  ngOnInit(): void {
    this.criarFormulario();
    this.type();
  }

  type(){
    if(this.charIndex < this.text.length){
      this.typingText += this.text[this.charIndex];
      this.charIndex++;
      setTimeout(() => this.type(), 100);
    }
  }

  criarFormulario(){
    this.formLogin = this.formBuilder.group({
      email:['', Validators.required],
      password:['', Validators.required]
    });
  }

  validarFormulario(){
    if(this.formLogin.invalid){
      this.erroFormulario = true;
    }else{
      this.login();
    }
  }

  login(){
    this.userLogin = {
      email:this.formLogin.get('email')?.value,
      password:SHA512(this.formLogin.get('password')?.value).toString()
    };

    this.authService.login(this.userLogin).subscribe(
      (response) => {
        if(response.success){
          localStorage.setItem('jwtToken', response.data.token);
          localStorage.setItem('userId', response.data.userNumber);
          this.authService.sessaoUsuario = response.data;
          this.router.navigate(['home']);
        }else{
          this.erroLogin=true;
          this.msgErro = response.message;
        }
       
      });
  }

}
