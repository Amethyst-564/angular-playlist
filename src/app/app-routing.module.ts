import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlaylistComponent } from './playlist/playlist.component';
import { SearchComponent } from './search/search.component';
import { AboutComponent } from './about/about.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { UploadComponent } from './upload/upload.component';
import { ListComponent } from './list/list.component';
import { HomeComponent } from './home/home.component';
import { UserDetailComponent } from './user-detail/user-detail.component';


const routes: Routes = [

  { path: 'login', pathMatch: 'full', component: LoginComponent },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'prefix',
    children: [
      { path: '', redirectTo: 'search', pathMatch: 'full' },
      { path: 'playlist', component: PlaylistComponent, pathMatch: 'prefix' },
      { path: 'playlist/r/:pid', component: PlaylistComponent, pathMatch: 'prefix' },
      { path: 'playlist/l/:playlistId', component: PlaylistComponent, pathMatch: 'prefix' },
      { path: 'list', component: ListComponent, pathMatch: 'prefix' },
      { path: 'search', component: SearchComponent, pathMatch: 'prefix' },
      { path: 'about', component: AboutComponent, pathMatch: 'prefix' },
      { path: 'upload', component: UploadComponent, pathMatch: 'prefix' },
      { path: 'user-detail', component: UserDetailComponent, pathMatch: 'prefix' },
      { path: 'error', component: ErrorComponent, pathMatch: 'prefix' },
      { path: '**', redirectTo: 'error', pathMatch: 'full' }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
