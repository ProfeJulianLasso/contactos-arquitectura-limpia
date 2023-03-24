import { Observable } from 'rxjs';
import { IUserRepository } from '../../../domain/repositories/usuario.repository';
import { DeleteUseCase } from '../delete.use-case';

describe('DeleteUseCase', () => {
  let useCase: DeleteUseCase;
  let repository: IUserRepository;

  beforeEach(() => {
    repository = {
      delete: jest.fn(),
    } as any as IUserRepository;
    useCase = new DeleteUseCase(repository);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should call repository.delete', (done) => {
    // Arrange
    const _id = '641c65deff0153dd0f36bf5';
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
    jest.spyOn(repository, 'delete').mockReturnValue(stubDelete());

    // Act
    const result = useCase.execute(_id);

    // Assert
    expect(repository.delete).toHaveBeenCalledWith(_id);
    expect(result).toBeInstanceOf(expectedInstanceType);
    result.subscribe({
      next: (data) => {
        expect(data).toEqual(expectedData);
        done();
      },
    });
  });
});
