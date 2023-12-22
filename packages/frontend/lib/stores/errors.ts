import { backendErrorHandle } from "../backend-error-handle";

import { toast } from "@/components/ui/use-toast";

export function handleThunkError(error: unknown): string {
  const errorMsg = backendErrorHandle(error);
  toast({
    title: "Error",
    description: errorMsg,
    variant: "destructive",
  });
  return errorMsg;
}
