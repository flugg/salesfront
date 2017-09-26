import { animate, style, transition, trigger, stagger, query } from '@angular/animations';

export function popEachInOut() {
  return trigger('popEachInOut', [
    transition(':enter', [
      query('*', [
        style({ transform: 'scale(0)' }),
        stagger(2000, [
          animate('400ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({ transform: 'scale(1)' }))
        ])
      ])
    ])
  ]);
}