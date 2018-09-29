import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { UploadService } from '../service/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.less']
})
export class UploadComponent implements OnInit {

  formdata = new FormData();
  fileNumber = 0;

  constructor(private uploadSerivce: UploadService,
    public element: ElementRef) { }

  ngOnInit() {
  }

  changeFile(files: FileList) {

    this.fileNumber = files.length;
    for (let i = 0; i < this.fileNumber; i++) {
      this.formdata.append('customFile', files[i]);
      console.log(files[i]);
    }
    // this.formdata.append('customFile', files[0]);
    console.log(this.formdata);

  }

  up() {

    if (this.fileNumber === 0) {
      console.log('文件数量为0!');
    } else {
      this.uploadSerivce.upload(this.formdata).subscribe(root => {
        console.log(root);
      });
    }

    // 要强制类型转换
    // const data = <HTMLInputElement>document.getElementById('customFile');
  }
}


