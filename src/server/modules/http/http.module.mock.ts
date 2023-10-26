import { HttpModule } from './http.module';

export function createMockedHttpModule(): jest.Mocked<HttpModule> {
  const mock = HttpModule.getInstance() as jest.Mocked<HttpModule>;
  return mock;
}
