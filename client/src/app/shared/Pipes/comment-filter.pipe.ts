import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'comment'
})
export class CommentFilterComponent implements PipeTransform {
  finalComment:string='';
  constructor(private domSanitizer : DomSanitizer) {}
  transform(comment:string)
  {
    let ht=` `;
    var raw=comment.split("[[")
    ht=raw[0];
    for (let i = 1; i < raw.length ; i++){
      ht+=`<span class="badge badge-info cursor-pointer" data-link="/user-profile/`+JSON.parse(raw[i].split(']]')[0]).user.email+`">` +JSON.parse(raw[i].split(']]')[0]).value+`</span>`+' '+raw[i].split(']]')[1];
    }
    return this.domSanitizer.bypassSecurityTrustHtml(ht);
  }
}


