const breadcrumbMenuLinksize = ["large", "medium", "small"] as const;

type BreadcrumbMenuLinkSizeType = (typeof breadcrumbMenuLinksize)[number];

export { breadcrumbMenuLinksize };
export type { BreadcrumbMenuLinkSizeType };
