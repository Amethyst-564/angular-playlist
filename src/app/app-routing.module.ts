import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlaylistComponent } from './playlist/playlist.component';


const routes: Routes = [

    // 默认路由
    { path: '', redirectTo: '/playlist', pathMatch: 'full' },

  // 歌单组件路由
  { path: 'playlist', component: PlaylistComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
