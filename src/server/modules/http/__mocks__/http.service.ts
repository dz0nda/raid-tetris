import { HttpService } from '../http.service';

export class MockHttpService {
  getHttp() {
    return {
      listen: jest.fn(),
      close: jest.fn(),
    };
  }

  listen(host: string, port: number) {
    // Mocked behavior for starting the server
  }

  close() {
    // Mocked behavior for closing the server
  }
}

export function createMockedHttpService(): jest.Mocked<HttpService> {
  return new HttpService() as jest.Mocked<HttpService>;
}
