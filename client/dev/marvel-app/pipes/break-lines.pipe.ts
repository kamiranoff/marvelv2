import {Pipe,PipeTransform} from 'angular2/core';

@Pipe({
  name:'breakLines'
})

export class BreakLinesPipe implements PipeTransform {
  transform(text:string) {
    if (!text) return '';

    // replace new line characters with br tag
    text = text.replace(/(\r\n|\n|\r)/gm, '<br>');


    return text;
  };
}

