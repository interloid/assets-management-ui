import { z } from "zod";

const serialNumberSchema = z
  .union([z.string(), z.null()])
  .transform((serialNumber) => serialNumber ?? undefined)
  .pipe(
    z
      .string()
      .trim()
      .min(1, "Serial number is required.")
      .min(8, "Minimum 8 characters required.")
      .max(20, "Maximum 20 characters allowed.")
      .regex(
        /^[A-Z0-9-]+$/,
        "Only uppercase letters, numbers, and hyphens allowed.",
      )
      .regex(/[A-Z]/, "At least one uppercase letter required.")
      .regex(/[0-9]/, "At least one number required."),
  );

const purchaseDateSchema = z
  .union([z.string(), z.null()])
  .transform((purchaseDate) => purchaseDate ?? undefined)
  .pipe(z.string().min(1, "Purchase date is required."));

const statusSchema = z.enum(["in_stock", "assigned", "in_repair", "retired"], {
  message: "Please select a valid asset status.",
});

export const createAssetSchema = z.object({
  type: z.enum(["laptop", "monitor", "phone", "accessory"], {
    message: "choose a type.",
  }),
  serialNumber: serialNumberSchema,
  purchaseDate: purchaseDateSchema,
  status: statusSchema,
});

export const editAssetSchema = z.object({
  type: z.enum(["laptop", "monitor", "phone", "accessory"], {}),
  serialNumber: serialNumberSchema,
  purchaseDate: purchaseDateSchema,
});
