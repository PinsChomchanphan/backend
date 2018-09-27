import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/pages/home/home.component';
import { LoginComponent } from './modules/pages/login/login.component';
import { ForgotPasswordComponent } from './modules/pages/forgot-password/forgot-password.component';
import { Test1Component } from './modules/pages/test1/test1.component';
import { TestComponent } from './modules/pages/test/test.component';
import { Test3Component } from './modules/pages/test3/test3.component';
import { ProfileComponent } from './modules/pages/profile/profile.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: '',
                component: TestComponent
            },
            {
                path: 'test',
                component: TestComponent
            },
            {
                path: 'test1',
                component: Test1Component
            },
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'test3',
                component: Test3Component
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent
    }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
