import { Test, TestingModule } from '@nestjs/testing';
import { Observable } from 'rxjs';
import * as delegate from '../../../application/delegates/user.delegate';
import { UsuarioDomain } from '../../../domain/models/usuario.model';
import { Usuario } from '../../database/models/usuario.model';
import { UsuarioRepository } from '../../database/repositories/usuario.repository';
import { UsuarioDTO } from '../../dto/usuario.dto';
import { UsuarioAPI } from '../usuario.api';

jest.mock('../../../application/delegates/user.delegate');

describe('UsuarioController', () => {
  let api: UsuarioAPI;
  let repository: UsuarioRepository;

  const _id = '641c65deff0153dd0f36bf5';

  jest
    .spyOn(delegate, 'UserDelegate')
    .mockReturnValue({} as any as delegate.UserDelegate);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UsuarioRepository,
          useValue: {},
        },
      ],
      controllers: [UsuarioAPI],
    }).compile();
    api = module.get<UsuarioAPI>(UsuarioAPI);
    repository = module.get<UsuarioRepository>(UsuarioRepository);
  });

  it('should be defined', () => {
    expect(api).toBeDefined();
    expect(delegate.UserDelegate).toHaveBeenCalledWith(repository);
  });

  it('should call repository.find', (done) => {
    // Arrange
    const mockData = new Array<UsuarioDomain>(
      { nombre: 'pedro' },
      { nombre: 'juan' },
    );
    const expectedData = new Array<Usuario>(
      { nombre: 'pedro' },
      { nombre: 'juan' },
    );
    const stubFind = jest.fn(
      () =>
        new Observable<UsuarioDomain[]>((subscriber) => {
          subscriber.next(mockData);
          subscriber.complete();
        }),
    );
    const expectedInstanceType = Array<Usuario>;
    (api as any).useCase = {
      toFindUsers: jest.fn(),
      execute: stubFind,
    };

    // Act
    const result = api.find();

    // Assert
    expect(stubFind).toHaveBeenCalled();
    result.subscribe({
      next: (value) => {
        expect(value).toEqual(expectedData);
        expect(value).toBeInstanceOf(expectedInstanceType);
        done();
      },
    });
  });

  it('should call repository.create', (done) => {
    // Arrange
    const body = { nombre: 'pedro' };
    const stubCreate = jest.fn(
      (data: UsuarioDTO) =>
        new Observable<UsuarioDomain>((subscriber) => {
          subscriber.next({ ...data, _id } as UsuarioDomain);
          subscriber.complete();
        }),
    );
    const expectedData = { _id, nombre: 'pedro' } as Usuario;
    (api as any).useCase = {
      toCreateUser: jest.fn(),
      execute: stubCreate,
    };

    // Act
    const result = api.create(body);

    // Assert
    expect(stubCreate).toHaveBeenCalledWith(body);
    result.subscribe({
      next: (value) => {
        expect(value).toEqual(expectedData);
        done();
      },
    });
  });

  it('should call repository.update', (done) => {
    // Arrange
    const body = { nombre: 'pedro' };
    const stubUpdate = jest.fn(
      (_id: string, data: UsuarioDTO) =>
        new Observable<UsuarioDomain>((subscriber) => {
          subscriber.next({ ...data, _id } as UsuarioDomain);
          subscriber.complete();
        }),
    );
    const expectedData = { _id, nombre: 'pedro' } as Usuario;
    (api as any).useCase = {
      toUpdateUser: jest.fn(),
      execute: stubUpdate,
    };

    // Act
    const result = api.update(_id, body);

    // Assert
    expect(delegate.UserDelegate).toHaveBeenCalledWith(repository);
    expect(stubUpdate).toHaveBeenCalledWith(_id, body);
    result.subscribe({
      next: (value) => {
        expect(value).toEqual(expectedData);
        done();
      },
    });
  });

  it('should call repository.delete', (done) => {
    // Arrange
    const _id = '641c65deff0153dd0f36bf5';
    const stubDelete = jest.fn(
      () =>
        new Observable<boolean>((subscriber) => {
          subscriber.next(true);
          subscriber.complete();
        }),
    );
    const expectedData = true;
    (api as any).useCase = {
      toDeleteUser: jest.fn(),
      execute: stubDelete,
    };

    // Act
    const result = api.delete(_id);

    // Assert
    expect(delegate.UserDelegate).toHaveBeenCalledWith(repository);
    expect(stubDelete).toHaveBeenCalledWith(_id);
    result.subscribe({
      next: (value) => {
        expect(value).toEqual(expectedData);
        done();
      },
    });
  });
});
