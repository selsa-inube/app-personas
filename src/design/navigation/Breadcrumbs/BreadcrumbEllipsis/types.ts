const breadcrumbSize = ["large", "small"] as const;
type BreadcrumbSizeType = (typeof breadcrumbSize)[number];

export { breadcrumbSize };
export type { BreadcrumbSizeType };
