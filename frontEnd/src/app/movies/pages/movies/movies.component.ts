import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Movie from '../../models/Movie';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  public movies: Movie[] = [];
  form_cadastrar: FormGroup;
  isSubmitted: boolean = false;

  constructor(private moviesService: MoviesService, private formBuilder: FormBuilder, private router: Router) {
    this.form_cadastrar = this.formBuilder.group({
      name: ["", [Validators.required]],
      price: ["", [Validators.required]],
      year: ["", [Validators.required]],
      director: ["", [Validators.required]],
      studio: ["", [Validators.required]],
      duration: ["", [Validators.required]],
      genre: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    console.log(this.listarTodos());
  }

  listarTodos(){
    this.moviesService.listarTodos().subscribe(resultado => {
      this.movies = resultado
    })
  }

  cadastrar(){
    this.moviesService.alocarFilme(this.form_cadastrar.value).subscribe(resultado =>{
      console.log("filme salvo" + resultado);
      window.location.reload();
    })
  }

  editar(movie: Movie){
    this.router.navigate(['movie-detail', movie.id]);
  }

  excluir(movie: Movie){
    this.moviesService.excluirFilme(movie.id).subscribe(resultado => {
      console.log(resultado);
      window.location.reload();
    }, 
      error => {
        console.log(error); 
    })
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.form_cadastrar.valid){
      return false;
    }else{
      this.cadastrar();
      return true;
    }
  }
}
