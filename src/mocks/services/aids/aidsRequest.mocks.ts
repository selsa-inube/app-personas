import { aidRequestTypeDM } from "src/model/domains/services/aids/aidRequestTypeDM";
import { IAid } from "src/model/entity/service";

const aidsRequestMock: IAid[] = [
  {
    id: aidRequestTypeDM.HOSPITALIZATION_SURGERY.id,
    title: "Hospitalización y cirugía",
    description:
      "Factura con la descripción de los gastos pagados, fotocopia de la hospitalización y/o nota operatoria en caso de cirugía.",
    validation: {
      requiredDocuments: ["Factura", "Fotocopia de hospitalización", "Nota operatoria"],
      notes: "Todos los documentos deben ser legibles y estar en formato PDF."
    }
  },
  {
    id: aidRequestTypeDM.DIAGNOSTIC_AIDS.id,
    title: "Ayudas diagnósticas",
    description:
      "Para estudios que permite al médico tratante confirmar un diagnóstico y/o realizar acciones terapéuticas. Factura original y fotocopia de la orden médica. El auxilio solo se concede por órdenes médicas del mismo diagnóstico.",
    validation: {
      requiredDocuments: ["Factura original", "Fotocopia de orden médica"],
      notes: "La orden médica debe estar vigente y corresponder al mismo diagnóstico."
    }
  },
  {
    id: aidRequestTypeDM.ORTHOPEDIC_IMPLEMENTS.id,
    title: "Por implementos ortopédicos",
    description:
      "Factura y fotocopia de epicrisis u orden médica. Se incluyen botas ortopédicas, por las cuales se otorga auxilio una vez al año. También se incluyen sillas de ruedas, muletas, audífonos por pérdida de audición o camas hospitalarias.",
    validation: {
      requiredDocuments: ["Factura", "Fotocopia de epicrisis u orden médica"],
      notes: "El auxilio para botas ortopédicas se concede una vez al año."
    }
  },
  {
    id: aidRequestTypeDM.INITIAL_DISABILITY.id,
    title: "Incapacidad inicial",
    description:
      "Incapacidad médica del asociado, entendida como imposibilidad en un periodo determinado, para realizar cualquier labor o actividad.",
    validation: {
      requiredDocuments: ["Certificado de incapacidad médica"],
      notes: "La incapacidad debe ser emitida por un médico tratante certificado."
    }
  },
  {
    id: aidRequestTypeDM.DEATH_ASSOCIATE.id,
    title: "Fallecimiento del asociado",
    description:
      "Se reconocerá a los beneficiarios inscritos en nuestra base social. Fotocopia del registro o certificado de defunción en un plazo no mayor a 30 días calendario de ocurrido el deceso. Aplica solo para los asociados que tienen el servicio exequial con fondecom.",
    validation: {
      requiredDocuments: ["Certificado de defunción"],
      notes: "El certificado debe ser presentado dentro de los 30 días posteriores al fallecimiento."
    }
  },
  {
    id: aidRequestTypeDM.ADDICTION_PROBLEMS.id,
    title: "Problemas de adicción",
    description:
      "Factura original o copia del contrato de prestación del servicio y certificación de la institución que atiende al paciente, debidamente avalada.",
    validation: {
      requiredDocuments: ["Factura original o contrato", "Certificación de la institución"],
      notes: "La certificación debe estar avalada por una entidad reconocida."
    }
  },
  {
    id: aidRequestTypeDM.PARTIAL_DAMAGE_HOUSE.id,
    title: "Daño parcial de vivienda",
    description:
      "Certificado de tradición actualizado del inmueble a nombre del asociado. Factura cancelada por la compra de materiales y/o cuenta de cobro de la mano de obra de la reparación de los daños, expedidas por una persona natural con RUT o entidad legalmente constituida. Soportar con registro fotográfico a color y video.",
    validation: {
      requiredDocuments: ["Certificado de tradición", "Factura de materiales", "Cuenta de cobro", "Registro fotográfico y video"],
      notes: "Todos los documentos deben ser legibles y corresponder a la reparación del daño reportado."
    }
  },
  {
    id: aidRequestTypeDM.TOTAL_HOUSING_DAMAGE.id,
    title: "Daño total de vivienda",
    description:
      "Certificado de tradición actualizado del inmueble a nombre del asociado. Factura cancelada por la compra de materiales y/o cuenta de cobro de la mano de obra de la reparación de los daños, expedidas por una persona natural con RUT o entidad legalmente constituida. Soportar con registro fotográfico a color y video.",
    validation: {
      requiredDocuments: ["Certificado de tradición", "Factura de materiales", "Cuenta de cobro", "Registro fotográfico y video"],
      notes: "Los documentos deben reflejar el alcance total del daño y las reparaciones necesarias."
    }
  },
  {
    id: aidRequestTypeDM.DEATH_BENEFICIARY.id,
    title: "Fallecimiento de beneficiario",
    description:
      "Fotocopia del registro o certificado de defunción, en un plazo no mayor a 30 días calendario de ocurrido el deceso. Aplica solo para los asociados que tienen el servicio exequial con fondecom.",
    validation: {
      requiredDocuments: ["Certificado de defunción"],
      notes: "El certificado debe ser presentado dentro de los 30 días posteriores al fallecimiento."
    }
  },
  {
    id: aidRequestTypeDM.EXHUMATION_OSSUARY_ASSISTANCE.id,
    title: "Auxilio por exhumación u osario",
    description:
      "Factura original a nombre del asociado o certificación que lo vincule con el pago de la misma, o copia del contrato suscrito con el parque cementerio. Aplica solo para los asociados que tienen el servicio exequial con fondecom.",
    validation: {
      requiredDocuments: ["Factura original", "Certificación de vinculación", "Contrato con parque cementerio"],
      notes: "Debe ser presentado a nombre del asociado y estar vigente."
    }
  },
  {
    id: aidRequestTypeDM.ORTHOPEDIC_BOOTS.id,
    title: "Botas ortopédicas",
    description:
      "Se otorga auxilio por botas ortopédicas una vez al año. Factura original y fotocopia de historia clínica o epicrisis u orden médica.",
    validation: {
      requiredDocuments: ["Factura original", "Historia clínica", "Epicrisis u orden médica"],
      notes: "El auxilio se concede una vez al año."
    }
  },
  {
    id: aidRequestTypeDM.MEDICATIONS.id,
    title: "Medicamentos",
    description:
      "Factura(s) con fecha no superior a 30 días de generada y fotocopia de la fórmula con diagnóstico y con fecha de emisión no superior a 3 meses. Máximo tres (3) solicitudes al año por esta línea de auxilio. El auxilio solo se concede por fórmulas del mismo diagnóstico y del mismo día.",
    validation: {
      requiredDocuments: ["Factura(s)", "Fórmula médica"],
      notes: "Las facturas deben ser recientes y la fórmula debe estar vigente y ser del mismo diagnóstico."
    }
  },
  {
    id: aidRequestTypeDM.MEDICAL_TRANSFERS.id,
    title: "Traslados médicos",
    description:
      "Factura o cuenta de cobro original del transporte con RUT del prestador del servicio y soporte de asistencia a la terapia.",
    validation: {
      requiredDocuments: ["Factura o cuenta de cobro", "RUT del prestador", "Soporte de asistencia"],
      notes: "Los documentos deben ser originales y reflejar el servicio prestado."
    }
  },
  {
    id: aidRequestTypeDM.TEMPORARY_CARE_ACCOMPANIMENT.id,
    title: "Acompañamiento asistencial temporal",
    description:
      "Fotocopia de la incapacidad suscrita por el médico tratante, adscrito a la EPS o ARL a través de la cual el asociado reciba el servicio obligatorio de salud. Fotocopia de la historia clínica o epicrisis en donde se registre la eventualidad. Este auxilio no aplica para los asociados pensionados.",
    validation: {
      requiredDocuments: ["Certificado de incapacidad", "Historia clínica o epicrisis"],
      notes: "No aplica para pensionados y debe estar suscrita por el médico tratante."
    }
  },
  {
    id: aidRequestTypeDM.LENSES.id,
    title: "Lentes",
    description:
      "Orden médica y factura de compra u orden de pedido con sello de cancelado a nombre del asociado discriminando el valor exclusivo de los lentes. Se entrega una vez cada dos años para el asociado. El auxilio no aplica para montura.",
    validation: {
      requiredDocuments: ["Orden médica", "Factura de compra"],
      notes: "El auxilio se concede una vez cada dos años y no aplica para monturas."
    }
  },
  {
    id: aidRequestTypeDM.INCAPACITY_180_DAYS.id,
    title: "Incapacidad superior a 180 días",
    description:
      "Fotocopia de la incapacidad suscrita por el médico tratante, adscrito a la EPS o ARL a través de la cual el asociado reciba el servicio obligatorio de salud. Fotocopia de la historia clínica o epicrisis en donde se registre la incapacidad. No aplica a quienes estén pensionados.",
    validation: {
      requiredDocuments: ["Certificado de incapacidad", "Historia clínica o epicrisis"],
      notes: "No aplica para pensionados y debe estar suscrita por el médico tratante."
    }
  },
  {
    id: aidRequestTypeDM.AIDS_SPORTS_ARTISTIC_ACTIVITIES.id,
    title: "Auxilios para actividades deportivas o artísticas",
    description:
      "El asociado debe tener una antigüedad igual o superior a un año y debe haber realizado el curso de economía solidaria ofrecido por fondecom.",
    validation: {
      requiredDocuments: ["Certificado de antigüedad", "Certificado de curso"],
      notes: "La antigüedad mínima es de un año y el curso debe estar completado."
    }
  },
  {
    id: aidRequestTypeDM.DISABILITY_EXTENSION.id,
    title: "Incapacidad prórroga",
    description:
      "Fotocopia de la prórroga de incapacidad suscrita por el médico tratante, adscrito a la EPS o ARL a través de la cual el asociado reciba el servicio obligatorio de salud. Fotocopia de la historia clínica o epicrisis en donde se registre la eventualidad. Este auxilio no aplica para los asociados pensionados.",
    validation: {
      requiredDocuments: ["Prórroga de incapacidad", "Historia clínica o epicrisis"],
      notes: "No aplica para pensionados y debe estar suscrita por el médico tratante."
    }
  },
  {
    id: aidRequestTypeDM.PARTIAL_DAMAGE_HOUSE.id,
    title: "Daño de enseres básicos",
    description:
      "Certificado de tradición actualizado del inmueble a nombre del asociado. Factura cancelada por la compra de materiales y/o cuenta de cobro de la mano de obra de la reparación de los daños, expedidas por una persona natural con RUT o entidad legalmente constituida. Soportar con registro fotográfico a color y video.",
    validation: {
      requiredDocuments: ["Certificado de tradición", "Factura de materiales", "Cuenta de cobro", "Registro fotográfico y video"],
      notes: "Los documentos deben reflejar el daño de los enseres básicos y las reparaciones necesarias."
    }
  }
];

export { aidsRequestMock };
