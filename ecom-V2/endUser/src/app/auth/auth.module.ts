import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ForgotComponent } from './forgot/forgot.component';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  declarations: [LoginComponent, ForgotComponent],
  imports: [
    MatProgressBarModule,
    MatIconModule,
    MatExpansionModule,
    MatTabsModule,
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    IvyCarouselModule,
    MatRadioModule
  ]
})
export class AuthModule { }
