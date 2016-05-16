import {Pipe,PipeTransform} from '@angular/core';

@Pipe({
  name:'replace'
})

export class ReplacePipe implements PipeTransform{
  transform(value:string,arg1,arg2){
    if(value && arg1 && arg2){
      return value.split(arg1).join(arg2);
    }
  }
}
