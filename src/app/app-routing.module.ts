import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlaylistComponent } from './playlist/playlist.component';
import { SearchComponent } from './search/search.component';


const routes: Routes = [

  // 默认路由
  { path: '', redirectTo: '/search', pathMatch: 'full' },

  // 歌单组件
  // { path: 'playlist', component: PlaylistComponent },
  { path: 'playlist/:id', component: PlaylistComponent },
  // 搜索组件
  { path: 'search', component: SearchComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
