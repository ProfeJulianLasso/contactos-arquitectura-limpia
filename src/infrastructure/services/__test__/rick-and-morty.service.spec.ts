import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { Character } from '../interfaces/rick-and-morty.interface';
import { RickAndMortyService } from '../rick-and-morty.service';
import { characterMock } from './mocks/rick-and-morty.mock';

describe('RickAndMortyService', () => {
  let service: RickAndMortyService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RickAndMortyService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RickAndMortyService>(RickAndMortyService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call httpService.get', (done) => {
    // Arrange
    const idCharacter = 19;
    const mock = { data: characterMock } as AxiosResponse<Character>;
    const expected = characterMock;
    jest.spyOn(httpService, 'get').mockImplementation(() => {
      return new Observable((observer) => {
        observer.next(mock);
        observer.complete();
      });
    });

    // Act
    const result = service.getCharacter(idCharacter);

    // Assert
    result.subscribe({
      next: (response) => {
        expect(response.data).toEqual(expected);
        expect(httpService.get).toHaveBeenCalledWith(
          `https://rickandmortyapi.com/api/character/${idCharacter}`,
        );
        done();
      },
    });
  });
});
