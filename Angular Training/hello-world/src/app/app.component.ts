import { Component } from '@angular/core';
import { FavouriteChangedEventArgs } from './favourite/favourite.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Angular App!';

  tweet = {
    body: "This is the body of the request...",
    isLiked: false,
    likesCount: 1255
  }

  onFavouriteChanged(eventArgs: FavouriteChangedEventArgs){
    console.log('Favourite Changed: ', eventArgs.newValue);
  }
}
