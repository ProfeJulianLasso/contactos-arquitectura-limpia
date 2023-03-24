import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { Character } from './interfaces/rick-and-morty.interface';

@Injectable()
export class RickAndMortyService {
  constructor(private readonly httpService: HttpService) {}

  getCharacter(id: number): Observable<AxiosResponse<Character>> {
    return this.httpService.get(
      `https://rickandmortyapi.com/api/character/${id}`,
    );
  }
}
