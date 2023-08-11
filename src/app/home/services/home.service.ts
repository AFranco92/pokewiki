import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { PokemonResult } from '../../interfaces/PokemonResult';
import { Pokemon, PokemonSpecie } from '../../interfaces/Pokemon';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  limit: string = "20";

  constructor(private http: HttpClient) { }

  public get(): Observable<PokemonResult> {
    return this.http.get<PokemonResult>('https://pokeapi.co/api/v2/pokemon');
  }

  public getOne(idOrName: string | number): Observable<Pokemon> {
    return this.http.get<Pokemon>('https://pokeapi.co/api/v2/pokemon/'+idOrName);
  }

  public getNextOrPrev(offset: string): Observable<PokemonResult> {    
    return this.http.get<PokemonResult>('https://pokeapi.co/api/v2/pokemon?offset='+offset+'&limit='+this.limit+'');
  }

  public getSpecie(idOrName: string | number): Observable<PokemonSpecie> {
    return this.http.get<PokemonSpecie>('https://pokeapi.co/api/v2/pokemon-species/'+idOrName);
  }

}
