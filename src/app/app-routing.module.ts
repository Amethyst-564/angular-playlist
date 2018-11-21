import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlaylistComponent } from './playlist/playlist.component';
import { SearchComponent } from './search/search.component';
import { AboutComponent } from './about/about.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { LoginComponent } from './login/login.component';
import { UploadComponent } from './upload/upload.component';
import { ListComponent } from './list/list.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [

  { path: 'login', pathMatch: 'full', component: LoginComponent },
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  },
  {
    path: 'index',
    component: HomeComponent,
    pathMatch: 'prefix',
    children: [
      { path: '', redirectTo: 'search', pathMatch: 'full' },
      { path: 'playlist', component: PlaylistComponent, pathMatch: 'prefix' },
      { path: 'playlist/:id', component: PlaylistComponent, pathMatch: 'prefix' },
      { path: 'list', component: ListComponent, pathMatch: 'prefix' },
      { path: 'search', component: SearchComponent, pathMatch: 'prefix' },
      { path: 'about', component: AboutComponent, pathMatch: 'prefix' },
      { path: 'upload', component: UploadComponent, pathMatch: 'prefix' },
      { path: 'notfound', component: NotfoundComponent, pathMatch: 'prefix' },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
