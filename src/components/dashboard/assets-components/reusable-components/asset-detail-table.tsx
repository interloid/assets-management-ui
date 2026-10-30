import { DetailRow, Section } from "../view-asset-drawer";
import { statusLabels } from "../../reusable-components/utils";
import type { Asset, AssetStatus } from "@/types/assets";
import { formatDate } from "@/lib/converters";

export function AssetDetailTable({ asset }: { asset: Asset }) {
  return (
    <Section title="Details">
      <dl className="divide-y">
        <DetailRow label="Asset tag" value={asset.assetTag} mono showCopy />
        <DetailRow
          label="Serial number"
          value={asset.serialNumber}
          mono
          showCopy
        />
        <DetailRow label="Type" value={asset.type} />
        <DetailRow
          label="Status"
          value={statusLabels[asset.status as AssetStatus]}
          status={asset.status as AssetStatus}
        />
        <DetailRow
          label="Purchase date"
          value={formatDate(asset.purchaseDate)}
        />
        <DetailRow
          label="Warranty expiry"
          value={
            asset.warrantyExpiry
              ? formatDate(asset.warrantyExpiry)
              : "No warranty"
          }
        />
        <DetailRow label="Created" value={formatDate(asset.createdAt)} />
        <DetailRow label="Last updated" value={formatDate(asset.updatedAt)} />
        <DetailRow label="Asset ID" value={asset.id} mono showCopy />
      </dl>
    </Section>
  );
}
