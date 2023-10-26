import { HttpModule } from './http.module';
import { HttpService } from './http.service';

// Mock the HttpService
jest.mock('./http.service');

describe('HttpModule', () => {
  afterEach(() => {
    // Resetting the module's instance after each test ensures that each test gets a fresh start.
    (HttpModule as any).instance = undefined;
  });

  it('should create an instance of HttpModule', () => {
    const module = HttpModule.getInstance();
    expect(module).toBeInstanceOf(HttpModule);
  });

  it('should always return the same instance of HttpModule (singleton behavior)', () => {
    const firstInstance = HttpModule.getInstance();
    const secondInstance = HttpModule.getInstance();
    expect(firstInstance).toBe(secondInstance);
  });

  it('should provide access to the mocked HttpService', () => {
    const module = HttpModule.getInstance();
    const service = module.service;
    expect(service).toBeInstanceOf(HttpService);
    // You can also test if the mocked methods/properties exist
    // expect(service.someMockedMethod).toBeDefined();
  });
});
