"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useAction } from "@/stores/action";

export function LoadingScreen() {
  const { showLoadingScreen } = useAction();
  return (
    <Dialog open={showLoadingScreen}>
      <DialogContent
        className="w-0 h-0 p-0 flex items-center justify-center bg-transparent border-none outline-none shadow-none loading"
        aria-describedby={undefined}
      >
        <DialogTitle className="hidden">Loading...</DialogTitle>
        <div className="flex space-x-2 ml-[-5px] mt-[-3px]">
          <div className="w-4 h-4 bg-white rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-white rounded-full animate-bounce delay-200"></div>
          <div className="w-4 h-4 bg-white rounded-full animate-bounce delay-400"></div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
