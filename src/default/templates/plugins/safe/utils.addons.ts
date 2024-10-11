export const utils = `export const toSafe = <Output>(promise: Promise<Output>) => {
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
