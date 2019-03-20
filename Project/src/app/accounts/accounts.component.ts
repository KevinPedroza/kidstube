import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from "./../shared/auth.service";
import { Token } from "./../shared/token";
import { MenorService } from "./../services/menor.service";
import { ToastrService } from 'ngx-toastr';
import { Menor } from './../models/menor';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.sass']
})
export class AccountsComponent implements OnInit {
  @Input() menor: Menor;
  token: Token;
  errorMessage: string;
  menores: Menor[] = [];
  closeResult: string;
  regModel: Menor;

  nombre: string;
  username: string;
  pin: number;
  age: number;

  constructor(private modalService: NgbModal,private toastr: ToastrService, private menorService: MenorService,
    private authService: AuthService, private router: Router) { }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  logOut(){
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  Eliminar(name: string, id: number) {
    if (confirm('Do you want to delete the user ' + name + ' ?')) {
      this.menorService.DeleteMenor(this.token, id).subscribe(
        arbitro => {
          this.GetAccounts();
          this.toastr.success('The user was successfully deleted!', 'Success');
        },
        error => (this.errorMessage = <any>error),
      );

    }
  }

  onEdit2(orderToEdit: Menor) {
    // Initiate new registration.
    this.regModel = new Menor();
    this.regModel = Object.assign({}, orderToEdit);
  }

   onEdit(id: number) {
    let filterData = this.menores.filter((order: Menor) => order.id === id);
    this.onEdit2(filterData[0]);
  }

  updateMenor(form: NgForm){
    this.authService.login().subscribe(
      token => {
        this.token = token;
        if (this.menor === undefined) {
          this.menor = new Menor();
        }
        this.menor.id = this.regModel.id;
        this.menor.nombre = this.regModel.nombre;
        this.menor.nombreusuario = this.regModel.nombreusuario;
        this.menor.pin = this.regModel.pin;
        this.menor.edad = this.regModel.edad;

        this.menorService.UpdateMenor(this.token, this.menor).subscribe(
          arbitro => {
            this.GetAccounts();
            form.reset();
            this.toastr.success('The user was successfully updated!', 'Success');
            this.modalService.dismissAll();
          },
          error => (this.errorMessage = <any>error),
        );
      },
      error => (this.errorMessage = <any>error),
    );
  }

  GetAccounts() {
    this.authService.login().subscribe(
      token => {
        this.token = token;
        this.menorService.GetMenores(this.token).subscribe(
          listOrders => {
            this.menores = listOrders;
          },
          error => (this.errorMessage = <any>error)
        );
      },
      error => (this.errorMessage = <any>error)
    );
  }

  addMenor(form: NgForm){

    const id = this.menores.find(x => x.nombreusuario === this.username || x.pin == this.pin);

    if (id === undefined) {
      this.authService.login().subscribe(
        token => {
          this.token = token;
          if (this.menor === undefined) {
            this.menor = new Menor();
          }
          this.menor.nombre = this.nombre;
          this.menor.nombreusuario = this.username;
          this.menor.pin = this.pin;
          this.menor.edad = this.age;

          this.menorService.AddMenor(this.token, this.menor).subscribe(
            arbitro => {
              this.GetAccounts();
              form.reset();
              this.modalService.dismissAll();
              this.toastr.success('The user was successfully created!', 'Success');
            },
            error => (this.errorMessage = <any>error),
          );
        },
        error => (this.errorMessage = <any>error),
      );
      } else {
        this.toastr.error('The Username or Pin already exist!', 'Error');
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }   
  ngOnInit() {
    this.GetAccounts();
  }

}
