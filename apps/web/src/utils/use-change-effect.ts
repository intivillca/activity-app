import {
  DependencyList,
  EffectCallback,
  useCallback,
  useEffect,
  useRef,
} from "react";

type CompareFn<T> = (prev: T | null, current: T) => boolean;

export function useChangeEffect<T>(
  value: T,
  callback: EffectCallback,
  extraDeps?: DependencyList,
  compareFn?: CompareFn<T>
): void {
  const prevValue = useRef<T | null>(null);
  const isInitialised = useRef(false);

  const compare = useCompare(compareFn);

  useEffect(() => {
    const didChange =
      isInitialised.current && !compare(prevValue.current, value);
    prevValue.current = value;
    isInitialised.current = true;

    if (didChange) {
      return callback();
    }

    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, callback, compare, ...(extraDeps ?? [])]);
}

function useCompare<T>(compareFn?: CompareFn<T> | null): CompareFn<T> {
  return useCallback(
    (prev: T | null, current: T) => {
      if (compareFn) {
        return compareFn(prev, current);
      }

      return prev === current;
    },
    [compareFn]
  );
}
