interface AssignedAssetsHeaderProps {
  totalAssets: number;
}

export default function AssignedAssetsHeader({
  totalAssets,
}: AssignedAssetsHeaderProps) {
  return (
    <header className="flex flex-col gap-5">
      <h1 className="text-[22px] md:text-2xl tracking-tight leading-[0.55px] font-semibold">
        My assets
      </h1>
      <p className="text-sm text-muted-foreground">
        {totalAssets} {totalAssets === 1 ? "device" : "devices"} currently
        issued to you. Contact IT to return or report a fault.
      </p>
    </header>
  );
}
