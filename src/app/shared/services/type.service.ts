import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonType } from 'src/app/interfaces/PokemonType';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(private http: HttpClient) { }

  public getPokemons(type: String): Observable<PokemonType> {
    return this.http.get<PokemonType>('https://pokeapi.co/api/v2/type/'+type);
  }

}
