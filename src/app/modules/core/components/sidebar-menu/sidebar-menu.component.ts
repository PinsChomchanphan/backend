import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
    selector: 'app-sidebar-menu',
    templateUrl: './sidebar-menu.component.html',
    styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit, AfterViewInit {


    constructor(public router: Router) {

    }

    ngOnInit() {

    }

    ngAfterViewInit(): void {
        let ele = $('#sidebar-menu a.active');
        if (ele) {
            this.collapseExpand(ele);
        }
    }

    public onClickMenu($event: any) {
        let element = $event.target;
         if (element.nodeName !== 'SPAN' && element.nodeName !== 'I') {
            this.collapseExpand(element);
        } else {
            this.collapseExpand($(element).parent());
        }
    }

    private collapseExpand(element: any) {
        if (!$('#main').hasClass('enlarged')) {
            if (!$(element).hasClass('subdrop')) {
                // hide any open menus and remove all other classes
                $('ul', $(element).parents('ul:first')).slideUp(350);
                $('a', $(element).parents('ul:first')).removeClass('subdrop');
                $('#sidebar-menu .pull-right i').removeClass('md-remove').addClass('md-add');
                // open our new menu and add the open class
                $(element).next('ul').slideDown(350);
                $(element).addClass('subdrop');
                $('.pull-right i', $(element).parents('.submenu:last')).removeClass('md-add').addClass('md-remove');
                $('.pull-right i', $(element).siblings('ul')).removeClass('md-remove').addClass('md-add');
            } else if ($(element).hasClass('subdrop')) {
                $(element).removeClass('subdrop');
                $(element).next('ul').slideUp(350);
                $('.pull-right i', $(element).parent()).removeClass('md-remove').addClass('md-add');
            }
        }
    }
}
