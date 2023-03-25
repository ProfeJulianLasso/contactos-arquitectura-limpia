import { Observable } from 'rxjs';
import { UsuarioDomain } from '../../../domain/models/usuario.model';
import { IUserRepository } from '../../../domain/repositories/usuario.repository';
import { CreateUseCase } from '../create.use-case';

describe('CreateUseCase', () => {
  let useCase: CreateUseCase;
  let repository: IUserRepository;

  beforeEach(() => {
    repository = {
      create: jest.fn(),
    } as any as IUserRepository;
    useCase = new CreateUseCase(repository);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should call repository.create', (done) => {
    // Arrange
    const _id = '641c65deff0153dd0f36bf5';
    const payload = { nombre: 'pedro' };
    const mockData = { nombre: 'pedro' };
    const expectedData = { _id, nombre: 'pedro' };
    const expectedInstanceType = Observable<UsuarioDomain>;
    const stubCreate = jest.fn(
      () =>
        new Observable<UsuarioDomain>((subscriber) => {
          subscriber.next({ _id, ...mockData } as UsuarioDomain);
          subscriber.complete();
        }),
    );
    jest.spyOn(repository, 'create').mockReturnValue(stubCreate());

    // Act
    const result = useCase.execute(payload);

    // Assert
    expect(repository.create).toHaveBeenCalledWith(mockData);
    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (data) => {
        expect(data).toEqual(expectedData);
        done();
      },
    });
  });
});
