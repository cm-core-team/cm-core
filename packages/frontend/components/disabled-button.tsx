import { Button } from "./ui/button";

export interface DisabledButtonProps {
  className?: string;
}

export function DisabledButton({
  children,
  className,
}: React.PropsWithChildren<DisabledButtonProps>) {
  return (
    <Button className={className} variant={"ghost"} disabled>
      {children}
    </Button>
  );
}
