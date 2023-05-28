import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  ReactiveFormsModule,
  UntypedFormGroup,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { startWith, Subscription } from 'rxjs';

export interface PokemonStats {
  attack: number;
  defense: number;
  stamina: number;
}

@Component({
  selector: 'app-pokemon-stats',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './pokemon-stats.component.html',
  styleUrls: ['./pokemon-stats.component.scss'],
})
export class PokemonStatsComponent implements OnInit, OnDestroy {
  options: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  attackControl: FormControl = new FormControl();
  defenseControl: FormControl = new FormControl();
  staminaControl: FormControl = new FormControl();
  formGroup: UntypedFormGroup = new UntypedFormGroup({
    attack: this.attackControl,
    defense: this.defenseControl,
    stamina: this.staminaControl,
  });
  private subscriptions: Subscription[] = [];

  @Output() statsChanged: EventEmitter<PokemonStats> = new EventEmitter();

  ngOnInit(): void {
    this.subscriptions.push(
      this.formGroup.valueChanges
        .pipe(startWith(null))
        .subscribe((value) => {
          this.statsChanged.emit(value);
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
