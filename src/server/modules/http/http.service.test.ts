// import { NextFunction, Request, Response } from 'express';
import { HttpService } from './http.service';
import { Server } from 'http';

jest.mock('express');
jest.mock('http');

describe('HttpService', () => {
  let httpService: HttpService;
  let mockHttp: jest.Mocked<Server>;

  beforeEach(() => {
    httpService = new HttpService();
    mockHttp = httpService.getHttp() as jest.Mocked<Server>;
  });

  it('should instantiate HttpService', () => {
    expect(httpService).toBeInstanceOf(HttpService);
  });

  it('should start the server and log the address', () => {
    const logSpy = jest.spyOn(httpService, 'log');
    httpService.listen('localhost', 3000);
    expect(logSpy).toHaveBeenCalledWith('Server listening on localhost:3000');
    expect(mockHttp.listen).toHaveBeenCalled();
  });

  it('should close the server and log', () => {
    const logSpy = jest.spyOn(httpService, 'log');
    httpService.close();
    expect(logSpy).toHaveBeenCalledWith('Server closed');
    expect(mockHttp.close).toHaveBeenCalled();
  });
});
