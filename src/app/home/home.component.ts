import { Component, OnInit, ViewChild } from '@angular/core';
import { PokemonResult } from '../interfaces/PokemonResult';
import { NavBarService } from '../nav-bar/services/nav-bar.service';
import { TypeService } from '../shared/services/type.service';
import { HomeService } from './services/home.service';
import { Pokemon } from '../interfaces/Pokemon';
import { map, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public pokemons?: PokemonResult;
  public pokemonsFullInfo: Pokemon[] = [];
  offset: number = 0;

  constructor(private homeService: HomeService, 
              private navBarService: NavBarService,
              private typeService: TypeService,
              private router: Router) { }

  ngOnInit(): void {

    this.getAll();

    this.navBarService.pokemonToSearchChange.subscribe(value => {
      if(value === null || value === "") {
        this.getAll();
      } else {
        this.homeService.getOne(value.toLowerCase()).subscribe((pokemon: Pokemon) => {
          this.pokemonsFullInfo = [];
          this.pokemonsFullInfo.push(pokemon);
        });
      }
    });

    
    this.navBarService.typeToPokemonSearchChange
      .pipe(
        tap( type => {
          this.pokemonsFullInfo = [];
          this.typeService.getPokemons(type)
          .pipe(
            tap( typeInfo => typeInfo.pokemon.forEach( pokemon => {
              this.homeService.getOne(pokemon.pokemon.name)
                .subscribe(( pokemon: Pokemon ) => {
                  this.pokemonsFullInfo.push(pokemon);
                });
            })),
            tap( () => this.pokemonsFullInfo.sort((a, b) => a.id - b.id) )
          )
          .subscribe();
        })
      )
    .subscribe();
    


/*     this.navBarService.typeToPokemonSearchChange.subscribe(value => {      
      this.typeService.getPokemons(value.toLowerCase())
        .subscribe((data: any) => {
          this.pokemonsFullInfo = [];
          this.pokemonsFullInfo = data.pokemon;
          this.pokemonsFullInfo.forEach(pokemon => {
            this.pokemonsFullInfo = [];
            this.homeService.getOne(pokemon.name).subscribe((pokemon: Pokemon) => {
              this.pokemonsFullInfo.push(pokemon);
              this.pokemonsFullInfo.sort((a, b) => a.id - b.id);
            });
          });
        });
    }); */

    this.navBarService.loadAllChange.subscribe(value => {
      if(value) {
        this.getAll();
      }
    });

  }

  getAll(): void {
    this.pokemonsFullInfo = [];
    this.homeService.get()
      .pipe(
        tap( pokemonResult => pokemonResult.results.forEach( pokemon => {
          this.homeService.getOne(pokemon.name)
            .pipe(
              tap( pokemon => this.pokemonsFullInfo.push(pokemon) ),
              tap( () => this.pokemonsFullInfo.sort((a, b) => a.id - b.id) )
            )
          .subscribe();
        }))
      )
      .subscribe();
  }

  getNextOrPrev(prev: boolean) {
    this.pokemonsFullInfo = [];
    if(prev && this.offset >= 20) {
      this.offset -= 20;
    } else if(!prev) {
      this.offset += 20;
    }
    this.homeService.getNextOrPrev(this.offset.toString())
      .pipe(
        tap( pokemonResult => pokemonResult.results.forEach( pokemon => {
          this.homeService.getOne(pokemon.name)
            .pipe(
              tap( pokemon => this.pokemonsFullInfo.push(pokemon) ),
              tap( () => this.pokemonsFullInfo.sort((a, b) => a.id - b.id) )
            )
            .subscribe();           
          })
        )
      )
      .subscribe();
  }

  get pokemonToSearch(): String {
    return this.navBarService.pokemonToSearch;
  }



}
