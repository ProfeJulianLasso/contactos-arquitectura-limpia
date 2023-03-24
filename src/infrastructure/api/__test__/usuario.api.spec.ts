import { Test, TestingModule } from '@nestjs/testing';
import { Observable } from 'rxjs';
import { UsuarioDTO } from 'src/infrastructure/dto/usuario.dto';
import * as delegate from '../../../application/delegates/user.delegate';
import { UsuarioDomain } from '../../../domain/models/usuario.model';
import { Usuario } from '../../database/models/usuario.model';
import { UsuarioRepository } from '../../database/repositories/usuario.repository';
import { UsuarioAPI } from '../usuario.api';

jest.mock('../../../application/delegates/user.delegate');

describe('UsuarioController', () => {
  let api: UsuarioAPI;
  let repository: UsuarioRepository;

  const _id = '641c65deff0153dd0f36bf5';
  const mockData = new Array<UsuarioDomain>(
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
  const stubCreate = jest.fn(
    (data: UsuarioDTO) =>
      new Observable<UsuarioDomain>((subscriber) => {
        subscriber.next({ ...data, _id } as UsuarioDomain);
        subscriber.complete();
      }),
  );
  const stubUpdate = jest.fn(
    (_id: string, data: UsuarioDTO) =>
      new Observable<UsuarioDomain>((subscriber) => {
        subscriber.next({ ...data, _id } as UsuarioDomain);
        subscriber.complete();
      }),
  );
  const stubDelete = jest.fn(
    () =>
      new Observable<boolean>((subscriber) => {
        subscriber.next(true);
        subscriber.complete();
      }),
  );

  jest.spyOn(delegate, 'UserDelegate').mockReturnValue({
    findUsers: stubFind,
    createUser: stubCreate,
    updateUser: stubUpdate,
    deleteUser: stubDelete,
  } as any);

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
    const expectedData = new Array<Usuario>(
      { nombre: 'pedro' },
      { nombre: 'juan' },
    );
    const expectedInstanceType = Array<Usuario>;

    // Act
    const result = api.find();

    // Assert
    expect(delegate.UserDelegate).toHaveBeenCalledWith(repository);
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
    const expectedData = { ...body, _id } as Usuario;

    // Act
    const result = api.create(body);

    // Assert
    expect(delegate.UserDelegate).toHaveBeenCalledWith(repository);
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
    const expectedData = { ...body, _id } as Usuario;

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
    const expectedData = true;

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
