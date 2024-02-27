import { InvalidParamsError } from "../errors/common/InvalidParamsError";
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
    Ticket.validate(id, code, name, description, status, createdAt, updatedAt);

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

  update(
    code: string,
    name: string,
    description: string,
    status: string,
    updatedAt: Date
  ): Ticket {
    Ticket.validate(
      this.id,
      code,
      name,
      description,
      status,
      this.createdAt,
      updatedAt
    );

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

  static validate(
    id: string,
    code: string,
    name: string,
    description: string,
    status: string,
    createdAt: Date,
    updatedAt: Date
  ): void {
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
      throw new InvalidParamsError(
        "createdAt",
        "must be less than or equal to updatedAt"
      );
    }

    if (status !== "open" && status !== "closed") {
      throw new InvalidParamsError("status", "must be open or closed");
    }
  }
}
