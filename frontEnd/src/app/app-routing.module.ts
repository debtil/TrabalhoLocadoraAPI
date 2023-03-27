import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesDetailComponent } from './movies/pages/movies-detail/movies-detail.component';
import { MoviesComponent } from './movies/pages/movies/movies.component';
import { CreateComponent } from './users/pages/create/create.component';
import { SessionComponent } from './users/pages/session/session.component';

const routes: Routes = [
  {
    path: "movies",
    component: MoviesComponent
  },
  {
    path: "movie-detail/:id",
    component: MoviesDetailComponent
  },
  {
    path: "create-user",
    component: CreateComponent
  },
  {
    path: "session",
    component: SessionComponent
  },
  {
    path: "**",
    redirectTo: "/session",
  },
  {
    path: "",
    redirectTo: "/session",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
