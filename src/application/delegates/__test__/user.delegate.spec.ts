import { Observable } from 'rxjs';
import { UsuarioDomain } from 'src/domain/models/usuario.model';
import { IUserRepository } from '../../../domain/repositories/usuario.repository';
import * as UseCase from '../../use-case';
import { UserDelegate } from '../user.delegate';

jest.mock('../../use-case/find.use-case');
jest.mock('../../use-case/create.use-case');
jest.mock('../../use-case/update.use-case');
jest.mock('../../use-case/delete.use-case');

describe('UserDelegate', () => {
  let delegator: UserDelegate;
  let repository: IUserRepository;

  beforeEach(() => {
    // Arrange
    repository = {
      create: jest.fn(),
      delete: jest.fn(),
      find: jest.fn(),
      update: jest.fn(),
    } as IUserRepository;

    // Act
    delegator = new UserDelegate(repository);
  });

  it('should be defined', () => {
    // Assert
    expect(delegator).toBeDefined();
  });

  it('should call repository.find', (done) => {
    // Arrange
    const mockData = [
      {
        _id: '641c65deff0153dd0f36bf5',
        nombre: 'pedro',
      } as UsuarioDomain,
      {
        _id: '724c28deff5015dd0f47ac9',
        nombre: 'juan',
      } as UsuarioDomain,
    ];
    const expectedData = [
      {
        _id: '641c65deff0153dd0f36bf5',
        nombre: 'pedro',
      } as UsuarioDomain,
      {
        _id: '724c28deff5015dd0f47ac9',
        nombre: 'juan',
      } as UsuarioDomain,
    ];
    const expectedInstanceType = Observable<UsuarioDomain[]>;
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
    const delegator = new UserDelegate(repository);
    const result = delegator.findUsers();

    // Assert
    expect(stubFind).toHaveBeenCalled();
    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (value) => {
        expect(value).toEqual(expectedData);
        done();
      },
    });
  });

  it('should call repository.create', (done) => {
    // Arrange
    const _id = '641c65deff0153dd0f36bf5';
    const payload = { nombre: 'pedro' };
    const expectedData = { _id, nombre: 'pedro' };
    const expectedInstanceType = Observable<UsuarioDomain>;
    const stubCreate = jest.fn(
      (usuario) =>
        new Observable<UsuarioDomain>((subscriber) => {
          subscriber.next({ _id, ...usuario } as UsuarioDomain);
          subscriber.complete();
        }),
    );
    jest.spyOn(UseCase, 'CreateUseCase').mockReturnValue({
      execute: stubCreate,
    } as any);

    // Act
    const delegator = new UserDelegate(repository);
    const result = delegator.createUser(payload);

    // Assert
    expect(stubCreate).toHaveBeenCalledWith(payload);
    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (data) => {
        expect(data).toEqual(expectedData);
        done();
      },
    });
  });

  it('should call repository.update', (done) => {
    // Arrange
    const _id = '641c65deff0153dd0f36bf5';
    const payload = { nombre: 'pedro' };
    const expectedData = { _id, nombre: 'pedro' };
    const expectedInstanceType = Observable<UsuarioDomain>;
    const stubUpdate = jest.fn(
      (id, data) =>
        new Observable<UsuarioDomain>((subscriber) => {
          subscriber.next({ _id: id, ...data } as UsuarioDomain);
          subscriber.complete();
        }),
    );
    jest.spyOn(UseCase, 'UpdateUseCase').mockReturnValue({
      execute: stubUpdate,
    } as any);

    // Act
    const delegator = new UserDelegate(repository);
    const result = delegator.updateUser(_id, payload);

    // Assert
    expect(stubUpdate).toHaveBeenCalledWith(_id, payload);
    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (data) => {
        expect(data).toEqual(expectedData);
        done();
      },
    });
  });

  it('should call repository.delete', (done) => {
    // Arrange
    const payload = '641c65deff0153dd0f36bf5';
    const mockData = true;
    const expectedData = true;
    const expectedInstanceType = Observable<boolean>;
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
    const delegator = new UserDelegate(repository);
    const result = delegator.deleteUser(payload);

    // Assert
    expect(stubDelete).toHaveBeenCalledWith(payload);
    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (data) => {
        expect(data).toEqual(expectedData);
        done();
      },
    });
  });
});
