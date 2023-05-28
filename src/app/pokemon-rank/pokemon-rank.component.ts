import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  PokemonInfo,
  PokemonListService,
} from '../pokemon-select/pokemon-list.service';

@Component({
  selector: 'app-pokemon-rank',
  templateUrl: './pokemon-rank.component.html',
  styleUrls: ['./pokemon-rank.component.scss'],
  standalone: true,
  imports: [CommonModule, MatCardModule],
})
export class PokemonRankComponent {
  @Input() set pokemon(pokemon: string | null) {
    this.pokemonInfo =
      typeof pokemon === 'string'
        ? this.pokemonListService.getInfo(pokemon)
        : (this.pokemonInfo = undefined);
  }

  pokemonInfo!: PokemonInfo | undefined;

  constructor(private pokemonListService: PokemonListService) {}
}
