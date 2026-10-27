import * as React from "react";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

/**
 * Bottom-anchored pop-up used across the site. The panel slides up from the
 * bottom edge over a dimmed page, and closes on Escape, on the backdrop or on
 * the close button. One implementation keeps every pop-up looking the same.
 */
const BottomSheet = ({ open, onOpenChange, title, description, children, className }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <Sheet open={open} onOpenChange={onOpenChange}>
    <SheetContent side="bottom" className={cn("ss-sheet p-0 gap-0 rounded-t-2xl", className)}>
      <span className="ss-sheet-handle" aria-hidden="true" />
      <SheetTitle className="ss-sheet-title">{title}</SheetTitle>
      <SheetDescription className="sr-only">{description ?? "This window can be closed at any time."}</SheetDescription>
      <div className="ss-sheet-body">{children}</div>
    </SheetContent>
  </Sheet>
);

export default BottomSheet;
