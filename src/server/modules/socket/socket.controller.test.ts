// import { Request } from '@/server/modules/utils/types';
// import { SocketController } from './socket.controller';
// import { SocketService } from './socket.service';
// import { ISocketRepository } from './socket.repository';
// import { HttpService } from '../http/http.service';

// jest.mock('./socket.service');

// describe('SocketController', () => {
//   let controller: SocketController;
//   let service: jest.Mocked<SocketService>;

//   beforeEach(() => {
//     service = new SocketService({} as ISocketRepository, {} as HttpService) as jest.Mocked<SocketService>;
//     controller = new SocketController(service);
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   describe('getRoutes', () => {
//     it('should return the predefined routes', () => {
//       const routes = controller.getRoutes;
//       expect(routes.length).toBe(3);
//     });
//   });

//   describe('connect', () => {
//     it('should call the connect method of the service', async () => {
//       const mockRequest: Request<unknown> = { socket: { value: jest.fn() } as any };

//       await controller['connect'](mockRequest);
//       expect(service.connect).toBeCalledWith(mockRequest.socket.value());
//     });
//   });

//   describe('disconnecting', () => {
//     it('should call the disconnecting method of the service', async () => {
//       const mockRequest: Request<unknown> = { socket: { value: jest.fn() } as any };

//       await controller['disconnecting'](mockRequest);
//       expect(service.disconnecting).toBeCalledWith(mockRequest.socket.value());
//     });
//   });

//   describe('disconnect', () => {
//     it('should call the disconnect method of the service', async () => {
//       const mockRequest: Request<unknown> = { socket: { value: jest.fn() } as any };

//       await controller['disconnect'](mockRequest);
//       expect(service.disconnect).toBeCalledWith(mockRequest.socket.value());
//     });
//   });
// });
