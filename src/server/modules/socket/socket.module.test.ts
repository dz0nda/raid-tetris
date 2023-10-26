// import { HttpModule } from '@/modules/http/http.module';
// import { DatabaseModule } from '@/modules/database/database.module';

// import { SocketModule } from './socket.module';

// jest.mock('@/modules/database/database.module'); // Explicitly use the mock

// describe('SocketModule', () => {
//   let socketModule: SocketModule;
//   let mockDatabaseModule: DatabaseModule;
//   let mockHttpModule: Partial<HttpModule>;
//   const mockRedisInstance = {};

//   beforeEach(() => {
//     mockDatabaseModule = DatabaseModule.getInstance(mockRedisInstance as any);

//     mockHttpModule = {
//       service: jest.fn(),
//     };

//     socketModule = SocketModule.getInstance(mockDatabaseModule as DatabaseModule, mockHttpModule as HttpModule);
//   });

//   it('should create an instance', () => {
//     expect(socketModule).toBeInstanceOf(SocketModule);
//   });

//   // More tests can be added as needed...
// });
