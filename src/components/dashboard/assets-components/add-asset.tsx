import { ArrowLeft } from "lucide-react";
import { AddAssetForm } from "./add-asset-form";
import { useNavigate } from "react-router";

export function AddAsset() {
    const navigate = useNavigate();

  return (
    <section className="p-4 md:p-5.5 md:pt-6 lg:p-11.25 lg:pt-7.75! lg:pb-6 lg:pr-7 xl:pt-8.5! xl:pl-8 2xl:px-8 gap-6 flex flex-col xs:flex-row lg:justify-between">
      <div className="flex flex-col w-full gap-6.25">
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground cursor-pointer" onClick={() => navigate("/dashboard/assets/")} >
          <ArrowLeft className="size-4"/> Assets
        </nav>
        <header className="flex flex-col gap-1 leading-normal">
          <h1 className="m-0 text-[22px] xs:text-[24px] font-semibold tracking-[-0.01em]">
            Add asset
          </h1>
          <p className="m-0 text-sm text-muted-foreground">
            New assets start In stock. Assign them from the asset page after
            saving.
          </p>
        </header>
        <AddAssetForm/>
      </div>
    </section>
  );
}
