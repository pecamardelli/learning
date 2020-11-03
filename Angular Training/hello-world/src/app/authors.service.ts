import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  constructor() { }

  getAuthors() {
    return ['Author1', 'Author2', 'Author3'];
  }
}
