import { Component } from '@angular/core';

@Component({
  selector: 'app-ngforof',
  templateUrl: './ngforof.component.html',
  styleUrls: ['./ngforof.component.css']
})
export class NgforofComponent {
  courses = [
    { id: 1, name: 'Course 1 '},
    { id: 2, name: 'Course 2 '},
    { id: 3, name: 'Course 3 '},
    { id: 4, name: 'Course 4 '},
    { id: 5, name: 'Course 5 '},
    { id: 6, name: 'Course 6 '}
  ];

  canAdd = false;

  onAdd() {
    this.courses.push({ id: this.courses.length, name: `Course ${this.courses.length}`});
  }

  onRemove(index) {
    this.courses.splice(index, 1);
  }

  // Use trackBy property only when a large list or a complex markup is rendered.
  // On small plane lists, Angular performs well out of the box an this isn't needed.
  trackCourse(index, course) {
    return course ? course.id : undefined;
  }
}
