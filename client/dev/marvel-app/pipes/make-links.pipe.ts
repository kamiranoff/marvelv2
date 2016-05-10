import {Pipe,PipeTransform} from 'angular2/core';

@Pipe({
  name:'makeLinks'
})

export class MakeLinksPipe implements PipeTransform{
  transform(text:string,field){
    if (!text) return '';
    // strip out image links
    text = text.replace(/\[\[(image):([^\]]+)\]\]/igm, '');

    // strip out glossary links
    text = text.replace(/\[\[glossary:([^\]]+)\]\]/igm, function (match, p1, p2, p3, offset, string) {
      var splitParts = p1.split('|');
      if (splitParts.length > 1) return splitParts[1];
      return p1;
    });

    // limit the links to a field
    var fieldLink = (typeof field === 'string') ? '&amp;field=' + field : '';

    // replace [[X]] links
    function replacer(match, p1, p2, p3, offset, string) {
      var splitParts = p1.split('|');

      if (splitParts.length > 1) {
        return '<a href="/characters/search?s='+encodeURIComponent(splitParts[0])+fieldLink+'">' + splitParts[1] + '</a>';
      }

      return '<a href="/characters/search?s='+encodeURIComponent(p1)+fieldLink+'">' + p1 + '</a>';

    }
    // return text.replace(/\[\[([\w, \(\)\|\-:#,\.']+)\]\]/igm, replacer);
    return text.replace(/\[\[([^\]]+)\]\]/igm, replacer);

  }
}


