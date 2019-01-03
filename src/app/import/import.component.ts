import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.less']
})
export class ImportComponent implements OnInit {

  placeHolderText = 'Choose your playlist file';

  constructor() { }

  ngOnInit() {
  }

  openFileBrowse() {
    const fileSelector = document.getElementById('customFile');
    if (fileSelector) {
      fileSelector.click();
    }
  }

  changeFile(files: FileList) {
    console.log(files);
  }

}
