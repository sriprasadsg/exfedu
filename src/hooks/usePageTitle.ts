import { useEffect } from "react";

/** Sets a unique document title (and description) for a page, restoring the previous values on leave. */
export const usePageTitle = (title: string, description?: string) => {
  useEffect(() => {
    const previous = document.title;
    const meta = document.querySelector('meta[name="description"]');
    const previousDescription = meta?.getAttribute("content") ?? "";
    document.title = title;
    if (description) meta?.setAttribute("content", description);
    return () => {
      document.title = previous;
      if (description) meta?.setAttribute("content", previousDescription);
    };
  }, [title, description]);
};
