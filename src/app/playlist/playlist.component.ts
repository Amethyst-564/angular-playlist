import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../service/playlist.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.less']
})
export class PlaylistComponent implements OnInit {

  constructor(private playlistService: PlaylistService) { }

  tracks = [];
  artists = [];

  ngOnInit() {
    this.getDetails();
  }

  getDetails(): void {
    this.playlistService.getDetails().subscribe(root => {
      console.log(root);
      console.log('获取到歌单json');
      this.tracks = root.result;
      console.log(this.tracks);
    })
  }

}
