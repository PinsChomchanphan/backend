import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './modules/pages/home/home.component';
import { LoginComponent } from './modules/pages/login/login.component';
import { ForgotPasswordComponent } from './modules/pages/forgot-password/forgot-password.component';
import { CoreModule } from './modules/core/core.module';
import { PageNotFoundComponent } from './modules/pages/page-not-found/page-not-found.component';
import { TestComponent } from './modules/pages/test/test.component';
import { Test1Component } from './modules/pages/test1/test1.component';
import { Test3Component } from './modules/pages/test3/test3.component';
import { ProfileComponent } from './modules/pages/profile/profile.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        ForgotPasswordComponent,
        PageNotFoundComponent,
        TestComponent,
        Test1Component,
        Test3Component,
        ProfileComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CoreModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
