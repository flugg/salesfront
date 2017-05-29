import { Component, OnInit } from '@angular/core';
import { DatepickerService } from './datepicker.service';
import { ScreenService } from '../../../../../../core/screen.service';

@Component({
  selector: 'vmo-datepicker',
  templateUrl: 'datepicker.component.html',
  styleUrls: ['datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {

  /**
   * Todays date.
   */
  todaysDate: Date;

  /**
   * Indicates if the screen is small.
   */
  mobile: boolean;

  /**
   * Constructs the component.
   */
  constructor(public datepicker: DatepickerService,
              private screenService: ScreenService) {}

  /**
   * Initializes the component.
   */
  ngOnInit(): void {
    this.todaysDate = new Date();
    this.screenService.asObservable().subscribe(breakpoint => {
      this.mobile = breakpoint === 'xs' || breakpoint === 'sm';
    });
  }
}
