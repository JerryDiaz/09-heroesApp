import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import {map, delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url= "https://login-app-ba0d4.firebaseio.com";

  constructor(private http: HttpClient) { }

  crearHeroe(heroe: HeroeModel){
  
    return this.http.post(`${this.url}/heroes.json`,heroe)
           .pipe(
              map( (resp:any) => {
                heroe.id = resp.name;
                return heroe;
              })
           );

  }

  actualizarHeroe(heroe: HeroeModel){

    console.log('Entro Actualizar');
    console.log(heroe);
    const heroeTem = {
      ...heroe
    };

    console.log('Heroe Temporal');
    console.log(heroeTem);

    delete heroeTem.id;

    console.log('Eliminar Id Heroe Temporal');
    console.log(heroeTem);

    return this.http.put(`${this.url}/heroes/${heroe.id}.json`,heroeTem);

  }

  borrarHeroe(id:string){
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

  getHeroe(id:string){
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  getHeroes(){
    return this.http.get(`${this.url}/heroes.json`)
      .pipe(
        map(this.crearArreglo),
        delay(1500)
      );
  }

  private crearArreglo(heroesObj: object){
    
    const heroes: HeroeModel[] = [];
   
    if(heroesObj === null){return [];}

    Object.keys(heroesObj).forEach(key=>{

      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;
      heroes.push(heroe);
    });    

    return heroes;
  }

}
