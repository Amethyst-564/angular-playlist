import { Component, OnInit } from '@angular/core';

import * as _ from 'lodash';
import * as XLSX from 'xlsx';
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
    const file = files[0];
    const ext = _.last(file.name.split('.'));
    if (ext === 'xlsx') {
      this.placeHolderText = `已选择文件：${file.name}`;
      console.log(file);
      const reader = new FileReader();
      reader.onload = function (ev) {
        const data = (ev.target as any).result;
        const workbook = XLSX.read(data, {
          type: 'binary'
        });
        console.log(workbook);
        const content = [];
        for (const sheet in workbook.Sheets) {
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            const fromTo = workbook.Sheets[sheet]['!ref'];
            const basicFromTo = 'A2:C3';
            const detailFromTo = `A6:${_.last(fromTo.split(':'))}`;

            const basicContent = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], { range: basicFromTo });
            const detailContent = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], { range: detailFromTo });
            console.log(basicContent);
            console.log(detailContent);
          }
        }
      };
      reader.readAsBinaryString(file);
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
