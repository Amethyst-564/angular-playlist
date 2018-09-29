import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private uploadUrl = '/boot/file/uplist';

  constructor(private http: HttpClient) { }

  upload(formdata: any): Observable<any> {

    return this.http.post<any>(this.uploadUrl, formdata);

  }
}
