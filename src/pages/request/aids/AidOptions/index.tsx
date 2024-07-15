import { aidsRequestMock } from "@mocks/services/aids/aidsRequest.mocks";
import { useEffect, useState } from "react";
import { IAid } from "src/model/entity/service";
import { AidOptionsUI } from "./interfaces";

function AidOptions() {
  const [aids, setAids] = useState<IAid[]>([]);

  useEffect(() => {
    setAids(aidsRequestMock);
  }, []);

  return <AidOptionsUI aids={aids} />;
}

export { AidOptions };
