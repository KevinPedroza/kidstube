import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Usuario } from './../models/usuario';
import { LoginService } from "../services/login.service";
import { AuthService } from "../shared/auth.service";
import { Token } from "../shared/token";
import { Router } from '@angular/router';

var datePipe = new DatePipe('en-US'); 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  @Input() usuario: Usuario;
  constructor(private toastr: ToastrService, private usuarioService: LoginService,
    private authService: AuthService, private router: Router,) { }

	phoneForm = new FormGroup({
		phone: new FormControl(undefined, [Validators.required])
  });

  token: Token;
  errorMessage: string;
  usuarios: Usuario[] = [];

  email: string;
  pass: string;
  pass2: string;
  name: string;
  lastname: string;
  fecha;

  GetData() {
    this.authService.login().subscribe(
      token => {
        this.token = token;

        console.log(this.token);
        this.usuarioService.GetUsuarios(this.token).subscribe(
          listOrders => {
            this.usuarios = listOrders;
          },
          error => (this.errorMessage = <any>error)
        );
      },
      error => (this.errorMessage = <any>error)
    );
  }

  onSubmit(form: NgForm) {

    const now = new Date();
    const usuario = this.usuarios.find(x => x.email == this.email);

    if(this.pass != this.pass2) {
      this.toastr.error('The passwords are not the same!', 'Wait');
    } else if((+datePipe.transform(now, 'yyyy') - +this.fecha.year) < 18) {
      this.toastr.warning('Your age is not accepted!', 'Warning');
    } else if(usuario !== undefined) {
      this.toastr.warning('The email already exits!', 'Warning');
    } else{
      this.authService.login().subscribe(
        token => {
          this.token = token;
          if (this.usuario == undefined) {
            this.usuario = new Usuario();
          }
          this.usuario.email = this.email;
          this.usuario.name = this.name;
          this.usuario.lastname = this.lastname;
          this.usuario.age = this.fecha.year + '/' + this.fecha.month + '/' + this.fecha.day;
          this.usuario.password = this.pass;
          this.usuario.phone = +form.form.value.phone.number;
          this.usuario.autenticado = false;
          this.usuario.code = form.form.value.phone.internationalNumber.split(' ')[0].replace('+','');

          this.usuarioService.AddUsuario(this.token, this.usuario).subscribe(
            arbitro => {
              this.toastr.warning('Please now confirm your Email!', 'Warning');
              this.toastr.success('Register Completely Done!', 'Successfully');
              setTimeout(() => {
                this.router.navigate(['/login']);
              }, 3000);
            },
            error => (this.errorMessage = <any>error)
          );
        },
        error => (this.errorMessage = <any>error)
      );
    }

  }

  ngOnInit() {
    this.GetData(); 
  }

}
