import { Base } from '../utils/service';
import { Route } from '../utils/types';

/**
 * Represents the base class for all controllers.
 * Provides shared functionalities and properties for controller classes.
 */
export abstract class Controller extends Base {
  protected _routes: Route[] = []; // Initialize as an empty array

  /**
   * Constructs an instance of the Controller.
   *
   * @param name - The name identifier for the Controller, used by the Base class.
   */
  constructor(name: string) {
    super(name);
  }

  /**
   * Gets the routes associated with the Controller.
   *
   * @returns An array of Route objects.
   */
  get routes(): Route[] {
    return this._routes;
  }
}
