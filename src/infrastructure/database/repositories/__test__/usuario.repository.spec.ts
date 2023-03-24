import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoServerError } from 'mongodb';
import { Model } from 'mongoose';
import { lastValueFrom } from 'rxjs';
import { Usuario } from '../../models/usuario.model';
import { UsuarioRepository } from '../usuario.repository';

describe('UsuarioRepository', () => {
  let usuarioRepository: UsuarioRepository;
  let usuarioModel: Model<Usuario>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuarioRepository,
        {
          provide: getModelToken(Usuario.name),
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
          },
        },
      ],
    }).compile();
    usuarioRepository = module.get<UsuarioRepository>(UsuarioRepository);
    usuarioModel = module.get<Model<Usuario>>(getModelToken(Usuario.name));
  });

  it('should be defined', () => {
    expect(usuarioRepository).toBeDefined();
  });

  describe('find', () => {
    it('should return an array of Usuarios', (done) => {
      // Arrange
      const mockUsuarios = new Array<Usuario>(
        { nombre: 'Juan' },
        { nombre: 'Pedro' },
      );
      const expectedUsuarios = new Array<Usuario>(
        { nombre: 'Juan' },
        { nombre: 'Pedro' },
      );
      jest.spyOn(usuarioModel, 'find').mockReturnValue(mockUsuarios as any);

      // Act
      const result = usuarioRepository.find();

      // Assert
      const resultStream = new Array<Usuario>();
      result.subscribe({
        next: (usuario) => resultStream.push(usuario as any as Usuario),
        complete: () => {
          expect(resultStream).toEqual(expectedUsuarios);
          done();
        },
      });
    });
  });

  describe('create', () => {
    it('should return a new Usuario', async () => {
      // Arrange
      const usuario = { nombre: 'Juan' };
      const mockUsuario = { _id: '641c70d41964e9445f593bcc', nombre: 'Juan' };
      const expectedUsuario = {
        _id: '641c70d41964e9445f593bcc',
        nombre: 'Juan',
      };
      jest.spyOn(usuarioModel, 'create').mockResolvedValue(mockUsuario as any);

      // Act
      const result = usuarioRepository.create(usuario);

      // Assert
      expect(await lastValueFrom(result)).toEqual(expectedUsuario);
    });
  });

  describe('update', () => {
    it('should return an updated Usuario', async () => {
      // Arrange
      const id = '641c70d41964e9445f593bcc';
      const usuario = { nombre: 'Andres' };
      const mockUsuario = { _id: '641c70d41964e9445f593bcc', nombre: 'Andres' };
      const expectedUsuario = {
        _id: id,
        nombre: 'Andres',
      };
      jest
        .spyOn(usuarioModel, 'findByIdAndUpdate')
        .mockResolvedValue(mockUsuario as any);

      // Act
      const result = usuarioRepository.update(id, usuario);

      // Assert
      expect(await lastValueFrom(result)).toEqual(expectedUsuario);
    });

    it('should throw a MongoServerError', (done) => {
      // Arrange
      const id = '641c70d41964e9445f593bcc';
      const usuario = { nombre: 'Andres' };
      const message = 'Error';
      const expectedMessageError = 'Error';
      const expectedErrorType = MongoServerError;
      jest
        .spyOn(usuarioModel, 'findByIdAndUpdate')
        .mockRejectedValue(new MongoServerError({ message }) as any);

      // Act
      const result = usuarioRepository.update(id, usuario);

      // Assert
      result.subscribe({
        error: (error) => {
          expect(error).toBeInstanceOf(expectedErrorType);
          expect(error.message).toEqual(expectedMessageError);
          done();
        },
      });
    });

    it('should throw a NotFoundException', (done) => {
      // Arrange
      const id = '641c70d41964e9445f593bcc';
      const usuario = { nombre: 'Julian' };
      const expectedMessageError = 'Usuario no encontrado';
      const expectedErrorType = NotFoundException;
      jest
        .spyOn(usuarioModel, 'findByIdAndUpdate')
        .mockResolvedValue(null as any);

      // Act
      const result = usuarioRepository.update(id, usuario);

      // Assert
      result.subscribe({
        error: (error) => {
          expect(error).toBeInstanceOf(expectedErrorType);
          expect(error.message).toEqual(expectedMessageError);
          done();
        },
      });
    });
  });

  describe('delete', () => {
    it('should return true', async () => {
      // Arrange
      const id = '641c70d41964e9445f593bcc';
      const expectedResponse = true;
      jest
        .spyOn(usuarioModel, 'findByIdAndDelete')
        .mockResolvedValue({} as any);

      // Act
      const result = usuarioRepository.delete(id);

      // Assert
      expect(await lastValueFrom(result)).toEqual(expectedResponse);
    });

    it('should throw a MongoServerError', (done) => {
      // Arrange
      const id = '641c70d41964e9445f593bcc';
      const message = 'Error';
      const expectedMessageError = 'Error';
      const expectedErrorType = MongoServerError;
      jest
        .spyOn(usuarioModel, 'findByIdAndDelete')
        .mockRejectedValue(new MongoServerError({ message }) as any);

      // Act
      const result = usuarioRepository.delete(id);

      // Assert
      result.subscribe({
        error: (error) => {
          expect(error).toBeInstanceOf(expectedErrorType);
          expect(error.message).toEqual(expectedMessageError);
          done();
        },
      });
    });

    it('should throw a NotFoundException', (done) => {
      // Arrange
      const id = '641c70d41964e9445f593bcc';
      const expectedMessageError = 'Usuario no encontrado';
      const expectedErrorType = NotFoundException;
      jest
        .spyOn(usuarioModel, 'findByIdAndDelete')
        .mockResolvedValue(null as any);

      // Act
      const result = usuarioRepository.delete(id);

      // Assert
      result.subscribe({
        error: (error) => {
          expect(error).toBeInstanceOf(expectedErrorType);
          expect(error.message).toEqual(expectedMessageError);
          done();
        },
      });
    });
  });
});

// Juan y con Mary
// plan de entrega
// lunes 3 de mayo
