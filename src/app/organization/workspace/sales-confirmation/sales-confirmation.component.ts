import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { WorkspaceComponent } from '../workspace.component';

@Component({
  templateUrl: 'sales-confirmation.component.html',
  styleUrls: ['sales-confirmation.component.scss']
})
export class SalesConfirmationComponent implements OnInit {

  /**
   * The chosen motivational cheer.
   */
  cheer: string;

  /**
   * List of available motivational cheers.
   */
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
  constructor(public dialog: MdDialogRef<WorkspaceComponent>) { }

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.cheer = this.getRandomCheer();
  }

  /**
   * Retrieves a random cheer from the list of cheers.
   */
  private getRandomCheer(): string {
    return this.cheers[Math.floor(Math.random() * this.cheers.length)];
  }
}
