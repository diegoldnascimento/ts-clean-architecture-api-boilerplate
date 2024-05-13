export type Either<L, R> = Left<L> | Right<R>;

class Left<L> {
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  isLeft(): this is Left<L> {
    return true;
  }

  isRight(): this is Right<L> {
    return false;
  }
}

class Right<R> {
  readonly value: R;

  constructor(value: R) {
    this.value = value;
  }

  isLeft(): this is Left<R> {
    return false;
  }

  isRight(): this is Right<R> {
    return true;
  }
}

export function left<L, R>(value: L): Either<L, R> {
  return new Left<L>(value);
}

export function right<L, R>(value: R): Either<L, R> {
  return new Right<R>(value);
}
