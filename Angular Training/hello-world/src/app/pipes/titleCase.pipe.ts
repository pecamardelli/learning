import {Pipe, PipeTransform} from '@angular/core';

/*
 * Changes the case of the first letter of a world by avoiding the prepositions.
*/

@Pipe({name: 'titlecase'})
export class TitleCase implements PipeTransform {
    transform(input:string, args?: any):string {
        if(!input) return;
        let words = input.split(" ");
        for (var i=0 ; i<words.length; i++){
            let word = words[i];
            if (this.isPrepositions(word) && i !=0 ){
               words[i] = word.toLowerCase() + " ";
            }
            else {
              words[i] = this.makeCamelCase(word);
            }
        }
       return words.join(" ");
    }

    private isPrepositions(word:string):boolean {
        let prepositions = ["of", "the", "is", "on", "as", "to", "an", "in" ];
        return prepositions.includes(word.toLowerCase());
    }

   private makeCamelCase(word:string):string{
        return word.substr(0,1).toUpperCase() + word.substr(1).toLowerCase();
   }
}