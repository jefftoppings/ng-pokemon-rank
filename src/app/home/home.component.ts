import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { PokemonSelectComponent } from '../pokemon-select/pokemon-select.component';
import {
  PokemonStats,
  PokemonStatsComponent,
} from '../pokemon-stats/pokemon-stats.component';
import { PokemonRankComponent } from '../pokemon-rank/pokemon-rank.component';
import { Observable, ReplaySubject } from 'rxjs';

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
    MatButtonModule,
    PokemonRankComponent,
  ],
})
export class HomeComponent {
  private selectedPokemon$$: ReplaySubject<string> = new ReplaySubject(1);
  readonly selectedPokemon$: Observable<string> = this.selectedPokemon$$.asObservable();
  private stats$$: ReplaySubject<PokemonStats> = new ReplaySubject(1);
  readonly stats$: Observable<PokemonStats> = this.stats$$.asObservable();

  handlePokemonSelected(pokemon: string): void {
    this.selectedPokemon$$.next(pokemon);
  }

  handleStatsChanged(stats: PokemonStats): void {
    this.stats$$.next(stats);
  }
}
