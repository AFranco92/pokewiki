import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {

  loadAll: boolean = false;
  pokemonToSearch: String = "";
  typeToPokemonSearch: String = "";
  loadAllChange: Subject<boolean> = new Subject<boolean>();
  pokemonToSearchChange: Subject<String> = new Subject<String>();
  typeToPokemonSearchChange: Subject<String> = new Subject<String>();

  constructor(private http: HttpClient) {
    this.loadAllChange.subscribe((value) => {
      this.loadAll = value;
    });
    this.pokemonToSearchChange.subscribe((value) => {
      this.pokemonToSearch = value;
    });
    this.typeToPokemonSearchChange.subscribe((value) => {
      this.typeToPokemonSearch = value;
    });
  }

  setLoadAll(loadAll: boolean) {
    this.loadAllChange.next(loadAll);
  }

  setPokemonToSearch(pokemon: String) {
    this.pokemonToSearchChange.next(pokemon);
  }

  setTypeToPokemonSearchsetTypeToPokemonSearch(type: String) {
    this.typeToPokemonSearchChange.next(type);
  }

  getTypes() {
    return this.http.get('https://pokeapi.co/api/v2/type');
  }

}
