import { Component } from '@angular/core';

@Component({
  selector: 'app-safetravop',
  templateUrl: './safetravop.component.html',
  styleUrls: ['./safetravop.component.css']
})
export class SafetravopComponent {
  task = {
    title: 'Some Task',
    assignee: {
      name: 'John Smith'
    }
  };
}
