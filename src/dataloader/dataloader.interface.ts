// TODO generic?
export interface DataloaderInterface<
  T extends NonNullable<unknown>,
  P = undefined,
> {
  object: T;
  params: P;
}
