import { DetailRow, Section } from "../view-asset-components/view-asset-drawer";
import type { Asset, AssetStatus } from "@/types/assets";
import { formatDate } from "@/lib/converters";
import { statusByLabels } from "../../utils";

export function AssetDetailTable({
  asset,
  isPage,
}: {
  asset: Asset;
  isPage: boolean;
}) {
  return (
    <Section title="Details">
      <dl className="divide-y ">
        <DetailRow
          label="Asset tag"
          value={asset.assetTag}
          mono
          showCopy
          isPage={isPage}
        />
        <DetailRow
          label="Serial number"
          value={asset.serialNumber}
          mono
          showCopy
          isPage={isPage}
        />
        <DetailRow label="Type" value={asset.type} isPage={isPage} />
        <DetailRow
          label="Status"
          value={statusByLabels[asset.status as AssetStatus]}
          status={asset.status as AssetStatus}
          isPage={isPage}
        />
        <DetailRow
          label="Purchase date"
          value={formatDate(asset.purchaseDate)}
          isPage={isPage}
        />
        <DetailRow
          label="Warranty expiry"
          value={
            asset.warrantyExpiry
              ? formatDate(asset.warrantyExpiry)
              : "No warranty"
          }
          isPage={isPage}
        />
        <DetailRow
          label="Created"
          value={formatDate(asset.createdAt)}
          isPage={isPage}
        />
        <DetailRow
          label="Last updated"
          value={formatDate(asset.updatedAt)}
          isPage={isPage}
        />
        <DetailRow
          label="Asset ID"
          value={asset.id}
          mono
          showCopy
          isPage={isPage}
        />
      </dl>
    </Section>
  );
}
