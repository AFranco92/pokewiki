import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(private http: HttpClient) { }

  public getPokemons(type: String) {
    return this.http.get('https://pokeapi.co/api/v2/type/'+type);
  }

}
