const breadcrumbEllipsisSize = ["large", "small"] as const;
type BreadcrumbEllipsisSizeType = (typeof breadcrumbEllipsisSize)[number];

export { breadcrumbEllipsisSize };
export type { BreadcrumbEllipsisSizeType };
