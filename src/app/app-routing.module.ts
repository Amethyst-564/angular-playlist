import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlaylistComponent } from './playlist/playlist.component';
import { SearchComponent } from './search/search.component';


const routes: Routes = [

  // 默认路由
  { path: '', redirectTo: '/playlist', pathMatch: 'full' },
  { path: 'playlist/:id', component: PlaylistComponent },


  // 歌单组件路由
  { path: 'playlist', component: PlaylistComponent },
  { path: 'search', component: SearchComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
