import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Custom components
import { HomeComponent } from './home/home.component';
import { ReportComponent } from './reports/reports.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    // { path: 'reports', component: ReportComponent, pathMatch: 'prefix' },
    // { path: 'reports/week', component: ReportComponent, pathMatch: 'full' },
    { path: 'reports/week/1', component: ReportComponent, pathMatch: 'full' },
    // { path: '**', redirectTo: '/', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReportComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
