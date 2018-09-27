import { Component, OnInit, HostListener } from '@angular/core';
import * as $ from 'jquery';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        let w = event.target.innerWidth;
        if (!$('#main').hasClass('forced')) {
            if (w > 990) {
                $('body').removeClass('smallscreen').addClass('widescreen');
                $('#main').removeClass('enlarged');
            } else {
                $('body').removeClass('widescreen').addClass('smallscreen');
                $('#main').addClass('enlarged');
                $('.left ul').removeAttr('style');
            }
            if ($('#main').hasClass('enlarged') && $('body').hasClass('adminbody')) {
                $('body').removeClass('adminbody').addClass('adminbody-void');
            } else if (!$('#main').hasClass('enlarged') && $('body').hasClass('adminbody-void')) {
                $('body').removeClass('adminbody-void').addClass('adminbody');
            }

        } else {
            $('#main').removeClass('forced');
        }
    }

    /**
     * openLeftBar
     */
    public openLeftBar() {
        $('#main').toggleClass('enlarged');
        $('#main').addClass('forced');

        if ($('#main').hasClass('enlarged') && $('body').hasClass('adminbody')) {
            $('body').removeClass('adminbody').addClass('adminbody-void');
        } else if (!$('#main').hasClass('enlarged') && $('body').hasClass('adminbody-void')) {
            $('body').removeClass('adminbody-void').addClass('adminbody');
        }

        if ($('#main').hasClass('enlarged')) {
            $('.left ul').removeAttr('style');
        } else {
            $('.subdrop').siblings('ul:first').show();
        }
    }
}
