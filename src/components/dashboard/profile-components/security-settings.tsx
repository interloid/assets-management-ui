import { useState, type FormEvent } from "react";
import { Circle, CircleCheck, LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/auth";
import { changePasswordSchema } from "@/schemas/auth";
import { changePassword, logoutAll } from "@/services/auth-services";
import type { ChangePasswordErrors } from "@/types/auth";
import PasswordEye from "@/components/auth/password-eye";
import { Spinner } from "@/components/ui/spinner";

export default function SecuritySettings() {
  const navigate = useNavigate();
  const { setSessionResponse } = useAuth();
  const [currentPassword, setCurrentPassword] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState<string | null>(null);
  const [confirmNewPassword, setConfirmNewPassword] = useState<string | null>(
    null,
  );
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [errors, setErrors] = useState<ChangePasswordErrors | null>(null);
  const hasMinLength = newPassword && newPassword.length >= 8;
  const hasLetter = !!newPassword?.match(/[a-zA-Z]/);
  const hasNumber = !!newPassword?.match(/[0-9]/);

  function validateForm() {
    const result = changePasswordSchema.safeParse({
      currentPassword,
      newPassword,
      confirmNewPassword,
    });

    if (result.success) {
      setErrors({});
      return result.data;
    }

    const errorsByField = result.error.flatten().fieldErrors;

    setErrors({
      currentPassword: errorsByField.currentPassword?.[0],
      newPassword: errorsByField.newPassword?.[0],
      confirmNewPassword: errorsByField.confirmNewPassword?.[0],
    });
    return null;
  }

  async function handlePasswordSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validatedData = validateForm();
    if (!validatedData) return;

    setIsSubmitting(true);
    try {
      const response = await changePassword({
        currentPassword: validatedData.currentPassword,
        newPassword: validatedData.newPassword,
      });
      if (response.success) {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        setShowCurrentPassword(false);
        setShowNewPassword(false);
        setShowConfirmPassword(false);
        setErrors(null);
        toast.success(response.message || "Password updated successfully.");
        setSessionResponse(null);
        navigate("/login", { replace: true });
      }
      if (!response.success) {
        const errorMessage =
          response.errors?.map((error) => error.message).join(", ") ||
          response.message ||
          "Unable to update your password.";
        toast.error(errorMessage);
        return;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleLogoutAll() {
    setIsLoggingOut(true);
    try {
      const response = await logoutAll();
      if (response.ok) {
        setSessionResponse(null);
        setIsLogoutDialogOpen(false);
        toast.success("You have been signed out of all sessions.");
        navigate("/login", { replace: true });
        return;
      }
      if (response.status === 401) {
        setSessionResponse(null);
        setIsLogoutDialogOpen(false);
        toast.error("Your session has ended. Please sign in again.");
        navigate("/login", { replace: true });
        return;
      }
      toast.error("Unable to sign out all sessions. Please try again.");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <div className="flex flex-col gap-6 2xl:w-[50%]">
      <form
        onSubmit={handlePasswordSubmit}
        className="overflow-hidden rounded-lg border bg-card shadow-sm"
      >
        <div className="border-b px-5 py-4">
          <h2 className="text-base font-semibold">Change password</h2>
          <p className="mt-0.5 text-[13px] text-muted-foreground">
            Changing your password signs you out on every other device.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 p-5 md:pt-5.5 md:grid-cols-2 md:gap-y-5 md:gap-x-4.5 md:pb-2.5 lg:gap-y-5 lg:pb-3">
          <div className="flex flex-col gap-2 md:gap-2.5 md:col-span-2 md:max-w-90">
            <Label htmlFor="current-password">Current password</Label>
            <div className="relative">
              <Input
                id="current-password"
                type={showCurrentPassword ? "text" : "password"}
                autoComplete="current-password"
                className="rounded-md h-9 border border-input shadow-xs px-3 text-sm"
                value={currentPassword ?? undefined}
                onChange={(event) => setCurrentPassword(event.target.value)}
              />
              <PasswordEye
                showPassword={showCurrentPassword}
                onToggle={() => setShowCurrentPassword((visible) => !visible)}
              />
            </div>
            {errors?.currentPassword && (
              <p className="text-sm text-destructive">
                {errors.currentPassword}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="new-password">New password</Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showNewPassword ? "text" : "password"}
                autoComplete="new-password"
                className="rounded-md h-9 border border-input shadow-xs px-3 text-sm"
                value={newPassword ?? undefined}
                onChange={(event) => setNewPassword(event.target.value)}
              />
              <PasswordEye
                showPassword={showNewPassword}
                onToggle={() => setShowNewPassword((visible) => !visible)}
              />
            </div>
            {errors?.newPassword && (
              <p className="text-sm text-destructive">{errors?.newPassword}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="confirm-password">Confirm new password</Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                className="rounded-md h-9 border-input shadow-xs px-3 text-sm"
                value={confirmNewPassword ?? undefined}
                onChange={(event) => setConfirmNewPassword(event.target.value)}
              />
              <PasswordEye
                showPassword={showConfirmPassword}
                onToggle={() => setShowConfirmPassword((visible) => !visible)}
              />
            </div>
            {errors?.confirmNewPassword && (
              <p className="text-sm text-destructive">
                {errors.confirmNewPassword}
              </p>
            )}
          </div>
          <div className="flex col-span-full gap-4 md:gap-5 text-muted-foreground flex-wrap xs:flex-nowrap gap-y-0 relative bottom-1.25">
            <div className="flex gap-1.5 md:gap-1.5">
              {hasMinLength ? (
                <CircleCheck className="w-3.5 text-success pt-px" />
              ) : (
                <Circle className="w-3.5 pt-px" />
              )}
              <span
                className={cn(
                  "text-[13px] relative self-end bottom-px",
                  hasMinLength && "text-success",
                )}
              >
                At least 8 characters
              </span>
            </div>
            <div className="flex gap-1.5 md:gap-1.5">
              {hasLetter ? (
                <CircleCheck className="w-3.5 text-success pt-px" />
              ) : (
                <Circle className="w-3.5 pt-px" />
              )}
              <span
                className={cn(
                  "text-[13px] relative self-end bottom-px",
                  hasLetter && "text-success",
                )}
              >
                One letter
              </span>
            </div>
            <div className="flex gap-1.5 md:gap-1.5">
              {hasNumber ? (
                <CircleCheck className="w-3.5 text-success pt-px" />
              ) : (
                <Circle className="w-3.5 pt-px" />
              )}
              <span
                className={cn(
                  "text-[13px] relative self-end bottom-px",
                  hasNumber && "text-success",
                )}
              >
                One number
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-end border-t bg-muted/50 px-5 py-4">
          <Button
            type="submit"
            className="h-9 rounded-md px-3.5"
            disabled={isSubmitting}
          >
            {isSubmitting ?<><Spinner/> Updating... </> : "Update password"}
          </Button>
        </div>
      </form>
      <section className="flex flex-col flex-wrap items-start justify-between gap-3 rounded-lg border bg-card p-5 pt-3 pb-4.5 shadow-sm md:flex-row md:items-center">
        <div className="min-w-0 flex-1 lg:mt-1">
          <h2 className="text-base font-semibold">Sessions</h2>
          <p className="mt-0.5 text-[13px] text-muted-foreground">
            Sign out of every browser and device where you're signed in,
            including this one.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsLogoutDialogOpen(true)}
          className="shrink-0 px-4 rounded-md h-9 text-destructive hover:text-destructive lg:mt-2"
        >
          <LogOut className="size-4 relative right-0.5" />
          Sign out everywhere
        </Button>
      </section>
      <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign out everywhere?</DialogTitle>
            <DialogDescription>
              This will end all your active sessions, including your current
              session. You will need to sign in again.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isLoggingOut}
              onClick={() => setIsLogoutDialogOpen(false)}
              className="h-9 rounded-sm"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={isLoggingOut}
              onClick={handleLogoutAll}
              className="h-9 rounded-sm"
            >
              {isLoggingOut ? "Signing out..." : "Sign out everywhere"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
