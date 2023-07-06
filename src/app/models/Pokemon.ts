import { PokeAndSlot } from "./PokeAndSlot";
import { Sprite } from "./Sprite";

export class Pokemon {

  id: number;
  name: string;
  url: string;
  sprites: Sprite;
  pokemon: PokeAndSlot;

  constructor(id: number, name: string, url: string, sprites: Sprite, pokemon: PokeAndSlot) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.sprites = sprites;
    this.pokemon = pokemon;
  }

}