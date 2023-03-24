import { Observable } from 'rxjs';
import { UsuarioDomain } from '../../domain/models/usuario.model';
import { IUserRepository } from '../../domain/repositories/usuario.repository';
import {
  CreateUseCase,
  DeleteUseCase,
  FindUseCase,
  UpdateUseCase,
} from '../use-case';

export class UserDelegate {
  private createUseCase: CreateUseCase;
  private deleteUseCase: DeleteUseCase;
  private findUseCase: FindUseCase;
  private updateUseCase: UpdateUseCase;

  constructor(private readonly userRepository: IUserRepository) {
    this.createUseCase = new CreateUseCase(userRepository);
    this.deleteUseCase = new DeleteUseCase(userRepository);
    this.findUseCase = new FindUseCase(userRepository);
    this.updateUseCase = new UpdateUseCase(userRepository);
  }

  public createUser(user: UsuarioDomain): Observable<UsuarioDomain> {
    return this.createUseCase.execute(user);
  }

  public deleteUser(id: string): Observable<boolean> {
    return this.deleteUseCase.execute(id);
  }

  public findUsers(): Observable<UsuarioDomain[]> {
    return this.findUseCase.execute();
  }

  public updateUser(
    id: string,
    user: UsuarioDomain,
  ): Observable<UsuarioDomain> {
    return this.updateUseCase.execute(id, user);
  }
}
