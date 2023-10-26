import { RouterModule } from './router.module';
import { SocketModule } from '@/modules/socket/socket.module';
import { RouterService } from './router.service';

jest.mock('./router.service', () => {
  return jest.fn();
});

describe('RouterModule', () => {
  let socketModule: SocketModule;

  beforeEach(() => {
    // Mock the SocketModule service property
    socketModule = {
      service: {} as any,
    } as SocketModule;
  });

  it('should create an instance of RouterModule', () => {
    const routerModule = new RouterModule(socketModule);
    expect(routerModule).toBeInstanceOf(RouterModule);
  });

  it('should initialize RouterService with the service from SocketModule', () => {
    const routerModule = new RouterModule(socketModule);
    expect(RouterService).toHaveBeenCalledWith(socketModule.service);
  });

  it('should provide an instance of RouterService', () => {
    const routerModule = new RouterModule(socketModule);
    expect(routerModule.service).toBeInstanceOf(RouterService);
  });
});
