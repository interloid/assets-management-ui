import type { AssetFiltersProps } from "@/types/assets";
import { ChevronDown, Search } from "lucide-react";

export default function AssetFilters({
  query,
  onQueryChange,
  allUsers,
}: AssetFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <label className="relative flex min-w-0 flex-[1_1_260px]">
        <span className="sr-only">Search assets</span>
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="search"
          value={query.search}
          onChange={(event) => onQueryChange("search", event.target.value)}
          placeholder="Search tag, serial or notes"
          className="h-9 min-w-0 flex-1 rounded-md border border-input bg-background px-9 pr-10 text-sm shadow-xs outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
        />
        <kbd className="pointer-events-none text-center absolute right-2 top-1/2 grid h-5 min-w-5 -translate-y-1/2 place-items-end rounded border border-border bg-muted px-1.5 font-mono text-[12px] text-muted-foreground">
          /
        </kbd>
      </label>
      <FilterSelect
        label="Type"
        options={[
          { label: "All types", value: "all" },
          { label: "Laptop", value: "laptop" },
          { label: "Monitor", value: "monitor" },
          { label: "Phone", value: "phone" },
          { label: "Accessory", value: "accessory" },
        ]}
        value={query.type}
        onChange={(value) => onQueryChange("type", value)}
      />
      <FilterSelect
        label="Assigned to"
        options={[
          { label: "Anyone", value: "all" },
          ...allUsers.map((user) => ({
            label: user.fullName,
            value: user.id,
          })),
        ]}
        value={query.assignedUser}
        onChange={(value) => onQueryChange("assignedUser", value)}
      />
      <FilterSelect
        label="Warranty"
        options={[
          { label: "Any warranty", value: "all" },
          { label: "Expires ≤ 30 days", value: "expires_in_30_days" },
          { label: "Expires ≤ 90 days", value: "expires_in_90_days" },
          { label: "Already expired", value: "expired" },
        ]}
        value={query.warrantyExpiry}
        onChange={(value) => onQueryChange("warrantyExpiry", value)}
      />

      <FilterSelect
        label="Sort"
        options={[
          { label: "Newest first", value: "created_at:desc" },
          { label: "Oldest first", value: "created_at:asc" },
          { label: "Purchased, newest", value: "purchase_date:desc" },
          { label: "Purchased, oldest", value: "purchase_date:asc" },
          { label: "Asset tag A-Z", value: "asset_tag:asc" },
          { label: "Asset tag Z-A", value: "asset_tag:desc" },
        ]}
        value={query.sort}
        onChange={(value) => onQueryChange("sort", value)}
      />
    </div>
  );
}

type FilterOption = {
  label: string;
  value: string;
};

type FilterSelectProps = {
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
};

function FilterSelect({ label, options, value, onChange }: FilterSelectProps) {
  return (
    <label className="relative flex min-w-0 flex-[1_1_160px] sm:max-w-55">
      <span className="sr-only">{label}</span>

      <select
        aria-label={label}
        className="h-9 min-w-0 flex-1 cursor-pointer text-muted-foreground appearance-none rounded-md border border-input bg-background py-0 pl-3 pr-8 text-sm shadow-xs outline-none transition-[border-color,box-shadow] focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
        value={value}
        onChange={(event) => onChange(event.currentTarget.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
      />
    </label>
  );
}
