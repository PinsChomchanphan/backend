import { Component, OnInit } from '@angular/core';
import { IBreadcrumb } from '../../../../modals/breadcrumb/breadcrumb.modal';
import { Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

    public breadcrumbs: IBreadcrumb[];
    public name: string;
    private ROUTE_DATA_BREADCRUMB = 'breadcrumb';
    constructor(
        private activatedRoute: ActivatedRoute,
        public router: Router
    ) {
        this.breadcrumbs = [];
        this.init();

    }

    ngOnInit() {
    }

    private init() {
        // subscribe to the NavigationEnd event
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(event => {
            let root: ActivatedRoute = this.activatedRoute.root;
            this.breadcrumbs = this.getBreadcrumbs(root);
        });
    }

    private getBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: IBreadcrumb[] = []): IBreadcrumb[] {

        // get the child routes
        let children: ActivatedRoute[] = route.children;

        // return if there are no more children
        if (children.length === 0) {
            return breadcrumbs;
        }

        // iterate over each children
        for (let child of children) {
            // verify primary route
            if (child.outlet !== PRIMARY_OUTLET) {
                continue;
            }

            // verify the custom data property "breadcrumb" is specified on the route
            if (!child.snapshot.data.hasOwnProperty(this.ROUTE_DATA_BREADCRUMB)) {
                return this.getBreadcrumbs(child, url, breadcrumbs);
            }

            // get the route's URL segment
            let routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');

            // append route URL to URL
            url += `${routeURL}`;

            // add breadcrumb
            let breadcrumb: IBreadcrumb = {
                label: child.snapshot.data[this.ROUTE_DATA_BREADCRUMB],
                url: url,
                params: child.snapshot.params
            };
            if (this.router.url === '/' + breadcrumb.url) {
                this.name = breadcrumb.label;
            }

            breadcrumbs.push(breadcrumb);

            // recursive
            return this.getBreadcrumbs(child, url, breadcrumbs);
        }
    }

}
