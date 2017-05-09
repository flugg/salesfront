import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { AppComponent } from '../../app.component';

@Component({
  templateUrl: './sales-confirmation.component.html',
  styleUrls: ['./sales-confirmation.component.scss']
})
export class SalesConfirmationComponent implements OnInit {

  cheer: string;

  cheers = [
    'Great job!',
    'Nice one!',
    'Wow!',
    'Brilliant!',
    'Amazing!',
    'Unbelievable!',
    'Incredible!',
    'You are good!',
    'Awesome!',
    'Magnificent!',
    'Well done!',
    'Sweet!',
    'Smooth!',
    'Yes! Yes! Yes!',
    'Go! Go! Go!',
    'Keep it up!',
    'Oh yeah!'
  ];

  /**
   * Constructs the component.
   */
  constructor(public dialog: MdDialogRef<AppComponent>) { }

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.cheer = this.cheers[Math.floor(Math.random() * this.cheers.length)];
  }
}
