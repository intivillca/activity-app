import { useEffect } from "react";
import { Socket } from "socket.io-client";

export type EventType = string;

// Taken from internal socket.io types - see first type param on Socket
interface EventsMap {
  [event: string]: any;
}

export function useSocket<E extends EventsMap, K extends keyof E>(
  socket: Socket<E>,
  event: K,
  callback: E[K]
): void {
  useEffect(() => {
    socket.on(event as string, callback);

    return () => {
      socket.off(event as string, callback);
    };
  }, [socket, event, callback]);
}

export function createUseSocket<E extends EventsMap>(socket: Socket<E>) {
  return <K extends keyof E>(event: K, callback: E[K]) => {
    useSocket(socket, event, callback);
  };
}

export function createUseSocketEvent<E extends EventsMap, K extends keyof E>(
  socket: Socket<E>,
  event: K
) {
  return (callback: E[K]) => {
    useSocket(socket, event, callback);
  };
}
