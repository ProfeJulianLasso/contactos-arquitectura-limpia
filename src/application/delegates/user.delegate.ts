import { IUserRepository } from '../../domain/repositories/usuario.repository';
import {
  CreateUseCase,
  DeleteUseCase,
  FindUseCase,
  UpdateUseCase,
} from '../use-case';
import { IUseCase } from '../use-case/interface/use-case.interface';

export class UserDelegate implements IUseCase {
  private delegate: IUseCase;

  constructor(private readonly userRepository: IUserRepository) {}

  execute<Response>(...args: any[]): Response {
    return this.delegate.execute(...args);
  }

  public toCreateUser(): void {
    this.delegate = new CreateUseCase(this.userRepository);
  }

  public toDeleteUser(): void {
    this.delegate = new DeleteUseCase(this.userRepository);
  }

  public toFindUsers(): void {
    this.delegate = new FindUseCase(this.userRepository);
  }

  public toUpdateUser(): void {
    this.delegate = new UpdateUseCase(this.userRepository);
  }
}
