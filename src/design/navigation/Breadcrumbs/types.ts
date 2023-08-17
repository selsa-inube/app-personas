interface IBreadcrumbItem {
  path: string;
  label: string;
  id: string;
  isActive: boolean;
}
interface IRoute {
  label: string;
  path: string;
  id: string;
}

const breadcrumbVariantSize = ["large", "small"] as const;
const breadcrumbSize = ["large", "medium", "small"] as const;

type BreadcrumbVariantSizeType = (typeof breadcrumbVariantSize)[number];
type BreadcrumbSizeType = (typeof breadcrumbSize)[number];

export { breadcrumbVariantSize, breadcrumbSize };
export type {
  BreadcrumbSizeType,
  BreadcrumbVariantSizeType,
  IBreadcrumbItem,
  IRoute,
};
