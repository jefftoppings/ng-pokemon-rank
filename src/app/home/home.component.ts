import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PokemonSelectComponent } from '../pokemon-select/pokemon-select.component';
import {
  PokemonStats,
  PokemonStatsComponent,
} from '../pokemon-stats/pokemon-stats.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    PokemonSelectComponent,
    PokemonStatsComponent,
  ],
})
export class HomeComponent {
  handlePokemonSelected(pokemon: string): void {
    console.log(pokemon);
  }

  handleStatsChanged(stats: PokemonStats): void {
    console.log(stats);
  }
}
