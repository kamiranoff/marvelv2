import {Pipe,PipeTransform} from '@angular/core';

@Pipe({
  name:'loadImages'
})

export class LoadImagesPipe implements PipeTransform{
  transform(text:string){

    if (!text) return '';


    text = text.replace(/data-src/igm, 'src');
    return text;
  }
}


