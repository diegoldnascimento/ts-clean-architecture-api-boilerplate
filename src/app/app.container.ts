export class Container {
  private dependencies: Map<string, any> = new Map();
  static instance: Container;

  constructor() {
    this.dependencies = new Map();
  }

  register(key: string, value: any) {
    if (this.dependencies.has(key)) {
      throw new Error("Dependency already registered");
    }
    this.dependencies.set(key, value);
  }

  resolve<T>(key: string): T {
    if (!this.dependencies.has(key)) {
      throw new Error("Dependency not found");
    }
    return this.dependencies.get(key);
  }

  static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }
}

export const inject = (key: string, value: any) => {
  const container = Container.getInstance();
  container.register(key, value);
};

export const resolve = <T>(key: string): T => {
  const container = Container.getInstance();
  return container.resolve<T>(key);
};

const container = Container.getInstance();

export { container };
