import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'capitalize',
})

export class CapitalizePipe implements PipeTransform {
    transform(value: any, ...args: any[]): string {
        let newString = value.split(" ")
        return newString.map((str: string) =>{  
            return str.charAt(0).toUpperCase() + str.slice(1)
        }).join(" ")
    }
}