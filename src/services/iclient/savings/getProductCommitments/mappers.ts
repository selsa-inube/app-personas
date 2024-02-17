const mapCommitmentsForProductApiToEntity = (
  commitmentForProduct: Record<string, string | number | object>,
) => {
  return {
    commitmentId: String(commitmentForProduct.commitmentId),
    productId: String(commitmentForProduct.productNumber),
  };
};

const mapCommitmentsForProductApiToEntities = (
  commitmentsForProduct: Record<string, string | number | object>[],
) => {
  return commitmentsForProduct.map((savings) =>
    mapCommitmentsForProductApiToEntity(savings),
  );
};

export {
  mapCommitmentsForProductApiToEntities,
  mapCommitmentsForProductApiToEntity,
};
