import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
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

  constructor(private activatedRoute: ActivatedRoute,
              private homeService: HomeService,
              private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap( ({ id }) => this.homeService.getOne(id)),
      tap( pokemon => {
        if ( !pokemon ) return this.router.navigate([ '/' ]);
        this.pokemon = pokemon;
        this.pokeImages.push(this.pokemon.sprites.front_default, this.pokemon.sprites.back_default);
        this.pokeImage = this.pokeImages[0];
        return;
      }),
      tap( pokemon => this.homeService.getSpecie(pokemon.name)
        .subscribe(pokeSpecie => {
          this.pokeSpecie = pokeSpecie;
          this.flavorText = this.pokeSpecie.flavor_text_entries[3].flavor_text.replace("\f", " ").replace("\n", " ");
        }))
    ).subscribe();
  }

  changeImage(index: 0 | 1): void {
    this.pokeImage = this.pokeImages[index];
  }

}
