import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlaylistComponent } from './playlist/playlist.component';
import { SearchComponent } from './search/search.component';
import { AboutComponent } from './about/about.component';
import { NotfoundComponent } from './notfound/notfound.component';


const routes: Routes = [

  // 默认路由
  { path: '', redirectTo: '/search', pathMatch: 'full' },

  // 歌单组件
  { path: 'playlist', component: PlaylistComponent },
  { path: 'playlist/:id', component: PlaylistComponent },
  // 搜索组件
  { path: 'search', component: SearchComponent },
  // about
  { path: 'about', component: AboutComponent },
  // 404页
  { path: 'notfound', component: NotfoundComponent },
  // TODO 前面所有都不匹配时，重定向到404页
  { path: '**', pathMatch: 'full', redirectTo: 'notfound' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
