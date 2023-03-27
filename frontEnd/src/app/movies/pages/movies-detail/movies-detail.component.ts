import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Movie from '../../models/Movie';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movies-detail',
  templateUrl: './movies-detail.component.html',
  styleUrls: ['./movies-detail.component.scss']
})
export class MoviesDetailComponent implements OnInit {

  movie: Movie = new Movie();
  form_editar: FormGroup;
  isSubmitted: boolean = false;

  constructor(private moviesService: MoviesService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.form_editar = this.formBuilder.group({
      name: ["", [Validators.required]],
      price: ["", [Validators.required]],
      year: ["", [Validators.required]],
      director: ["", [Validators.required]],
      studio: ["", [Validators.required]],
      duration: ["", [Validators.required]],
      genre: ["", [Validators.required]],
    });

    let id = (String(this.route.snapshot.paramMap.get('id')));
    this.moviesService.listarFilme(id).subscribe(
      resultado => {
        this.movie = resultado;
        this.form_editar = this.formBuilder.group({
          name: ["", [Validators.required]],
          price: ["", [Validators.required]],
          year: ["", [Validators.required]],
          director: ["", [Validators.required]],
          studio: ["", [Validators.required]],
          duration: ["", [Validators.required]],
          genre: ["", [Validators.required]],
        });
      }
    );
   }

  ngOnInit(): void {
  }
  
  get errorControl(){
    return this.form_editar.controls;
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.form_editar.valid){
      return false;
    }else{
      this.editar();
      return true;
    }
  }

  editar(){
    this.moviesService.editarFilme(this.movie.id, this.form_editar.value).subscribe(resultado =>{
      console.log("filme editado");
      this.router.navigate(['movies']);
    });
  }

}
