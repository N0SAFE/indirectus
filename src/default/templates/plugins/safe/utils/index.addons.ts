export const utils = `export type ToSafeOutput<Output> = {
  data: Output;
  isError: false;
  error: never;
} | {
  error: Error;
  isError: true;
  data: never;
};

export const toSafe = <Output>(promise: Promise<Output>): Promise<ToSafeOutput<Output>> => {
  return promise
    .then(
      (data) =>
        ({ data, isError: false }) as {
          data: typeof data;
          isError: false;
          error: never;
        },
    )
    .catch(
      (error) =>
        ({ error, isError: true }) as {
          error: Error;
          isError: true;
          data: never;
        },
    );
};`


console.log('use utils.addons.ts')