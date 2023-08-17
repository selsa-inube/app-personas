interface IBreadcrumbItem {
  path: string;
  label: string;
  id: string;
  isActive: boolean;
}
interface IBreadcrumbRoute {
  label: string;
  path: string;
  id: string;
}

const breadcrumbSize = ["large", "medium", "small"] as const;

type BreadcrumbSizeType = (typeof breadcrumbSize)[number];

export { breadcrumbSize };

export type { BreadcrumbSizeType, IBreadcrumbItem, IBreadcrumbRoute };
