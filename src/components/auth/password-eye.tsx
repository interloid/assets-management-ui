import { Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";

type PasswordEyeProps = {
    showPassword: boolean;
    onToggle: () => void
}

export default function PasswordEye({showPassword, onToggle}:PasswordEyeProps) {
  return (
    <Button
      type="button"
      onClick={onToggle}
      className="absolute right-2 top-1 rounded-md p-1 text-foreground ring-0 bg-transparent hover:bg-transparent cursor-pointer"
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      <span className="text-xs font-medium text-muted-foreground hover:text-foreground">
        {showPassword ? (
          <EyeOff className="h-4 w-4 text-mute" />
        ) : (
          <Eye className="h-4 w-4 text-muted-text" />
        )}
      </span>
    </Button>
  );
}
