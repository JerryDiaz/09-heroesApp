import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../../models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  hereo: HeroeModel = new HeroeModel();

  constructor(private heroesService: HeroesService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
   

    if( id !== 'nuevo' ){
      this.heroesService.getHeroe(id)
        .subscribe( (resp: HeroeModel)=> {
          this.hereo = resp;
          this.hereo.id = id;
        });
    }   

  }

  guardar(form: NgForm){

    if(form.invalid){
      console.log('Formulario no válido');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando Información',
      icon: 'info',
      allowOutsideClick: false
    });

    Swal.showLoading();

    let peticion: Observable<any>;

    console.log(this.hereo);

    if(this.hereo.id){  
      console.log('Entro Actualizar');   
      peticion = this.heroesService.actualizarHeroe(this.hereo);
     
    }
    else{
      console.log('Entro guardar');
      peticion = this.heroesService.crearHeroe(this.hereo);
    }

    peticion.subscribe( resp =>{
      console.log(resp);
      Swal.fire({
        title: this.hereo.nombre,
        text: 'Se actualizo correctamente',
        icon: 'success'
      });

    });

  }
}
