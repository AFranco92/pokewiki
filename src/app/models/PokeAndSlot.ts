import { Pokemon } from "./PokemonResult";

export class PokeAndSlot {

  name: String;
  slot: number;

  constructor(name: String, slot: number) {
    this.name = name;
    this.slot = slot;
  }
}