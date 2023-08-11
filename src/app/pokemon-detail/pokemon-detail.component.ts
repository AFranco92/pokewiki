import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, switchMap, tap } from 'rxjs';
import { HomeService } from '../home/services/home.service';
import { Pokemon, PokemonSpecie } from '../interfaces/Pokemon';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {

  public pokemon?: Pokemon;
  public pokeImages: string[] = [];
  public pokeImage: string = '';
  public pokeSpecie?: PokemonSpecie;
  public flavorText: string = '';
  public breakPoint: number = 0;

  constructor(private activatedRoute: ActivatedRoute,
              private homeService: HomeService,
              private router: Router) { }

  ngOnInit(): void {
    this.breakPoint = (window.innerWidth <= 1500) ? 2 : 6;
    this.activatedRoute.params
    .pipe(
      switchMap( ({ id }) => this.homeService.getOne(id)),
      tap( pokemon => {
        if ( !pokemon ) return this.router.navigate([ '/' ]);
        this.pokemon = pokemon;
        this.pokeImages.push(this.pokemon.sprites.front_default, this.pokemon.sprites.front_shiny);
        this.pokeImage = this.pokeImages[0];
        return;
      }),
      tap( pokemon => {
        this.homeService.getSpecie(pokemon.name)
          .subscribe(pokeSpecie => {
            this.pokeSpecie = pokeSpecie;
            this.flavorText = this.pokeSpecie.flavor_text_entries[3].flavor_text.replace("\f", " ").replace("\n", " ");
          })
        }
      ),
      catchError(error => of(error))
    ).subscribe();
  }

  changeImage(index: 0 | 1): void {
    this.pokeImage = this.pokeImages[index];
  }

  onResize(event: any) {
    this.breakPoint = (event.target?.innerWidth <= 1500) ? 2 : 6;
  }

}
