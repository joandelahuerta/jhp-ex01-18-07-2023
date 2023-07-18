import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PokemonApiService {
  private readonly API_URL = 'https://pokeapi.co/api/v2/pokemon';

  constructor() {}

  // Obtener un Pokemon aleatorio
  async getRandomPokemon(): Promise<any> {
    const randomId = Math.floor(Math.random() * 898) + 1; // La API tiene hasta el Pokemon #898
    const url = `${this.API_URL}/${randomId}/`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('No se pudo obtener el Pokemon.');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener el Pokemon aleatorio:', error);
      return null;
    }
  }

  // Obtener un Pokemon por su ID
  async getPokemonById(id: number): Promise<any> {
    const url = `${this.API_URL}/${id}/`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('No se pudo obtener el Pokemon.');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener el Pokemon:', error);
      return null;
    }
  }

  // Buscar Pokemons por nombre
  async searchPokemonByName(name: string): Promise<any> {
    const url = `${this.API_URL}/${name.toLowerCase()}/`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          'No se pudo encontrar el Pokemon con el nombre especificado.'
        );
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al buscar el Pokemon por nombre:', error);
      return null;
    }
  }
}
