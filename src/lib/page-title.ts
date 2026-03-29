import { brand } from "@config/brand";

/** Browser tab title with consistent portal suffix */
export function pageTitle(section: string): string {
  return `${section} | ${brand.portalTitle}`;
}
