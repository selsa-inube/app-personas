const breadcrumbEllipsisSize = ["large", "small"] as const;

type BreadcrumbEllipsisSizeType = (typeof breadcrumbEllipsisSize)[number];

interface IRoute {
  label: string;
  path: string;
  id: string;
}

export { breadcrumbEllipsisSize };
export type { BreadcrumbEllipsisSizeType, IRoute };
