import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Project } from '../core/models/project.model';

@Pipe({
  name: 'value',
  pure: false
})
export class ValuePipe implements PipeTransform {
  constructor(public decimalPipe: DecimalPipe) {}

  transform(value: number, project: Project): number | string | null {
    if (project) {
      const formattedValue = this.decimalPipe.transform(value + '', '1.' + project.decimals + '-' + project.decimals);

      if (project.type === 'count') {
        return formattedValue;
      }

      return project.notationBefore ? project.notation + ' ' + formattedValue : formattedValue + ' ' + project.notation;
    }
  }
}
