"use client";

import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

// The theme (or any client-only value) is unknown on the server, so callers
// render a server-safe default until this flips true — avoids a hydration
// mismatch without setState-in-effect.
export function useMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
