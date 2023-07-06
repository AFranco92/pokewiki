import { Component, OnInit, ViewChild } from '@angular/core';
import { Pokemon } from '../models/Pokemon';
import { NavBarService } from '../nav-bar/nav-bar.service';
import { TypeService } from '../shared/services/type.service';
import { HomeService } from './home.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public pokemons: Pokemon[] = [];
  public pokemonsFullInfo: Pokemon[] = [];
  cols: string[] = ['name', 'image'];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  offset: number = 0;

  constructor(private homeService: HomeService, 
              private navBarService: NavBarService,
              private typeService: TypeService) { }

  ngOnInit(): void {

    this.getAll();

    this.navBarService.pokemonToSearchChange.subscribe(value => {
      if(value === null || value === "") {
        this.getAll();
      } else {
        this.homeService.getOne(value).subscribe((pokemon:  any) => {
          this.pokemonsFullInfo = [];
          this.pokemonsFullInfo.push(pokemon);
          this.refreshTable();
        });
      }
    });

    this.navBarService.typeToPokemonSearchChange.subscribe(value => {
      this.typeService.getPokemons(value.toLowerCase()).subscribe((data: any) => {
        this.pokemonsFullInfo = [];
        this.pokemonsFullInfo = data.pokemon;
        this.pokemonsFullInfo.forEach(pokemon => {
          this.pokemonsFullInfo = [];
          this.homeService.getOne(pokemon.pokemon.name).subscribe((pokemon: Pokemon) => {
            this.pokemonsFullInfo.push(pokemon);
            this.pokemonsFullInfo.sort((a, b) => a.id - b.id);
            this.refreshTable();
          });
        });
      });
    });

    this.navBarService.loadAllChange.subscribe(value => {
      if(value) {
        this.getAll();
      }
    });

  }

  getAll() {
    this.pokemonsFullInfo = [];
    this.offset = 0;
    this.homeService.get().subscribe((data: any) => {
      this.pokemons = data.results;
      this.pokemons.forEach(pokemon => {
        let id = pokemon.url.substring(34, 36).replace("/", "");
        this.homeService.getOne(id).subscribe((pokemon: any) => {
          this.pokemonsFullInfo.push(pokemon);
          this.pokemonsFullInfo.sort((a, b) => a.id - b.id);
          this.refreshTable();
        });
      });
    });
  }

  refreshTable() {
    this.dataSource = new MatTableDataSource<Pokemon>(this.pokemonsFullInfo);
    this.dataSource.paginator = this.paginator;
  }

  getNextOrPrev(prev: boolean) {
    this.pokemonsFullInfo = [];
    if(prev && this.offset >= 20) {
      this.offset -= 20;
    } else if(!prev) {
      this.offset += 20;
    }
    this.homeService.getNextOrPrev(this.offset.toString()).subscribe((data: any) => {
      this.pokemons = data.results;
      this.pokemons.forEach(pokemon => {
        let id = pokemon.url.substring(34, 36).replace("/", "");
        this.homeService.getOne(id).subscribe((pokemon: any) => {
          this.pokemonsFullInfo.push(pokemon);
          this.pokemonsFullInfo.sort((a, b) => a.id - b.id);
          this.refreshTable();
        });
      });
    });
  }

  get pokemonToSearch(): String {
    return this.navBarService.pokemonToSearch;
  }

}
