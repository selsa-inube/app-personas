const breadcrumbLinksize = ["large", "medium", "small"] as const;

type BreadcrumbLinkSizeType = (typeof breadcrumbLinksize)[number];

export { breadcrumbLinksize };
export type { BreadcrumbLinkSizeType };
