export class InvalidParamsError extends Error {
  constructor(param: string, message: string) {
    super(`Invalid param: ${param} - ${message}`);
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
