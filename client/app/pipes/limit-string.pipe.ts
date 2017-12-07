import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'limitString' })
export class LimitStringPipe implements PipeTransform {
	transform(value: string, limit: number) {
		if (!value) {
			return;
		}
		if (!limit) {
			limit = 5;
		}
		if (value.length < limit) {
			return value.slice(0, limit - 1);
		}
		return value.slice(0, limit - 1) + "...";
	}
}