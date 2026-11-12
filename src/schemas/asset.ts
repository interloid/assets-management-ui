import { z } from "zod";

const serialNumberSchema = z
  .union([z.string(), z.null()])
  .transform((serialNumber) => serialNumber ?? "")
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
  .transform((purchaseDate) => purchaseDate ?? "")
  .pipe(z.string().min(1, "Purchase date is required."));

const statusSchema = z.enum(["in_stock", "assigned", "repair", "retired"], {
  message: "Please select a valid asset status.",
});

const warrantySchema = z.union([z.iso.date(), z.literal(""), z.null()]);

export const createAssetSchema = z.object({
  type: z.enum(["laptop", "monitor", "phone", "accessory"], {
    message: "Please choose an asset type.",
  }),
  serialNumber: serialNumberSchema,
  purchaseDate: purchaseDateSchema,
  status: statusSchema,
  warrantyExpiry: warrantySchema,
});

export const editAssetSchema = z.object({
  type: z.enum(["laptop", "monitor", "phone", "accessory"], {}),
  serialNumber: serialNumberSchema,
  purchaseDate: purchaseDateSchema,
});

const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const MAX_FILES = 5;

const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/webp",
];

export const fileSchema = z
  .instanceof(File)
  .refine(
    (file) => ACCEPTED_FILE_TYPES.includes(file.type),
    "Only PDF, PNG, JPG, and WebP files are allowed.",
  )
  .refine(
    (file) => file.size <= MAX_FILE_SIZE,
    "Each file must not exceed 5 MB.",
  );

export const filesSchema = z
  .array(fileSchema)
  .min(1, "Please upload at least one file.")
  .max(MAX_FILES, `You can upload a maximum of ${MAX_FILES} files.`);
