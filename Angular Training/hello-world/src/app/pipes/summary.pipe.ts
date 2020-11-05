import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'summary'
})
export class SummaryPipe implements PipeTransform {
    transform(value: string, limit?: number) {
        if(!value) return null;

        // If limit is not specified, we'll use 50 by default.
        const actualLimit = limit ? limit : 50;
        return value.substr(0, actualLimit) + '...';
    }
}