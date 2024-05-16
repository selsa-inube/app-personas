import { IAid } from "src/model/entity/service";

const aidsRequestMock: IAid[] = [
  {
    id: "HOSPITALIZATION_SURGERY",
    title: "Hospitalizacion y cirugia",
    description:
      "Factura con la descripción de los gastos pagados, fotocopia de la hospitalización y/o nota operatoria en caso de cirugía.",
  },
  {
    id: "DIAGNOSTIC_AIDS",
    title: "Ayudas diagnosticas",
    description:
      "Para estudios que permite al médico tratante confirmar un diagnóstico y/o realizar acciones terapéuticas. Factura original y fotocopia de la orden médica. El auxilio solo se concede por órdenes médicas del mismo diagnóstico.",
  },
  {
    id: "ORTHOPEDIC_IMPLEMENTS",
    title: "Por implementos ortopedicos",
    description:
      "Factura y fotocopia de epicrisis u orden médica. Se incluyen botas ortopédicas, por las cuales se otorga auxilio una vez al año. También se incluyen sillas de ruedas, muletas, audífonos por pérdida de audición o camas hospitalarias.",
  },
  {
    id: "INITIAL_DISABILITY",
    title: "Incapacidad inicial",
    description:
      "Incapacidad medica del asociado, entendida como imposibilidad en un periodo determinado, para realizar cualquier labor o actividad. *** IMPORTANTE *** En el valor de la solicitud debe ingresar los dias de incapacidad.",
  },
  {
    id: "DEATH_ASSOCIATE",
    title: "Fallecimiento del asociado",
    description:
      "Se reconocera a los beneficiarios inscritos en nuestra base social. Fotocopia del registro o certificado de defuncion en un plazo no mayor a 30 dias calendario de ocurrido el deceso. Aplica solo para los asociados que tienen el servicio exequial con fondecom.",
  },
  {
    id: "ADDICTION_PROBLEMS",
    title: "Problemas de adiccion",
    description:
      "Factura original o copia del contrato de prestación del servicio y certificación de la institución que atiende al paciente, debidamente avalada.",
  },
  {
    id: "PARTIAL_DAMAGE_HOUSE",
    title: "Daño parcial de vivienda",
    description:
      "Certificado de tradición actualizado del inmueble a nombre del asociado. Factura cancelada por la compra materiales y/o cuenta de cobro de la mano de obra de la reparación de los daños, expedidas por una persona natural con RUT o entidad legalmente constituida. Soportar con registro fotográfico a color y video.",
  },
  {
    id: "TOTAL_HOUSING_DAMAGE",
    title: "Daño total de vivienda",
    description:
      "Certificado de tradición actualizado del inmueble a nombre del asociado. Factura cancelada por la compra materiales y/o cuenta de cobro de la mano de obra de la reparación de los daños, expedidas por una persona natural con RUT o entidad legalmente constituida. Soportar con registro fotográfico a color y video.",
  },
  {
    id: "DEATH_BENEFICIARY",
    title: "Fallecimiento de beneficiario",
    description:
      "Fotocopia del registro o certificado de defunción, en un plazo no mayor a 30 días calendario de ocurrido el deceso. Aplica solo para los asociados que tienen el servicio exequial con fondecom.",
  },
  {
    id: "EXHUMATION_OSSUARY_ASSISTANCE",
    title: "Auxilio por exhumacion u osario",
    description:
      "Factura original a nombre del asociado o certificación que lo vincule con el pago de la misma, o copia del contrato suscrito con el parque cementerio. Aplica solo para los asociados que tienen el servicio exequial con fondecom.",
  },
  {
    id: "ORTHOPEDIC_BOOTS",
    title: "Botas ortopedicas",
    description:
      "Se otorga auxilio por botas ortopedicas una vez al año. Factura original y fotocopia de historia clínica o epicrisis u orden médica.",
  },
  {
    id: "MEDICATIONS",
    title: "Medicamentos",
    description:
      "Factura (s) con fecha no superior a 30 días de generada y fotocopia de la formula con diagnóstico y con fecha de emisión no superior a 3 meses. Máximo tres (3) solicitudes al año por esta línea de auxilio. El auxilio solo se concede por formulas del mismo diagnóstico y del mismo día.",
  },
  {
    id: "MEDICAL_TRANSFERS",
    title: "Traslados medicos",
    description:
      "Factura o cuenta de cobro original del transporte con RUT del prestador del servicio y soporte de asistencia a la terapia.",
  },
  {
    id: "TEMPORARY_CARE_ACCOMPANIMENT",
    title: "Acompañamiento asistencial temporal",
    description:
      "Fotocopia de la incapacidad suscrita por el médico tratante, adscrito a la EPS o ARL a través de la cual el asociado reciba el servicio obligatorio de salud. Fotocopia de la historia clínica o epicrisis en donde se registre la eventualidad. Este auxilio no aplica para los asociados pensionados.",
  },
  {
    id: "LENSES",
    title: "Lentes",
    description:
      "Orden médica y factura de compra u orden de pedido con sello de cancelado a nombre del asociado discriminando el valor exclusivo de los lentes. Se entrega una vez cada dos años para el asociado. El auxilio no aplica para montura.",
  },
  {
    id: "INCAPACITY_180_DAYS",
    title: "Incapacidad superior a 180 dias",
    description:
      "Fotocopia de la incapacidad suscrita por el médico tratante, adscrito a la EPS o ARL a través de la cual el asociado reciba el servicio obligatorio de salud. Fotocopia de la historia clínica o epicrisis en donde se registre la incapacidad. No aplica a quienes estén pensionados.",
  },
  {
    id: "AIDS_SPORTS_ARTISTIC_ACTIVITIES",
    title: "Auxilios para actividades deportivas o artisticas",
    description:
      "El asociado debe tener una antiguedad igual o superior a un año y debe haber realizado el curso de economia solidaria ofrecido por fondecom.",
  },
  {
    id: "DISABILITY_EXTENSION",
    title: "Incapacidad prorroga",
    description:
      "Fotocopia de la prórroga de incapacidad suscrita por el médico tratante, adscrito a la EPS o ARL a través de la cual el asociado reciba el servicio obligatorio de salud. Fotocopia de la historia clínica o epicrisis en donde se registre la eventualidad. Este auxilio no aplica para los asociados pensionados.",
  },
  {
    id: "DAMAGE_BASIC_HOUSEHOLD",
    title: "Daño de enseres basicos",
    description:
      "Certificado de tradición actualizado del inmueble a nombre del asociado. Factura cancelada por la compra materiales y/o cuenta de cobro de la mano de obra de la reparación de los daños, expedidas por una persona natural con RUT o entidad legalmente constituida. Soportar con registro fotográfico a color y video.",
  },
];

export { aidsRequestMock };
