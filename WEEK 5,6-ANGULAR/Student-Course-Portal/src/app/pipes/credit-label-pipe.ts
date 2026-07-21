import { Pipe, PipeTransform } from '@angular/core';

// HANDS-ON 3 - Task 3, Steps 35-36:
// Transforms a numeric credit count into a human-readable label.
// Pure by default: only re-runs when the `value` reference/primitive changes.
@Pipe({
  name: 'creditLabel',
})
export class CreditLabelPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value === null || value === undefined || value === 0) {
      return 'No Credits';
    }
    return value === 1 ? '1 Credit' : `${value} Credits`;
  }
}
