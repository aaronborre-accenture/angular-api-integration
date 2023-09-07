import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'asterisk'
})

export class ToAsteriskPipe implements PipeTransform {
    transform(value: any, ...args: any[]): string {
        let arrString = value.split('')
        return arrString.map((str: any, index: any) => {
            let newStr = str
            return newStr = ((index > 1 && index <= 4) || (index > 6 && index <= 8)) ? "*" : str
        }).join('')
    }
}