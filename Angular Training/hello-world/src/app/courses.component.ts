import { Component } from '@angular/core';
import { CoursesService } from './courses.service';

@Component({
    selector:   'courses',
    template:   `
        <h5>{{ getTitle() }}</h5>
        <ul>
            <li *ngFor="let course of courses">
                {{ course }}
            </li>
        </ul>
        <button class="btn btn-primary" [style.backgroundColor]="isActive ? 'blue' : 'red'" [class.active]="isActive">Save</button>
        <div (click)="onDivClick()">
            <button class="btn btn-primary" (click)="onReset($event)">Reset</button>
        </div>
        <input [(ngModel)]="email" (keyup.enter)="onKeyUp()" />

        {{ course.title | uppercase }}
        {{ course.rating | number:'1.2-2' }}
        {{ course.students | number }}
        {{ course.price | currency:'AUD':'symbol':'1.2-2' }}
        {{ course.releaseDate }}
        {{ lipsum | summary:10 }}
    `
})
export class CoursesComponent {
    title   = 'List of courses';
    courses: string[];
    isActive    = false;
    email = 'me@example.com';
    lipsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam cursus, sem ac tincidunt facilisis, metus turpis condimentum orci, a finibus magna purus eu sapien. Maecenas tristique velit ut nunc efficitur congue. Vivamus porta tempus dapibus. Donec tristique massa ut lorem auctor molestie. Aenean commodo risus rhoncus laoreet sagittis. Aenean rhoncus molestie pretium. Nunc iaculis nunc id mattis dictum. Fusce dapibus neque ut iaculis lacinia. Vestibulum molestie euismod placerat. Vestibulum metus justo, finibus non viverra non, consectetur id turpis. Suspendisse vestibulum augue erat, ornare placerat ligula aliquam sit amet. Cras quis orci justo';

    course  = {
        title: 'The Complete Angular Course',
        rating: 4.975,
        students: 30123,
        price: 190.25,
        releaseDate: new Date(2016, 3, 1)
    };

    constructor(service: CoursesService) {
        this.courses    = service.getCourses();
    }

    getTitle() {
        return this.title;
    }

    onReset($event: any) {
        // To prevent click event of div container to be raised.
        $event.stopPropagation();
        console.log($event);
    }

    onDivClick() {
        // This event will raise because of event bubbling. To prevent this
        // we need to stop propagation
        console.log('Div was clicked...');
    }
    
    onKeyUp() {
        console.log(this.email);
    }
}
