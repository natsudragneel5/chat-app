import { useState, useCallback } from "react";

export function useModelState(defaultValue = false) {
  const [isOpen, setState] = useState(defaultValue);
  const open = useCallback(() => setState(true), []);
  const close = useCallback(() => setState(false), []);

  return { isOpen, open, close };
}
