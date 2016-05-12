import {Pipe,PipeTransform} from '@angular/core';

@Pipe({
  name:'makeTitles'
})

export class MakeTitlesPipe implements PipeTransform{
  transform(text:string){
    if (!text) return '';
    // replace [[X]] links
    function replacer(match, p1, p2, p3, offset, string) {

      return '<h2>' + p1 + '</h2>';

    }
    text = text.replace(/\=\=\=([^\=\=\=]+)\=\=\=/igm, replacer);
    text = text.replace(/\=\=([^\=]+)\=\=/igm, replacer);

    return text;

  }
}


