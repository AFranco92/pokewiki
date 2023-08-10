import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { PokemonResult } from '../models/PokemonResult';
import { Pokemon } from '../models/Pokemon';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  limit: string = "20";

  constructor(private http: HttpClient) { }

  public get(): Observable<PokemonResult> {
    return this.http.get<PokemonResult>('https://pokeapi.co/api/v2/pokemon');
  }

  public getOne(idOrName: any): Observable<Pokemon> {
    return this.http.get<Pokemon>('https://pokeapi.co/api/v2/pokemon/'+idOrName);
  }

  public getNextOrPrev(offset: string): Observable<PokemonResult> {    
    return this.http.get<PokemonResult>("https://pokeapi.co/api/v2/pokemon?offset="+offset+"&limit="+this.limit+"");
  }

}
