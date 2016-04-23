import {Pipe,PipeTransform} from 'angular2/core';

@Pipe({
  name:'replace'
})

export class ReplacePipe implements PipeTransform{
  transform(value:string,args:any[]){
    if(value && args[0] && args[1]){
      return value.split(args[0]).join(args[1]);
    }

  }
}
