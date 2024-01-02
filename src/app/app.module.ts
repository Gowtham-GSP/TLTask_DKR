import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateComponent } from './update/update.component';
import { ChartComponent } from './chart/chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartModule } from 'angular-highcharts';
import {
  CalendarModule,
  DatePickerModule,
  TimePickerModule,
  DateRangePickerModule,
  DateTimePickerModule,
} from '@syncfusion/ej2-angular-calendars';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    UpdateComponent,
    ChartComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgApexchartsModule,
    ChartModule,
    CalendarModule,
    DatePickerModule,
    TimePickerModule,
    DateRangePickerModule,
    DateTimePickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
