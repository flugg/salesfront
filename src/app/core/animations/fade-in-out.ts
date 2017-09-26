import { animate, style, transition, trigger } from '@angular/animations';

export function fadeInOut() {
  return trigger('fadeInOut', [
    transition(':enter', [
      style({ opacity: '0' }),
      animate('400ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({ opacity: '1' }))
    ])
  ]);
}