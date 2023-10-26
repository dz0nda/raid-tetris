import { HttpService } from './http.service';

/**
 * HttpModule is a singleton module that centralizes access to the HttpService.
 * This ensures that only a single instance of HttpService is initialized and used throughout the application.
 */
export class HttpModule {
  private static instance?: HttpModule;
  private readonly serviceInstance: HttpService;

  /**
   * Private constructor initializes the HttpService.
   * Direct instantiation is restricted, and instances must be accessed via the `getInstance` method.
   */
  private constructor() {
    this.serviceInstance = new HttpService();
  }

  /**
   * Fetches the singleton instance of HttpModule.
   * If an instance doesn't already exist, it's created. Otherwise, the existing instance is returned.
   *
   * @returns The singleton instance of HttpModule.
   */
  public static getInstance(): HttpModule {
    if (!this.instance) {
      this.instance = new HttpModule();
    }
    return this.instance;
  }

  /**
   * Accessor to retrieve the HttpService instance managed by the module.
   *
   * @returns The initialized HttpService instance.
   */
  public get service(): HttpService {
    return this.serviceInstance;
  }
}
