import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  finalize,
  Observable,
  ReplaySubject,
  Subscription,
  tap,
} from 'rxjs';
import {
  PokemonInfo,
  PokemonListService,
} from '../pokemon-select/pokemon-list.service';
import { PokemonStats } from '../pokemon-stats/pokemon-stats.component';
import {
  PokemonRankByLeague,
  PokemonRankService,
} from './pokemon-rank.service';
import { StatsContainerColorPipe } from './stats-container-color.pipe';

@Component({
  selector: 'app-pokemon-rank',
  templateUrl: './pokemon-rank.component.html',
  styleUrls: ['./pokemon-rank.component.scss'],
  standalone: true,
  imports: [CommonModule, MatCardModule, StatsContainerColorPipe],
})
export class PokemonRankComponent implements OnInit, OnDestroy {
  @Input() set pokemon(pokemon: string | null) {
    this.pokemon$$.next(pokemon);
    if (typeof pokemon === 'string') {
      this.pokemonInfo = this.pokemonListService.getInfo(pokemon);
    } else {
      this.pokemonInfo = undefined;
    }
  }
  @Input() set stats(stats: PokemonStats | null) {
    this.stats$$.next(stats);
  }

  pokemonInfo!: PokemonInfo | undefined;
  private stats$$: ReplaySubject<PokemonStats | null> = new ReplaySubject(1);
  private pokemon$$: ReplaySubject<string | null> = new ReplaySubject(1);
  private pokemonRankByLeague$$: ReplaySubject<PokemonRankByLeague> =
    new ReplaySubject(1);
  readonly pokemonRankByLeague$: Observable<PokemonRankByLeague> =
    this.pokemonRankByLeague$$.asObservable();
  rankLoading$$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private subscriptions: Subscription[] = [];

  constructor(
    private pokemonListService: PokemonListService,
    private pokemonRankService: PokemonRankService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      combineLatest([this.stats$$, this.pokemon$$])
        .pipe(
          filter(([stats, pokemon]) =>
            Boolean(pokemon && stats && this.areStatsValid(stats))
          ),
          tap(() => this.rankLoading$$.next(true)),
          finalize(() => this.rankLoading$$.next(false))
        )
        .subscribe(([stats, pokemon]) => {
          stats = stats as PokemonStats;
          const rank = this.pokemonRankService.calculateRank(
            pokemon as string,
            stats.attack,
            stats.defense,
            stats.stamina
          );
          console.log(rank);
          this.pokemonRankByLeague$$.next(rank);
          this.rankLoading$$.next(false);
        })
    );
  }

  private areStatsValid(stats: PokemonStats): boolean {
    const attackValid: boolean = Boolean(stats.attack) || stats.attack === 0;
    const defenseValid: boolean = Boolean(stats.defense) || stats.defense === 0;
    const staminaValid: boolean = Boolean(stats.stamina) || stats.stamina === 0;
    return attackValid && defenseValid && staminaValid;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
