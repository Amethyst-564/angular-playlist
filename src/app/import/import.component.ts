import { Component, OnInit } from '@angular/core';

import * as _ from 'lodash';
declare var $;

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.less']
})
export class ImportComponent implements OnInit {

  placeHolderText = '选择你的外部歌单文件';

  msgType: string;
  msgText: string;

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
    const fileName = files[0].name;
    const ext = _.last(fileName.split('.'));
    if (ext === 'xlsx') {
      console.log(fileName);
    } else {
      this.msgType = 'error';
      this.msgText = '暂不支持此格式';
      $('.toast').toast('show');
    }
  }

  upload() {
    this.msgType = 'success';
    this.msgText = '从外部文件保存歌单成功';
    $('.toast').toast('show');
  }

}
