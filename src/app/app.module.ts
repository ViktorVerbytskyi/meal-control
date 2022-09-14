import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { UsersService } from './shared/services/users.service';
import { MessageService } from './shared/services/message.service';
import { AuthService } from './shared/services/auth.service';
import { AsyncValidators } from './shared/customValidators/AsyncValidators';
import { MealsService } from './shared/services/meals.service';
import { AuthGuard } from './shared/services/auth.guard';
import { RootStoreModule } from './@ngrx/root-store.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MatButtonModule,
    BrowserAnimationsModule,
    AuthModule,
    HttpClientModule,
    RootStoreModule,
    AppRoutingModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [
    UsersService,
    MessageService,
    AuthService,
    AuthGuard,
    AsyncValidators,
    MealsService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
