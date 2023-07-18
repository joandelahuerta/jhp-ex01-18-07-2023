import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonApiService } from '../pokemon-api.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css'],
})
export class PokemonDetailComponent implements OnInit {
  pokemon: any;

  constructor(
    private route: ActivatedRoute,
    private pokemonApiService: PokemonApiService
  ) {}

  async ngOnInit() {
    this.route.params.subscribe(async (params) => {
      const pokemonId = +params['id'];
      this.pokemon = await this.pokemonApiService.getPokemonById(pokemonId);
    });
  }
}
