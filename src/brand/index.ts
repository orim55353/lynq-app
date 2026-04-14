import { lynqBrand } from "./lynq";
import { jobliBrand } from "./jobli";
import type { BrandConfig } from "./types";

export type { BrandConfig };

const BRAND_ID = (process.env.EXPO_PUBLIC_BRAND ?? "lynq") as BrandConfig["id"];

const brands: Record<BrandConfig["id"], BrandConfig> = {
  lynq: lynqBrand,
  jobli: jobliBrand,
};

/** The active brand config, selected by EXPO_PUBLIC_BRAND env var */
export const brand: BrandConfig = brands[BRAND_ID] ?? lynqBrand;
