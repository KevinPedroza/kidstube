import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { AuthService } from './shared/auth.service';
import { LoginService } from './services/login.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { VerifyphoneComponent } from './verifyphone/verifyphone.component';
import { AdminComponent } from './admin/admin.component';
import { AccountsComponent } from './accounts/accounts.component';
import { SafeHtmlPipe } from './urlsafe.pipe';
import { SafeHtml2Pipe } from './htmlsafe.pipe';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    VerifyphoneComponent,
    AdminComponent,
    AccountsComponent,
    SafeHtmlPipe,
    SafeHtml2Pipe,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxIntlTelInputModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 3000,
      preventDuplicates: true
    })
  ],
  providers: [AuthService, LoginService, ToastrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
