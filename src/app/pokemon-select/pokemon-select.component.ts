import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { PokemonInfo, PokemonListService } from './pokemon-list.service';
import { debounceTime, filter, map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-pokemon-select',
  templateUrl: './pokemon-select.component.html',
  styleUrls: ['./pokemon-select.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
})
export class PokemonSelectComponent implements OnInit {
  formControl: FormControl = new FormControl();
  filteredOptions$!: Observable<PokemonInfo[]>;
  @Output() pokemonSelected: EventEmitter<string> = new EventEmitter();

  constructor(private pokemonListService: PokemonListService) {}

  ngOnInit(): void {
    this.filteredOptions$ = this.formControl.valueChanges.pipe(
      startWith(''),
      filter(Boolean),
      debounceTime(500),
      map((searchTerm) => {
        return this.pokemonListService.searchPokemonList(searchTerm);
      })
    );
  }

  handleOptionSelected(option: string): void {
    this.pokemonSelected.emit(option);
  }
}
