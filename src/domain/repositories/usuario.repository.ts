import { Observable } from 'rxjs';
import { UsuarioDomain } from '../models/usuario.model';

export interface IUserRepository<Model extends UsuarioDomain = UsuarioDomain> {
  find(): Observable<Model[]>;
  create(model: Model): Observable<Model>;
  update(id: string, model: Model): Observable<Model>;
  delete(id: string): Observable<boolean>;
}
