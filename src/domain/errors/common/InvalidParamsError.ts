export class InvalidParamsError extends Error {
  constructor(param: string) {
    super(`Invalid param: ${param}`);
    this.name = 'InvalidParamsError';
  }

  serialize() {
    return {
      message: this.message,
      name: this.name,
      code: 400,
    };
  }
} 
