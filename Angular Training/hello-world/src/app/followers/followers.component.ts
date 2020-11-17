import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FollowersService } from './../services/followers.service';
import { combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {
  followers: any;
  constructor(
    private route: ActivatedRoute,
    private service: FollowersService) { }

  ngOnInit() {
    /*
    // Also snapshots can be used when the user won't navigate through the same
    // component
    //this.route.snapshot.paramMap.get('id');
    this.route.paramMap
      .subscribe(params => {
        console.log(params);
      });

    //this.route.snapshot.queryParamMap.get('page');
    this.route.queryParamMap
      .subscribe(params => {
        console.log(params);
      });

    this.service.getAll()
      .subscribe(
        followers => {
          this.followers = followers;
      });
    
    // But wait! We can combine several observables into only one and get an array
    // of results. Let's see:
    combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ])
    .subscribe(([params, queryParams]) => {
      console.log(params, queryParams);
      this.service.getAll()
        .subscribe(
          followers => {
            this.followers = followers;
        });
    });
    */
    // But there's more! In order to re-write above's code and eliminate the nested
    // subscribe methods, we can use the switchMap operator and chain it after combineLatest
    // Let's see:
    combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ])
    .pipe(
      switchMap(combined => {
        console.log(combined[0], combined[1]);
        // Need to return the result of getAll as it will be the input of the
        // subscribe method.
        return this.service.getAll()
      })
    )
    .subscribe(followers => {
      this.followers = followers;
    });
  }
}
