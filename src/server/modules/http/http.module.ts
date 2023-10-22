import { HttpService } from './http.service';

export class HttpModule {
  private static instance: HttpModule;
  private serviceInstance: HttpService;

  private constructor() {
    this.serviceInstance = new HttpService();
  }

  public static getInstance(): HttpModule {
    if (!HttpModule.instance) {
      HttpModule.instance = new HttpModule();
    }
    return HttpModule.instance;
  }

  get service(): HttpService {
    return this.serviceInstance;
  }
}
