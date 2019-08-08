// built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
// components
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
//routes
import { appRoutes } from './routes';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserService } from './shared/user.service';
//other
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { EditComponent } from './expert/edit/edit.component';
import { ConsultationComponent } from './expert/consultation/consultation.component';
import { HistoryComponent } from './expert/history/history.component';
import { MaterialModule } from './material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import{BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import { ClientComponent } from './client/client.component';
import { ExpertComponent } from './expert/expert.component';
import { ReservationComponent } from './client/reservation/reservation.component';
import { History2Component } from './client/history2/history2.component';
import { SearchComponent } from './client/search/search.component';
import { SelectedExpertComponent } from './client/selected-expert/selected-expert.component';
import { ReservaComponent } from './client/reserva/reserva.component';
import {MatDialogModule} from '@angular/material/dialog';
import { EditExpertComponent } from './expert/edit-expert/edit-expert.component';
import { SelectComponent } from './client//select/select.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    SignInComponent,
    EditComponent,
    ConsultationComponent,
    HistoryComponent,
    ClientComponent,
    ExpertComponent,
    ReservationComponent,
    History2Component,
    SearchComponent,
    SelectedExpertComponent,
    ReservaComponent,
    EditExpertComponent,
    SelectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    MaterialModule,
    NgbModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut:2000,
      positionClass:'toast-top-left',
      preventDuplicates:false,
    })

  ],
  entryComponents:[EditExpertComponent],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },AuthGuard,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
