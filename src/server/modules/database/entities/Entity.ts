/**
 * Abstract class representing a base entity.
 * Provides methods to serialize and deserialize entities for storage in Redis.
 */
export abstract class Entity {
  /**
   * Serializes the current instance to a JSON string.
   *
   * @returns A JSON string representation of the current instance.
   */
  serialize(): string {
    return JSON.stringify(this);
  }

  /**
   * Deserializes a JSON string into an instance of the class.
   *
   * @param data - The JSON string to be deserialized.
   * @returns An instance of the class with properties populated from the provided JSON string.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static deserialize<T extends Entity>(EntityClass: new (...args: any[]) => T, data: string): T {
    const instance = new EntityClass();
    const parsedData = JSON.parse(data);

    for (const key in parsedData) {
      // if (Object.prototype.hasOwnProperty.call(instance, key)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (instance as any)[key] = parsedData[key];
      // }
    }

    return instance;
  }
}
