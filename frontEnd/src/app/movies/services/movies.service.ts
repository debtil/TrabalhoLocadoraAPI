import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import Movie from '../models/Movie';
import { AuthService } from 'src/app/users/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private apiURL: string = 'http://localhost:3333';

  constructor(private http: HttpClient, private authService: AuthService) { }

  listarTodos(){
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `bearer ${token}`);
    return this.http.get<Movie[]>(`${this.apiURL}/movies`, {headers: headers});
  }

  
  listarFilme(id: string){
    return this.http.get<Movie>(`${this.apiURL}/movies/${id}`);
  }

  
  alocarFilme(movie: Movie){
    return this.http.post(`${this.apiURL}/movies/`, movie);
  }
  
  editarFilme(id: string, movie: Movie){
    return this.http.put(`${this.apiURL}/movies/${id}`, movie);
  }
  
  excluirFilme(id: string){
    return this.http.delete(`${this.apiURL}/movies/${id}`);
  }
}
