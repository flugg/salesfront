import { animate, style, transition, trigger } from '@angular/animations';

export function slideIn() {
  return trigger('slideIn', [
    transition(':enter', [
      style({ transform: 'scaleX(0)' }),
      animate('600ms ease-in-out', style({ transform: 'scaleX(1)' }))
    ])
  ]);
}