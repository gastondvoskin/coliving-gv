import listingData from "@/data/listing.json";
import type { ListingData } from "@/lib/types";

export const listing = listingData as ListingData;

export function getAmenityGroups(items: string[]) {
  const groups = {
    Essentials: [] as string[],
    Work: [] as string[],
    Kitchen: [] as string[],
    Outdoor: [] as string[],
    Other: [] as string[]
  };

  for (const item of items) {
    const lower = item.toLowerCase();
    if (/(wifi|internet|tv|aire|heating|calefacción|ac)/.test(lower)) {
      groups.Essentials.push(item);
    } else if (/(trabajo|desk|office|cowork|workspace)/.test(lower)) {
      groups.Work.push(item);
    } else if (/(cocina|kitchen|horno|microondas|cafetera|fridge|refrigerador)/.test(lower)) {
      groups.Kitchen.push(item);
    } else if (/(patio|parrilla|balc|terraza|outdoor|garden)/.test(lower)) {
      groups.Outdoor.push(item);
    } else {
      groups.Other.push(item);
    }
  }

  return Object.entries(groups).filter(([, values]) => values.length > 0);
}
