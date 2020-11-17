import { Component, OnInit } from '@angular/core';
import { FakeArchivesService } from './../services/fake-archives.service';

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.css']
})
export class ArchivesComponent implements OnInit {
  archives: any;

  constructor(private service: FakeArchivesService) { 
    this.archives = service.getArchives();
  }

  ngOnInit(): void {
  }

}
