import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'upperFirstLetter' })
export class UpperFirstLetterPipe implements PipeTransform {
	transform(value: string, arg?: any) {
		if (!value) {
			return;
		}
		return value.charAt(0).toUpperCase() + value.slice(1);
	}
}