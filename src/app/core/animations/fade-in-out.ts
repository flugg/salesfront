import { animate, style, transition, trigger } from '@angular/animations';

export function fadeInOut() {
  return trigger('fadeInOut', [
    transition(':enter', [
      style({ opacity: '0' }),
      animate('150ms ease-in', style({ opacity: '1' }))
    ])
  ]);
}