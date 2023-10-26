import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NovoUsuario } from '../shared/novoUsuario';
import { AuthService } from '../shared/auth.service';
import { Usuario } from '../shared/usuario';
import { SHA512 } from 'crypto-js';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.css']
})
export class CadastrarUsuarioComponent implements OnInit {
  
  formCadastro!:FormGroup;

  dadosUsuario!:Usuario;
  novoUsuario!:NovoUsuario;

  erroFormulario:boolean = false;
  erroConfirmacaoSenha:boolean = false;
  erroSenha:boolean = false;
  
  constructor(private formBuilder:FormBuilder, private authService:AuthService) {}
  
  ngOnInit(): void {
    this.criarFormCadastro();
  }

  criarFormCadastro(){
    const semEspacoEmBranco: RegExp = new RegExp("\\S");

    this.formCadastro = this.formBuilder.group({
      nome:['', Validators.required],
      email:['', Validators.compose([Validators.required, Validators.email])],
      tipoUsuario:['', Validators.required],
      senha:['', Validators.compose([Validators.required, Validators.pattern(semEspacoEmBranco)])],
      confirmarSenha:['', Validators.required]
    })
  }

  validarFormulario(){
    if(this.formCadastro.invalid){
      this.erroFormulario = true;
    }else if(this.formCadastro.get('senha')?.value != this.formCadastro.get('confirmarSenha')?.value){
      this.erroConfirmacaoSenha = true;
    }else {
      this.setarDados();
      Swal.fire({
        title: 'Pronto',
        text: 'Usuário cadastrado com sucesso.',
        background: 'black',
        color:'white', 
      });
    }
  }

  setarDados(){
    this.novoUsuario = {
      newUser: this.dadosUsuario = {
        name: this.formCadastro.get('nome')?.value,
        email: this.formCadastro.get('email')?.value,
        passwordHash:'',
        passwordSalt:'',
        role: this.formCadastro.get('tipoUsuario')?.value
      },
      password: SHA512(this.formCadastro.get('confirmarSenha')?.value).toString()
    }

    this.cadastrarUsuario(this.novoUsuario);
  }

  cadastrarUsuario(novoUsuario:NovoUsuario){
    this.authService.cadastrar(novoUsuario).subscribe();
  }

}
