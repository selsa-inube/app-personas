interface IBreadcrumbItem {
  path: string;
  label: string;
  id: string;
  isActive: boolean;
}

const breadcrumbSize = ["large", "small"] as const;

type BreadcrumbSizeType = (typeof breadcrumbSize)[number];

export { breadcrumbSize };
export type { BreadcrumbSizeType, IBreadcrumbItem };
