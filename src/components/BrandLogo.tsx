import { brand } from "../brand";
import { JobliLogo } from "./JobliLogo";
import { LynqLogo } from "./LynqLogo";

interface BrandLogoProps {
  readonly size?: number;
  readonly white?: boolean;
}

/**
 * Renders the correct logo for the active brand.
 */
export function BrandLogo({ size = 48, white = false }: BrandLogoProps) {
  if (brand.id === "jobli") {
    return <JobliLogo size={size} white={white} />;
  }
  return <LynqLogo size={size} white={white} />;
}
