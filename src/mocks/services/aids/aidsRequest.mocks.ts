import { aidRequestTypeDM } from "src/model/domains/services/aids/aidRequestTypeDM";
import { IAid } from "src/model/entity/service";

const aidsRequestMock: IAid[] = [
  {
    id: aidRequestTypeDM.HOSPITALIZATION_SURGERY.id,
    title: "Hospitalizacion y cirugia",
    description:
      "Factura con la descripción de los gastos pagados, fotocopia de la hospitalización y/o nota operatoria en caso de cirugía.",
  },
  {
    id: aidRequestTypeDM.DIAGNOSTIC_AIDS.id,
    title: "Ayudas diagnosticas",
    description:
      "Para estudios que permite al médico tratante confirmar un diagnóstico y/o realizar acciones terapéuticas. Factura original y fotocopia de la orden médica. El auxilio solo se concede por órdenes médicas del mismo diagnóstico.",
  },
  {
    id: aidRequestTypeDM.ORTHOPEDIC_IMPLEMENTS.id,
    title: "Por implementos ortopedicos",
    description:
      "Factura y fotocopia de epicrisis u orden médica. Se incluyen botas ortopédicas, por las cuales se otorga auxilio una vez al año. También se incluyen sillas de ruedas, muletas, audífonos por pérdida de audición o camas hospitalarias.",
  },
  {
    id: aidRequestTypeDM.INITIAL_DISABILITY.id,
    title: "Incapacidad inicial",
    description:
      "Incapacidad medica del asociado, entendida como imposibilidad en un periodo determinado, para realizar cualquier labor o actividad. *** IMPORTANTE *** En el valor de la solicitud debe ingresar los dias de incapacidad.",
  },
  {
    id: aidRequestTypeDM.DEATH_ASSOCIATE.id,
    title: "Fallecimiento del asociado",
    description:
      "Se reconocera a los beneficiarios inscritos en nuestra base social. Fotocopia del registro o certificado de defuncion en un plazo no mayor a 30 dias calendario de ocurrido el deceso. Aplica solo para los asociados que tienen el servicio exequial con fondecom.",
  },
  {
    id: aidRequestTypeDM.ADDICTION_PROBLEMS.id,
    title: "Problemas de adiccion",
    description:
      "Factura original o copia del contrato de prestación del servicio y certificación de la institución que atiende al paciente, debidamente avalada.",
  },
  {
    id: aidRequestTypeDM.PARTIAL_DAMAGE_HOUSE.id,
    title: "Daño parcial de vivienda",
    description:
      "Certificado de tradición actualizado del inmueble a nombre del asociado. Factura cancelada por la compra materiales y/o cuenta de cobro de la mano de obra de la reparación de los daños, expedidas por una persona natural con RUT o entidad legalmente constituida. Soportar con registro fotográfico a color y video.",
  },
  {
    id: aidRequestTypeDM.TOTAL_HOUSING_DAMAGE.id,
    title: "Daño total de vivienda",
    description:
      "Certificado de tradición actualizado del inmueble a nombre del asociado. Factura cancelada por la compra materiales y/o cuenta de cobro de la mano de obra de la reparación de los daños, expedidas por una persona natural con RUT o entidad legalmente constituida. Soportar con registro fotográfico a color y video.",
  },
  {
    id: aidRequestTypeDM.DEATH_BENEFICIARY.id,
    title: "Fallecimiento de beneficiario",
    description:
      "Fotocopia del registro o certificado de defunción, en un plazo no mayor a 30 días calendario de ocurrido el deceso. Aplica solo para los asociados que tienen el servicio exequial con fondecom.",
  },
  {
    id: aidRequestTypeDM.EXHUMATION_OSSUARY_ASSISTANCE.id,
    title: "Auxilio por exhumacion u osario",
    description:
      "Factura original a nombre del asociado o certificación que lo vincule con el pago de la misma, o copia del contrato suscrito con el parque cementerio. Aplica solo para los asociados que tienen el servicio exequial con fondecom.",
  },
  {
    id: aidRequestTypeDM.ORTHOPEDIC_BOOTS.id,
    title: "Botas ortopedicas",
    description:
      "Se otorga auxilio por botas ortopedicas una vez al año. Factura original y fotocopia de historia clínica o epicrisis u orden médica.",
  },
  {
    id: aidRequestTypeDM.MEDICATIONS.id,
    title: "Medicamentos",
    description:
      "Factura (s) con fecha no superior a 30 días de generada y fotocopia de la formula con diagnóstico y con fecha de emisión no superior a 3 meses. Máximo tres (3) solicitudes al año por esta línea de auxilio. El auxilio solo se concede por formulas del mismo diagnóstico y del mismo día.",
  },
  {
    id: aidRequestTypeDM.MEDICAL_TRANSFERS.id,
    title: "Traslados medicos",
    description:
      "Factura o cuenta de cobro original del transporte con RUT del prestador del servicio y soporte de asistencia a la terapia.",
  },
  {
    id: aidRequestTypeDM.TEMPORARY_CARE_ACCOMPANIMENT.id,
    title: "Acompañamiento asistencial temporal",
    description:
      "Fotocopia de la incapacidad suscrita por el médico tratante, adscrito a la EPS o ARL a través de la cual el asociado reciba el servicio obligatorio de salud. Fotocopia de la historia clínica o epicrisis en donde se registre la eventualidad. Este auxilio no aplica para los asociados pensionados.",
  },
  {
    id: aidRequestTypeDM.LENSES.id,
    title: "Lentes",
    description:
      "Orden médica y factura de compra u orden de pedido con sello de cancelado a nombre del asociado discriminando el valor exclusivo de los lentes. Se entrega una vez cada dos años para el asociado. El auxilio no aplica para montura.",
  },
  {
    id: aidRequestTypeDM.INCAPACITY_180_DAYS.id,
    title: "Incapacidad superior a 180 dias",
    description:
      "Fotocopia de la incapacidad suscrita por el médico tratante, adscrito a la EPS o ARL a través de la cual el asociado reciba el servicio obligatorio de salud. Fotocopia de la historia clínica o epicrisis en donde se registre la incapacidad. No aplica a quienes estén pensionados.",
  },
  {
    id: aidRequestTypeDM.AIDS_SPORTS_ARTISTIC_ACTIVITIES.id,
    title: "Auxilios para actividades deportivas o artisticas",
    description:
      "El asociado debe tener una antiguedad igual o superior a un año y debe haber realizado el curso de economia solidaria ofrecido por fondecom.",
  },
  {
    id: aidRequestTypeDM.DISABILITY_EXTENSION.id,
    title: "Incapacidad prorroga",
    description:
      "Fotocopia de la prórroga de incapacidad suscrita por el médico tratante, adscrito a la EPS o ARL a través de la cual el asociado reciba el servicio obligatorio de salud. Fotocopia de la historia clínica o epicrisis en donde se registre la eventualidad. Este auxilio no aplica para los asociados pensionados.",
  },
  {
    id: aidRequestTypeDM.PARTIAL_DAMAGE_HOUSE.id,
    title: "Daño de enseres basicos",
    description:
      "Certificado de tradición actualizado del inmueble a nombre del asociado. Factura cancelada por la compra materiales y/o cuenta de cobro de la mano de obra de la reparación de los daños, expedidas por una persona natural con RUT o entidad legalmente constituida. Soportar con registro fotográfico a color y video.",
  },
];

export { aidsRequestMock };
