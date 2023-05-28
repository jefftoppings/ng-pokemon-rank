import { Injectable } from '@angular/core';
import { calculateRank, getByName } from 'pokemon-go-pvp-rank';

const GL_LIMIT = 1500;
const UL_LIMIT = 2500;
const ML_LIMIT = Number.POSITIVE_INFINITY;

@Injectable({
  providedIn: 'root',
})
export class PokemonRankService {
  constructor() {}

  calculateRank(
    name: string,
    attackStat: number,
    defenseStat: number,
    healthStat: number
  ): PokemonRankByLeague {
    const pokedexEntry = getByName({ name });
    const gl = calculateRank({
      pokedexEntry,
      refAttackStat: attackStat,
      refDefenseStat: defenseStat,
      refHealthStat: healthStat,
      maxCP: GL_LIMIT,
      maxLevel: 50,
      minimumStatValue: 0,
    });
    const ul = calculateRank({
      pokedexEntry,
      refAttackStat: attackStat,
      refDefenseStat: defenseStat,
      refHealthStat: healthStat,
      maxCP: UL_LIMIT,
      maxLevel: 50,
      minimumStatValue: 0,
    });
    const ml = calculateRank({
      pokedexEntry,
      refAttackStat: attackStat,
      refDefenseStat: defenseStat,
      refHealthStat: healthStat,
      maxCP: ML_LIMIT,
      maxLevel: 50,
      minimumStatValue: 0,
    });
    return {
      greatLeague: {
        attackStat: gl.occurence.attackStat,
        defenseStat: gl.occurence.defenseStat,
        healthStat: gl.occurence.healthStat,
        level: gl.occurence.level,
        cp: gl.occurence.cp,
        rank: gl.occurence.rank,
      },
      ultraLeague: {
        attackStat: ul.occurence.attackStat,
        defenseStat: ul.occurence.defenseStat,
        healthStat: ul.occurence.healthStat,
        level: ul.occurence.level,
        cp: ul.occurence.cp,
        rank: ul.occurence.rank,
      },
      masterLeague: {
        attackStat: ml.occurence.attackStat,
        defenseStat: ml.occurence.defenseStat,
        healthStat: ml.occurence.healthStat,
        level: ml.occurence.level,
        cp: ml.occurence.cp,
        rank: ml.occurence.rank,
      },
    };
  }
}

export interface PokemonRankInfo {
  attackStat: number;
  defenseStat: number;
  healthStat: number;
  level: number;
  cp: number;
  rank: number;
}

export interface PokemonRankByLeague {
  greatLeague: PokemonRankInfo;
  ultraLeague: PokemonRankInfo;
  masterLeague: PokemonRankInfo;
}

// Example occurrence:
// const example = {
//   attackStat: 0,
//   defenseStat: 15,
//   healthStat: 15,
//   level: 25,
//   attackProduct: 112.88084608449999,
//   defenseProduct: 136.9264701025,
//   healthProduct: 128,
//   product: 1978416.1019563766,
//   cp: 1495,
//   rank: 1,
// };

// const pokedexEntry = getByName({ name });
// const { rank, occurence } = calculateRank({
//   pokedexEntry,
//   // refs from pokémon being compared (1-15)
//   refAttackStat: 0,
//   refDefenseStat: 15,
//   refHealthStat: 15,
//   // max league CP
//   maxCP: 1500,
//   // max desired level (1-55)
//   maxLevel: 50,
//   // minimum stat:
//   //  0 - wild
//   //  1 - good friend trade
//   //  2 - great friend trade
//   //  3 - ultra friend trade
//   //  4 - weather boost
//   //  5 - best friend trade
//   // 10 - raid/egg/mission
//   // 12 - lucky
//   minimumStatValue: 0,
// });
