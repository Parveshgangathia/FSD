import { useEffect } from "react";

export default function useAutoClose(callback, delay = 3000) {
  useEffect(() => {
    const timer = setTimeout(callback, delay);

    return () => clearTimeout(timer);
  }, [callback, delay]);
}
