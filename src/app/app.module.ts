import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// jhbbjbkb
import { RegisterService } from './register/register.service';
import { LoginService } from './login/login.service';
import { ChatService } from './chat/chat.service';
import { EditService } from './edit/edit.service';

// Custom components
import { HomeComponent } from './home/home.component';
import { ReportComponent } from './reports/reports.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { EditComponent } from './edit/edit.component';
import { LogoutComponent } from './logout/logout.component';
import { ChatComponent } from './chat/chat.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    // { path: 'reports', component: ReportComponent, pathMatch: 'prefix' },
    // { path: 'reports/week', component: ReportComponent, pathMatch: 'full' },
    { path: 'reports/week/1', component: ReportComponent, pathMatch: 'full' },
    { path: 'reports/week/2', component: ReportComponent, pathMatch: 'full' },
    { path: 'reports/week/3', component: ReportComponent, pathMatch: 'full' },
    { path: 'reports/week/4', component: ReportComponent, pathMatch: 'full' },
    { path: 'reports/week/5', component: ReportComponent, pathMatch: 'full' },
    { path: 'reports/week/6', component: ReportComponent, pathMatch: 'full' },
    { path: 'reports/week/10', component: ReportComponent, pathMatch: 'full' },
    { path: 'reports/edit/:kmom', component: EditComponent, pathMatch: 'full' },
    { path: 'register', component: RegisterComponent, pathMatch: 'full' },
    { path: 'login', component: LoginComponent, pathMatch: 'full' },
    { path: 'logout', component: LogoutComponent, pathMatch: 'full' },
    { path: 'chat', component: ChatComponent, pathMatch: 'full' },

    // { path: '**', redirectTo: '/', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReportComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    EditComponent,
    ChatComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [
      RegisterService,
      LoginService,
      EditService,
      ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
