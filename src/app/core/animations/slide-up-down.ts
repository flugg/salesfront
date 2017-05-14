import { animate, style, transition, trigger } from '@angular/animations';

export function slideUpDown() {
  return trigger('slideUpDown', [
    transition(':enter', [
      style({ transform: 'translateY(100%)' }),
      animate('150ms ease-out', style({ transform: 'translateY(0%)' }))
    ]),
    transition(':leave', [
      style({ transform: 'translateY(0%)' }),
      animate('150ms ease-in', style({ transform: 'translateY(100%)' }))
    ])
  ]);
}