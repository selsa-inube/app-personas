import { enviroment } from "@config/enviroment";

const getAuthProvider = () => {
  const businessUnit = enviroment.BUSINESS_UNIT;
  const provider = enviroment.AUTH_PROVIDERS.split(",").find((p: string) =>
    p.startsWith(businessUnit),
  );
  return provider ? provider.split(":")[1] : null;
};

export { getAuthProvider };
