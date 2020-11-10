import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface FavouriteChangedEventArgs {
  newValue: boolean
}

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
  //styles: [ `svg { color: blue; } `]
})
export class FavouriteComponent implements OnInit {
  @Input('active') isSelected: boolean;
  // Defining an output property. Must have the same name that the event that intends to raise.
  @Output('change') someOtherNameWithoutAnySense  = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  @Input() onClick(){
    this.isSelected = !this.isSelected;
    // We can pass data to the subscribers of this event emitter.
    // Could be any value, an array, an object and so on...
    this.someOtherNameWithoutAnySense.emit({ newValue: this.isSelected });
  }

}
