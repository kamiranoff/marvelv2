import {Pipe,PipeTransform} from '@angular/core';

@Pipe({
  name:'makeComicvineLinks'
})

export class MakeComicvineLinksPipe implements PipeTransform{
  transform(text:string){
    if (!text) return '';
    // replace [[X]] links
    function replacer(match, p1, p2, p3, offset, string) {
      console.log(match);
      if(match.indexOf('src=') > -1){
       return match;
       }
      var value = match.match(/>(.*?)</)[1];
      console.log("value",value);
      var id = p1.match(/data-ref-id="(.*?)"/);
      if(id){
        id = id[1];
      }else{
        id = p1.match(/href="(.*?)"/)[1];

      }
      id = id.substr(id.lastIndexOf("-") + 1).replace(/\/$/, '');

      console.log("id",id);
      if(id === 'null'){
        return;
      }
      return '<a href="/comicvine-characters/'+id+'">'+value +' </a>';



    }

    return text.replace(/<a(.*?)a>/igm, replacer);
    //return text;


  }
}


