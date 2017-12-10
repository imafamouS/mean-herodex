import { Pipe, PipeTransform } from '@angular/core';
//Pipe in hoa ky tu dau tien trong chuoi
@Pipe({name: 'upperFirstLetter'})
export class UpperFirstLetterPipe implements PipeTransform {
    transform(value: string, arg?: any) {
        if (!value) {
            return;
        }

        return value.charAt(0)
                    .toUpperCase() + value.slice(1);
    }
}
