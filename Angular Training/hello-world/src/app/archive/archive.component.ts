import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute) { }

  year: number;
  month: number;

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => {
        this.year = +params.get('year');
        this.month = +params.get('month');
      });
  }

  goBack() {
    this.router.navigate(['/archives']);
  }
}
