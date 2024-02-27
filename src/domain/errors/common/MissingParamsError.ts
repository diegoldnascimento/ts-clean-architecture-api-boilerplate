export class MissingParamsError extends Error {
  constructor(param: string) {
    super(`Missing param: ${param}`);
    this.name = 'MissingParamsError';
  }

  serialize() {
    return {
      message: this.message,
      name: this.name,
      code: 400,
    };
  }
}
