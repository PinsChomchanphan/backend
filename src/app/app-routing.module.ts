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
        // data: {
        //     breadcrumb: 'forms'
        // },
        children: [
            {
                path: '',
                component: TestComponent,
                data: {
                    breadcrumb: 'details'
                },
            },
            {
                path: 'test',
                component: TestComponent,
                data: {
                    breadcrumb: 'test'
                }
            },
            {
                path: 'test1',
                component: Test1Component,
                data: {
                    breadcrumb: 'test1'
                }
            },
            {
                path: 'profile',
                component: ProfileComponent,
                data: {
                    breadcrumb: 'profile'
                }
            },
            {
                path: 'test3',
                component: Test3Component,
                data: {
                    breadcrumb: 'test3'
                }
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
