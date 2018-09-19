import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../service/playlist.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.less']
})
export class PlaylistComponent implements OnInit {

  constructor(private playlistService: PlaylistService) { }

  listId;
  listTitle;
  tracks = [];
  artists = [];

  ngOnInit() {
    this.getDetails();
  }

  getDetails(): void {
    this.playlistService.getDetails().subscribe(root => {
      console.log('获取到歌单json');
      this.listId = root.result.id;
      this.listTitle = root.result.name;
      // this.tracks = root.result;
      console.log(this.listId, ' ', this.listTitle);
      console.log(root.tracks);
    });
  }

}
