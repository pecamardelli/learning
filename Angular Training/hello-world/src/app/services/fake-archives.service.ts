import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FakeArchivesService {
  #archives = [
    { year: 2020, month: 1 },
    { year: 2020, month: 2 },
    { year: 2020, month: 3 },
    { year: 2020, month: 4 },
    { year: 2020, month: 5 },
    { year: 2020, month: 6 }
  ];

  getArchives() {
    return this.#archives;
  }
}
