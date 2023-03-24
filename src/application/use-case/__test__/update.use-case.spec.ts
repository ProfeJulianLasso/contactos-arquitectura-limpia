import { Observable } from 'rxjs';
import { UsuarioDomain } from 'src/domain/models/usuario.model';
import { IUserRepository } from '../../../domain/repositories/usuario.repository';
import { UpdateUseCase } from '../update.use-case';

describe('UpdateUseCase', () => {
  let useCase: UpdateUseCase;
  let repository: IUserRepository;

  beforeEach(() => {
    repository = {
      update: jest.fn(),
    } as any as IUserRepository;
    useCase = new UpdateUseCase(repository);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should call repository.update', (done) => {
    // Arrange
    const _id = '641c65deff0153dd0f36bf5';
    const mockData = { nombre: 'pedro' };
    const expectedData = { _id, nombre: 'pedro' };
    const expectedInstanceType = Observable<UsuarioDomain>;
    const stubUpdate = jest.fn(
      () =>
        new Observable<UsuarioDomain>((subscriber) => {
          subscriber.next({ _id, ...mockData } as UsuarioDomain);
          subscriber.complete();
        }),
    );
    jest.spyOn(repository, 'update').mockReturnValue(stubUpdate());

    // Act
    const result = useCase.execute(_id, mockData);

    // Assert
    expect(repository.update).toHaveBeenCalledWith(_id, mockData);
    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (data) => {
        expect(data).toEqual(expectedData);
        done();
      },
    });
  });
});
