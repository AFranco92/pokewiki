import { Component, OnInit } from '@angular/core';
import { PokemonType } from '../models/PokemonType';
import { NavBarService } from './nav-bar.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  pokemon: String = "";
  pokemonToSearch: String = "";
  types: PokemonType[] = [];

  constructor(private service: NavBarService) { 
    this.pokemonToSearch = this.service.pokemonToSearch;
  }

  setPokemonToSearch() {
    this.service.setPokemonToSearch(this.pokemon);
  }

  setTypeToPokemonSearch(type: String) {
    this.service.setTypeToPokemonSearchsetTypeToPokemonSearch(type);
  }

  ngOnInit(): void {
    this.service.getTypes().subscribe((data: any) => {
      this.types = data.results;
    });
  }

  getAll() {
    this.service.setLoadAll(true);
  }

}
