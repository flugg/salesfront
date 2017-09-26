import { animate, style, transition, trigger } from '@angular/animations';

export function popInOut() {
  return trigger('popInOut', [
    transition(':enter', [
      style({ transform: 'scale(0)' }),
      animate('600ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({ transform: 'scale(1)' }))
    ]),
    transition(':leave', [
      style({ transform: 'scale(1)' }),
      animate('200ms cubic-bezier(0.0, 0.0, 0.2, 1)', style({ transform: 'scale(0)' }))
    ])
  ]);
}