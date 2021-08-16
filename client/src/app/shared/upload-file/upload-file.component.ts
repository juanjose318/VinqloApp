import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { UnlinkService } from 'src/app/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({ url: `${environment.fileUploadUrl}/api/upload` });

  @ViewChild('input') input!: ElementRef;
  @Output() isLoader= new EventEmitter<boolean>();
  @Output() upload = new EventEmitter<string>();
  iisLoader:boolean=false;
  @Output() remove = new EventEmitter<string>();

  @Input() accept = "image/*";

  constructor(private unlinkService: UnlinkService) { }

  ngOnInit(): void {
    this.setUploader();
  }
  setUploader() {
    this.uploader.onAfterAddingFile = (file) => {
      this.isLoader.emit(true);
      file.onSuccess = (res: any) => { this.isLoader.emit(false);
        this.upload.emit(JSON.parse(res).url);
      };
    };
  }

  onFileClick(event: any) {
    event.target.value = '';
  }

  removeImage(img: string) {
    this.unlinkService.delete(img).subscribe(res => {
      if (+res.status === 200) {
        this.uploader.queue = [];
        this.remove.emit(img);
      }
    });
  }

  click() {
    this.input.nativeElement.click();
  }

}
