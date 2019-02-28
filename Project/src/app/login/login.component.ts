import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from "../services/login.service";
import { AuthService } from "../shared/auth.service";
import { Token } from "../shared/token";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { requestSMS } from './../models/requestSMS';
import { RequestsmsService } from "../services/requestsms.service";
import { NgForm } from '@angular/forms';
import { Usuario } from './../models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  @Input() request: requestSMS;
  token: Token;
  errorMessage: string;
  usuarios: Usuario[] = [];

  email: string;
  password: string;

  constructor(private toastr: ToastrService, private usuarioService: LoginService,
    private authService: AuthService, private router: Router, private requestService: RequestsmsService) { }


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

  ngOnInit() {
    this.GetData();
  }

  onSubmit(form: NgForm) {
    this.GetData();
    let usuario = this.usuarios.find(x => x.email == this.email && x.password == this.password);

    if (usuario === undefined){
      this.toastr.error('The user does not exist!', 'Error');
      form.reset();
    } else {

      if(usuario.autenticado == false) {
        this.toastr.warning('Confirm your Email before Login In!', 'Wait');
        form.reset();
      } else {
        this.authService.login().subscribe(
          token => {
            this.token = token;
            if (this.request == undefined) {
              this.request = new requestSMS();
            }
            this.request.country_code = +usuario.code;
            this.request.phone_number = usuario.phone;
            this.request.via = 'sms';
    
            this.requestService.requestSMS(this.token, this.request).subscribe(
              arbitro => {

              },
              error => (this.errorMessage = <any>error)
            );
          },
          error => (this.errorMessage = <any>error)
        );
        sessionStorage.setItem('code',  usuario.code);
        sessionStorage.setItem('phone', usuario.phone.toString());
        form.reset();
        this.router.navigate(['/verifyphone']);
      }

    }

  }
}
