import { EventType, Emitter, Handler } from "mitt";
import { useEffect } from "react";

export function useMitt<
  E extends Record<EventType, unknown>,
  K extends keyof E,
>(emitter: Emitter<E>, event: K, callback: Handler<E[K]>): void {
  useEffect(() => {
    emitter.on(event, callback);

    return () => {
      emitter.off(event, callback);
    };
  }, [emitter, event, callback]);
}

export function createUseMitt<E extends Record<EventType, unknown>>(
  emitter: Emitter<E>
): <K extends keyof E>(ev: K, cb: Handler<E[K]>) => void {
  return (ev, cb) => {
    useMitt(emitter, ev, cb);
  };
}

export function createUseMittEvent<
  E extends Record<EventType, unknown>,
  K extends keyof E,
>(emitter: Emitter<E>, ev: K): (cb: Handler<E[K]>) => void {
  return (cb) => {
    useMitt(emitter, ev, cb);
  };
}
