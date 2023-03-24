import { Test, TestingModule } from '@nestjs/testing';
import { Observable } from 'rxjs';
import { UsuarioDTO } from 'src/infrastructure/dto/usuario.dto';
import * as UseCase from '../../../application/use-case';
import { UsuarioDomain } from '../../../domain/models/usuario.model';
import { Usuario } from '../../database/models/usuario.model';
import { UsuarioRepository } from '../../database/repositories/usuario.repository';
import { UsuarioAPI } from '../usuario.api';

jest.mock('../../../application/use-case/find.use-case');
jest.mock('../../../application/use-case/create.use-case');
jest.mock('../../../application/use-case/update.use-case');
jest.mock('../../../application/use-case/delete.use-case');

describe('UsuarioController', () => {
  let api: UsuarioAPI;
  let repository: UsuarioRepository;

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
    const expectedInstanceType = Array<Usuario>;
    const stubFind = jest.fn(
      () =>
        new Observable<UsuarioDomain[]>((subscriber) => {
          subscriber.next(mockData);
          subscriber.complete();
        }),
    );
    jest.spyOn(UseCase, 'FindUseCase').mockReturnValue({
      execute: stubFind,
    } as any);

    // Act
    const result = api.find();

    // Assert
    expect(UseCase.FindUseCase).toHaveBeenCalledWith(repository);
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
    const _id = '641c65deff0153dd0f36bf5';
    const body = { nombre: 'pedro' };
    const expectedData = { ...body, _id } as Usuario;
    const stubCreate = jest.fn(
      (data: UsuarioDTO) =>
        new Observable<UsuarioDomain>((subscriber) => {
          subscriber.next({ ...data, _id } as UsuarioDomain);
          subscriber.complete();
        }),
    );
    jest.spyOn(UseCase, 'CreateUseCase').mockReturnValue({
      execute: stubCreate,
    } as any);

    // Act
    const result = api.create(body);

    // Assert
    expect(UseCase.CreateUseCase).toHaveBeenCalledWith(repository);
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
    const _id = '641c65deff0153dd0f36bf5';
    const body = { nombre: 'pedro' };
    const expectedData = { ...body, _id } as Usuario;
    const stubUpdate = jest.fn(
      (_id: string, data: UsuarioDTO) =>
        new Observable<UsuarioDomain>((subscriber) => {
          subscriber.next({ ...data, _id } as UsuarioDomain);
          subscriber.complete();
        }),
    );
    jest.spyOn(UseCase, 'UpdateUseCase').mockReturnValue({
      execute: stubUpdate,
    } as any);

    // Act
    const result = api.update(_id, body);

    // Assert
    expect(UseCase.UpdateUseCase).toHaveBeenCalledWith(repository);
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
    const mockData = true;
    const expectedData = true;

    const stubDelete = jest.fn(
      () =>
        new Observable<boolean>((subscriber) => {
          subscriber.next(mockData);
          subscriber.complete();
        }),
    );
    jest.spyOn(UseCase, 'DeleteUseCase').mockReturnValue({
      execute: stubDelete,
    } as any);

    // Act
    const result = api.delete(_id);

    // Assert
    expect(UseCase.DeleteUseCase).toHaveBeenCalledWith(repository);
    expect(stubDelete).toHaveBeenCalledWith(_id);
    result.subscribe({
      next: (value) => {
        expect(value).toEqual(expectedData);
        done();
      },
    });
  });
});
