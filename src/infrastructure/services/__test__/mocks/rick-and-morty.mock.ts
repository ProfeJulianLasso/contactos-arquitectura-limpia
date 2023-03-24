import { Character } from '../../interfaces/rick-and-morty.interface';

export const characterMock: Character = {
  id: 19,
  name: 'Antenna Rick',
  status: 'unknown',
  species: 'Human',
  type: 'Human with antennae',
  gender: 'Male',
  origin: {
    name: 'unknown',
    url: '',
  },
  location: {
    name: 'unknown',
    url: '',
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/19.jpeg',
  episode: ['https://rickandmortyapi.com/api/episode/10'],
  url: 'https://rickandmortyapi.com/api/character/19',
  created: '2017-11-04T22:28:13.756Z',
};
