import { Check, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/converters";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import type { AssignAssetDialogProps } from "@/types/assets";
import { Spinner } from "@/components/ui/spinner";
import { assignAsset } from "@/services/assets.services";
import { toast } from "sonner";

export function AssignAssetDialog({
  onOpenChange,
  asset,
  allUsers,
  onAssigned,
}: AssignAssetDialogProps) {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [isAssignLoading, setIsAssignLoading] = useState<boolean>(false);

  async function handleAssignAsset() {
    if (!selectedUserId) return;
    setIsAssignLoading(true);
    try {
      const response = await assignAsset(asset.id, selectedUserId);
      if (response.success) {
        onAssigned?.(selectedUserId);
        onOpenChange(false);
        toast.success("Assets Assigned Successfully");
      } else {
        onOpenChange(false);
        toast.error("Asset not assigned");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsAssignLoading(false);
    }
  }
  const filteredUsers = allUsers.filter((user) => {
    const query = searchText.trim().toLowerCase();
    return (
      user.fullName.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
  });

  return (
    <section
      className="absolute inset-0 z-20 flex items-center justify-center p-4 backdrop-blur-xs"
      onClick={(event) => {
        if (event.target === event.currentTarget) onOpenChange(false);
      }}
    >
      <Card className="relative flex max-h-full py-6 w-full max-w-120 flex-col gap-0 overflow-hidden rounded-lg shadow-lg">
        <CardHeader className="px-5 text-left">
          <CardTitle className="text-lg font-semibold">Assign asset</CardTitle>
          <CardDescription className="w-[90%]">
            Issue {asset.assetTag} to one person. Only in-stock assets can be
            assigned.
          </CardDescription>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={() => onOpenChange(false)}
          >
            <X className="size-4 text-muted-foreground" />
          </Button>
        </CardHeader>
        <CardContent className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden px-5 pt-2 pb-4">
          <div className="relative">
            <Search
              aria-hidden="true"
              className="absolute left-3 top-1/2 size-4
              -translate-y-1/2 text-muted-foreground"
            />

            <Input
              type="search"
              placeholder="Search people by name or email"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              aria-label="Search people"
              className="rounded-sm pl-9 text-sm h-9"
            />
          </div>

          <div
            role="radiogroup"
            aria-label="People"
            className="flex min-h-0 flex-1 flex-col gap-1
            overflow-y-auto px-1"
          >
            {filteredUsers.map((user) => {
              const isSelected = selectedUserId === user.id;
              return (
                <Button
                  key={user.id}
                  type="button"
                  variant="ghost"
                  role="radio"
                  onClick={() => setSelectedUserId(user.id)}
                  className={`flex min-h-12 shrink-0 items-center gap-3 rounded-md border px-2 py-1.5 text-left ${
                    isSelected ? "border-ring" : "bg-transparent hover:bg-muted"
                  }`}
                >
                  <Avatar className="size-8 shrink-0">
                    <AvatarFallback className="text-xs text-foreground font-semibold">
                      {getInitials(user.fullName)}
                    </AvatarFallback>
                  </Avatar>

                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-sm font-medium">
                      {user.fullName}
                    </span>

                    <span className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  </span>
                  <Check
                    className={`size-4 shrink-0 text-primary ${
                      isSelected ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </Button>
              );
            })}
          </div>
        </CardContent>
        <div className="flex shrink-0 justify-end gap-2 border-t px-5 py-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            disabled={!selectedUserId}
            onClick={handleAssignAsset}
          >
            {isAssignLoading ? (
              <>
                <Spinner />
                Assigning
              </>
            ) : (
              "Assign"
            )}
          </Button>
        </div>
      </Card>
    </section>
  );
}
