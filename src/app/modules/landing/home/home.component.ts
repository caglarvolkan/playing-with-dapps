import {Component, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'landing-home',
    templateUrl: './home.component.html',
    encapsulation: ViewEncapsulation.None
})
export class LandingHomeComponent {
    loading: boolean = false;

    constructor() {
    }
}
