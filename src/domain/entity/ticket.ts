import { MissingParamsError } from "../errors/common/MissingParamsError";

export class Ticket {
  private constructor(
    public readonly id: string,
    public readonly code: string,
    public readonly name: string,
    public readonly description: string,
    public readonly status: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  static create(
    id: string,
    code: string,
    name: string,
    description: string,
    status: string,
    createdAt: Date,
    updatedAt: Date
  ): Ticket {
    if (!id) {
      throw new MissingParamsError("id");
    }

    if (!code) {
      throw new MissingParamsError("code");
    }

    if (!name) {
      throw new MissingParamsError("name");
    }

    if (!description) {
      throw new MissingParamsError("description");
    }

    if (!status) {
      throw new MissingParamsError("status");
    }

    if (!createdAt) {
      throw new MissingParamsError("createdAt");
    }

    if (!updatedAt) {
      throw new MissingParamsError("updatedAt");
    }

    if (createdAt > updatedAt) {
      throw new Error("createdAt must be less than or equal to updatedAt");
    }

    if (status !== "open" && status !== "closed") {
      throw new Error("status must be open or closed");
    }

    return new Ticket(
      id,
      code,
      name,
      description,
      status,
      createdAt,
      updatedAt
    );
  }

  static fromJSON(data: any): Ticket {
    return new Ticket(
      data.id,
      data.code,
      data.name,
      data.description,
      data.status,
      new Date(data.createdAt),
      new Date(data.updatedAt)
    );
  }

  toJSON(): any {
    return {
      id: this.id,
      code: this.code,
      name: this.name,
      description: this.description,
      status: this.status,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }

  update(
    code: string,
    name: string,
    description: string,
    status: string,
    updatedAt: Date
  ): Ticket {
    if (!code) {
      throw new MissingParamsError("code");
    }

    if (!name) {
      throw new MissingParamsError("name");
    }

    if (!description) {
      throw new MissingParamsError("description");
    }

    if (!status) {
      throw new MissingParamsError("status");
    }

    if (!updatedAt) {
      throw new MissingParamsError("updatedAt");
    }

    if (this.createdAt > updatedAt) {
      throw new Error("createdAt must be less than or equal to updatedAt");
    }

    if (status !== "open" && status !== "closed") {
      throw new Error("status must be open or closed");
    }

    return new Ticket(
      this.id,
      code,
      name,
      description,
      status,
      this.createdAt,
      updatedAt
    );
  }

  close(updatedAt: Date): Ticket {
    return this.update(
      this.code,
      this.name,
      this.description,
      "closed",
      updatedAt
    );
  }
}
