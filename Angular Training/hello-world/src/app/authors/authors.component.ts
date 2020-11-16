import { Component, OnInit } from '@angular/core';
import { AuthorsService } from '../services/authors.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  title: string  = 'List of Authors';
  authors: string[];

  constructor(service: AuthorsService) {
    this.authors = service.getAuthors();
  }

  ngOnInit(): void {
  }

}
