import { Component } from '@angular/core';
import { calculateRank, getByName } from 'pokemon-go-pvp-rank';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ng-pokemon-rank';

  constructor() {
    const pokedexEntry = getByName({ name: 'Ninetales' });
    const { rank, occurence } = calculateRank({
      pokedexEntry,
      // refs from pokémon being compared (1-15)
      refAttackStat: 0,
      refDefenseStat: 15,
      refHealthStat: 15,
      // max league CP
      maxCP: 1500,
      // max desired level (1-55)
      maxLevel: 40,
      // minimum stat:
      //  0 - wild
      //  1 - good friend trade
      //  2 - great friend trade
      //  3 - ultra friend trade
      //  4 - weather boost
      //  5 - best friend trade
      // 10 - raid/egg/mission
      // 12 - lucky
      minimumStatValue: 0,
    });
    console.log({ rank, occurence });
  }
}
