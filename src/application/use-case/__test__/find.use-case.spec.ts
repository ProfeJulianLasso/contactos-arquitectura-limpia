import { Observable } from 'rxjs';
import { UsuarioDomain } from 'src/domain/models/usuario.model';
import { IUserRepository } from 'src/domain/repositories/usuario.repository';
import { FindUseCase } from '../find.use-case';

describe('FindUseCase', () => {
  let useCase: FindUseCase;
  let repository: IUserRepository;

  beforeEach(() => {
    repository = {
      find: jest.fn(),
    } as any as IUserRepository;
    useCase = new FindUseCase(repository);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
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
    jest.spyOn(repository, 'find').mockReturnValue(stubFind());

    // Act
    const result = useCase.execute();

    // Assert
    expect(repository.find).toHaveBeenCalled();
    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (data) => {
        expect(data).toEqual(expectedData);
        done();
      },
    });
  });
});
