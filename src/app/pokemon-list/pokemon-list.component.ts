import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonApiService } from '../pokemon-api.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  randomPokemons: any[] = [];
  searchResultPokemons: any[] = [];
  searchTerm: string = '';

  constructor(
    private pokemonApiService: PokemonApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    // Numero de pokemons obtenidos
    for (let i = 0; i < 8; i++) {
      const randomPokemon = await this.pokemonApiService.getRandomPokemon();
      if (randomPokemon) {
        this.randomPokemons.push(randomPokemon);
      }
    }

    // busqueda url
    this.route.queryParams.subscribe((params) => {
      const searchTerm = params['search'];
      if (searchTerm) {
        this.searchTerm = searchTerm;
        this.searchPokemon();
      }
    });
  }

  async searchPokemon() {
    // busqueda nombre especifico
    if (this.searchTerm.trim() !== '') {
      try {
        const result = await this.pokemonApiService.searchPokemonByName(
          this.searchTerm
        );
        if (result) {
          this.searchResultPokemons = [result];
        } else {
          this.searchResultPokemons = [];
        }
      } catch (error) {
        console.error(error);
        this.searchResultPokemons = [];
      }
    } else {
      this.searchResultPokemons = [];
    }
  }

  goToPokemonDetail(name: string) {
    this.router.navigate(['/pokemon-detail', name]);
  }
}
