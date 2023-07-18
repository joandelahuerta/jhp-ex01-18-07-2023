import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonApiService } from './pokemon-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  searchTerm: string = '';

  constructor(
    private pokemonApiService: PokemonApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    // Obtener el término de búsqueda desde el parámetro de la URL
    this.route.queryParams.subscribe((params) => {
      const searchTerm = params['search'];
      if (searchTerm) {
        this.searchTerm = searchTerm;
        this.searchPokemon();
      }
    });
  }

  async searchPokemon() {
    // Realizar la búsqueda de Pokemons por el nombre especificado
    if (this.searchTerm.trim() !== '') {
      try {
        const result = await this.pokemonApiService.searchPokemonByName(
          this.searchTerm
        );
        if (result) {
          this.router.navigate(['/pokemon-list'], {
            queryParams: { search: this.searchTerm },
          });
        } else {
          this.router.navigate(['/pokemon-list'], {
            queryParams: { search: '' },
          });
        }
      } catch (error) {
        console.error(error);
        this.router.navigate(['/pokemon-list'], {
          queryParams: { search: '' },
        });
      }
    } else {
      this.router.navigate(['/pokemon-list'], { queryParams: { search: '' } });
    }
  }

  onSubmit() {
    this.searchPokemon();
  }
}
