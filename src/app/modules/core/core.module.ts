import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { BsDropdownModule } from 'ngx-bootstrap';
import { AppRoutingModule } from '../../app-routing.module';

@NgModule({
    imports: [
        BsDropdownModule.forRoot(),
        AppRoutingModule
    ],
    declarations: [
        FooterComponent,
        HeaderComponent,
        SidebarMenuComponent,
        BreadcrumbComponent
    ],
    exports: [
        FooterComponent,
        HeaderComponent,
        SidebarMenuComponent,
        BreadcrumbComponent
    ]
})
export class CoreModule { }
