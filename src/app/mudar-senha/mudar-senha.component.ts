import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { NovaSenha } from '../shared/novaSenha';
import { SHA512 } from 'crypto-js';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-mudar-senha',
  templateUrl: './mudar-senha.component.html',
  styleUrls: ['./mudar-senha.component.css']
})
export class MudarSenhaComponent implements OnInit{

  formMudarSenha!:FormGroup;

  novaSenha!:NovaSenha;

  erroFormulario:boolean = false;
  erroConfirmacao:boolean = false;
  
  constructor(private formBuilder:FormBuilder, private authService:AuthService) {}
  
  ngOnInit(): void {
    this.criarFormulario()
  }

  criarFormulario(){
    const semEspacoEmBranco: RegExp = new RegExp("\\S");

    this.formMudarSenha = this.formBuilder.group({
      novaSenha:['', Validators.compose([Validators.required, Validators.pattern(semEspacoEmBranco), Validators.maxLength(100), Validators.minLength(6)])],
      confirmarNovaSenha:['', Validators.compose([Validators.required, Validators.maxLength(100), Validators.minLength(6)])]
    });
  }

  validarFormulario(){
    if(this.formMudarSenha.invalid){
      this.erroFormulario = true;
    }else if(this.formMudarSenha.get('novaSenha')?.value != this.formMudarSenha.get('confirmarNovaSenha')?.value){
      this.erroConfirmacao = true;
    }else{
      this.setarDados();
      Swal.fire({
        title: 'Pronto',
        text: 'Senha modificada com sucesso.',
        background: 'black',
        color:'white', 
      });
    }
  }
  
  setarDados(){
    this.novaSenha = {
      newPassword: SHA512(this.formMudarSenha.get('novaSenha')?.value).toString(),
      confirmPassword: SHA512(this.formMudarSenha.get('confirmarNovaSenha')?.value).toString()
    }

    this.mudarSenha(this.novaSenha);
  }
  
  mudarSenha(novaSenha:NovaSenha){
    this.authService.mudarSenha(novaSenha).subscribe();
  }
  

}
