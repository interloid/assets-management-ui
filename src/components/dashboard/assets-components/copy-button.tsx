import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "cn";

type CopyButtonProps = {
  value: string;
  className?: string;
};

export function CopyButton({ value, className }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);
      toast.success(`${value} - Copied successfully`);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={handleCopy}
      className={cn(className, "cursor-pointer")}
      aria-label={isCopied ? "Copied" : "Copy"}
    >
      {isCopied ? (
        <Check className="size-3.5 2xl:self-center 2xl:top-1 cursor-pointer text-success" />
      ) : (
        <Copy
          className={`size-3.5 2xl:self-center 2xl:top-1 text-muted-foreground cursor-pointer`}
        />
      )}
    </Button>
  );
}
