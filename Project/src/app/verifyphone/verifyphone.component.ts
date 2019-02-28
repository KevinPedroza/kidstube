import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { VerificarToken } from './../models/verifyToken';
import { RequestsmsService } from "../services/requestsms.service";
import { AuthService } from "../shared/auth.service";
import { Token } from "../shared/token";
import { Router } from '@angular/router';

@Component({
  selector: 'app-verifyphone',
  templateUrl: './verifyphone.component.html',
  styleUrls: ['./verifyphone.component.sass']
})
export class VerifyphoneComponent implements OnInit {
  @Input() request: VerificarToken;

  token: Token;
  errorMessage: string;

  code: number;

  constructor(private toastr: ToastrService, private requestService: RequestsmsService,
    private authService: AuthService) { }

  ngOnInit() {
  }

  checkCode() {
    
    if(this.code == 0 || this.code == undefined || this.code == null) {
      this.toastr.warning('Fill the code Input!', 'Wait');
    } else {
      this.authService.login().subscribe(
        token => {
          this.token = token;
          if (this.request == undefined) {
            this.request = new VerificarToken();
          }
          this.request.country_code = +sessionStorage.getItem('code');
          this.request.phone_number = +sessionStorage.getItem('phone');
          this.request.token = this.code.toString();
  
          this.requestService.checkSMS(this.token, this.request).subscribe(
            arbitro => {
              console.log(arbitro);
              if(arbitro.success){
                this.toastr.success('Your Code is Correct!', 'Successfully');
              }

            },
            error => (this.toastr.error('Your Code is Incorrect!', 'Error'))
          );
        },
      );
    }
  }

}
