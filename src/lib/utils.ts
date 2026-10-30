import { toast } from "sonner";

export { cn } from "cn";

export async function copyValue(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      toast.success("copied succesfully")
      return true;
    } catch (error) {
      console.error(error);
    }
  }