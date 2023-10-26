import { HttpService } from '../http.service';

export class HttpModule {
  private static instance?: HttpModule;
  private readonly serviceInstance: jest.Mocked<HttpService>;

  private constructor() {
    // Mock the service instance
    this.serviceInstance = {
      // List and mock methods/properties of HttpService here, e.g.:
      // someMethod: jest.fn(),
    } as jest.Mocked<HttpService>;
  }

  public static getInstance(): HttpModule {
    if (!this.instance) {
      this.instance = new HttpModule();
    }
    return this.instance;
  }

  public get service(): jest.Mocked<HttpService> {
    return this.serviceInstance;
  }
}
