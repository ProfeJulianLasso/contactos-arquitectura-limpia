import { ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { MongoServerError } from 'mongodb';
import { MongoServerErrorExceptionFilter } from '../mongo-server-error.exception-filter';

describe('MongoServerErrorExceptionFilter', () => {
  let filter: MongoServerErrorExceptionFilter;
  let host: ArgumentsHost;

  beforeEach(() => {
    filter = new MongoServerErrorExceptionFilter();
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    host = {
      switchToHttp: jest.fn().mockReturnThis(),
      getResponse: jest.fn().mockReturnValue(mockResponse),
    } as any as ArgumentsHost;
  });

  it('should catch MongoServerError and return response with conflict status', () => {
    // Arrange
    const exception = new MongoServerError({ message: 'Duplicate key error' });
    const expectedResponse = {
      statusCode: HttpStatus.CONFLICT,
      message: 'Duplicate key error',
      details: exception,
    };

    // Act
    filter.catch(exception, host);
    const response = host.switchToHttp().getResponse<Response>();

    // Assert
    expect(response.status).toHaveBeenCalledWith(HttpStatus.CONFLICT);
    expect(response.json).toHaveBeenCalledWith(expectedResponse);
  });
});
