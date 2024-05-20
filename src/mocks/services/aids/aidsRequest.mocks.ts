import { aidRequestTypeDM } from "src/model/domains/services/aids/aidRequestTypeDM";
import { IAid } from "src/model/entity/service";

const aidsRequestMock: IAid[] = [
  {
    id: aidRequestTypeDM.HOSPITALIZATION_SURGERY.id,
    title: "Hospitalización y cirugía",
    description:
      "Factura con la descripción de los gastos pagados, fotocopia de la hospitalización y/o nota operatoria en caso de cirugía.",
    validations: {
      requiredDocuments: [
        {
          id: "original_invoice",
          label: "Factura original",
          value: "pending",
          isRequired: true,
        },
        {
          id: "medical_prescription_copy",
          label: "Fotocopia de la fórmula médica",
          value: "pending",
        },
      ],
      regulations: [
        {
          id: "request_value_per_formula",
          label:
            "Valor de la solicitud igual o superior al 15% de 1 SMMLV por fórmula",
          value: "pending",
          isRequired: true,
        },
        {
          id: "have_savings_in_sight",
          label: "Poseer Ahorro a la Vista",
          value: "pending",
        },
        {
          id: "minimum_associate_seniority",
          label: "Antigüedad mínima como asociado",
          value: "pending",
          isRequired: true,
        },
        {
          id: "be_up_to_date_on_obligations",
          label: "Estar al día en sus obligaciones",
          value: "pending",
        },
        {
          id: "available_assistance_quota",
          label: "Cupo disponible auxilios",
          value: "pending",
          isRequired: true,
        },
        {
          id: "beneficiary_validity_by_age",
          label: "Validez del beneficiario por edad",
          value: "pending",
        },
      ],
    },
  },
  {
    id: aidRequestTypeDM.DIAGNOSTIC_AIDS.id,
    title: "Ayudas diagnósticas",
    description:
      "Para estudios que permite al médico tratante confirmar un diagnóstico y/o realizar acciones terapéuticas. Factura original y fotocopia de la orden médica. El auxilio solo se concede por órdenes médicas del mismo diagnóstico.",
    validations: {
      requiredDocuments: [
        {
          id: "original_invoice",
          label: "Factura original",
          value: "pending",
          isRequired: true,
        },
        {
          id: "medical_order_copy",
          label: "Fotocopia de la orden médica",
          value: "pending",
        },
      ],
      regulations: [
        {
          id: "request_value_per_formula",
          label:
            "Valor de la solicitud igual o superior al 15% de 1 SMMLV por fórmula",
          value: "pending",
          isRequired: true,
        },
        {
          id: "have_savings_in_sight",
          label: "Poseer Ahorro a la Vista",
          value: "pending",
        },
        {
          id: "minimum_associate_seniority",
          label: "Antigüedad mínima como asociado",
          value: "pending",
          isRequired: true,
        },
        {
          id: "be_up_to_date_on_obligations",
          label: "Estar al día en sus obligaciones",
          value: "pending",
        },
        {
          id: "available_assistance_quota",
          label: "Cupo disponible auxilios",
          value: "pending",
          isRequired: true,
        },
        {
          id: "beneficiary_validity_by_age",
          label: "Validez del beneficiario por edad",
          value: "pending",
        },
      ],
    },
  },
  {
    id: aidRequestTypeDM.ORTHOPEDIC_IMPLEMENTS.id,
    title: "Por implementos ortopédicos",
    description:
      "Factura y fotocopia de epicrisis u orden médica. Se incluyen botas ortopédicas, por las cuales se otorga auxilio una vez al año. También se incluyen sillas de ruedas, muletas, audífonos por pérdida de audición o camas hospitalarias.",
    validations: {
      requiredDocuments: [
        {
          id: "original_invoice",
          label: "Factura original",
          value: "pending",
          isRequired: true,
        },
        {
          id: "medical_history_copy",
          label: "Fotocopia de la historia clínica",
          value: "pending",
        },
      ],
      regulations: [
        {
          id: "have_savings_in_sight",
          label: "Poseer Ahorro a la Vista",
          value: "pending",
        },
        {
          id: "minimum_associate_seniority",
          label: "Antigüedad mínima como asociado",
          value: "pending",
          isRequired: true,
        },
        {
          id: "be_up_to_date_on_obligations",
          label: "Estar al día en sus obligaciones",
          value: "pending",
        },
        {
          id: "available_assistance_quota",
          label: "Cupo disponible auxilios",
          value: "pending",
          isRequired: true,
        },
        {
          id: "beneficiary_validity_by_age",
          label: "Validez del beneficiario por edad",
          value: "pending",
        },
      ],
    },
  },
  {
    id: aidRequestTypeDM.INITIAL_DISABILITY.id,
    title: "Incapacidad inicial",
    description:
      "Incapacidad médica del asociado, entendida como imposibilidad en un periodo determinado, para realizar cualquier labor o actividad.",
    validations: {
      requiredDocuments: [
        {
          id: "disability_copy",
          label: "Fotocopia de la incapacidad",
          value: "pending",
          isRequired: true,
        },
        {
          id: "medical_history_copy",
          label: "Fotocopia de la historia clínica",
          value: "pending",
        },
      ],
      regulations: [
        {
          id: "disability_days_allowed",
          label: "La incapacidad cumple con los días permitidos",
          value: "pending",
          isRequired: true,
        },
        {
          id: "have_savings_in_sight",
          label: "Poseer Ahorro a la Vista",
          value: "pending",
        },
        {
          id: "minimum_associate_seniority",
          label: "Antigüedad mínima como asociado",
          value: "pending",
          isRequired: true,
        },
        {
          id: "be_up_to_date_on_obligations",
          label: "Estar al día en sus obligaciones",
          value: "pending",
        },
        {
          id: "available_assistance_quota",
          label: "Cupo disponible auxilios",
          value: "pending",
          isRequired: true,
        },
      ],
    },
  },
  {
    id: aidRequestTypeDM.DEATH_ASSOCIATE.id,
    title: "Fallecimiento del asociado",
    description:
      "Se reconocerá a los beneficiarios inscritos en nuestra base social. Fotocopia del registro o certificado de defunción en un plazo no mayor a 30 días calendario de ocurrido el deceso. Aplica solo para los asociados que tienen el servicio exequial con fondecom.",
    validations: {
      requiredDocuments: [
        {
          id: "death_certificate_copy",
          label: "Fotocopia del certificado de defunción",
          value: "pending",
          isRequired: true,
        },
      ],
      regulations: [
        {
          id: "have_savings_in_sight",
          label: "Poseer Ahorro a la Vista",
          value: "pending",
        },
        {
          id: "mandatory_funeral_service",
          label: "Tiene el servicio exequial obligatorio",
          value: "pending",
          isRequired: true,
        },
        {
          id: "minimum_associate_seniority",
          label: "Antigüedad mínima como asociado",
          value: "pending",
          isRequired: true,
        },
        {
          id: "be_up_to_date_on_obligations",
          label: "Estar al día en sus obligaciones",
          value: "pending",
        },
        {
          id: "available_assistance_quota",
          label: "Cupo disponible auxilios",
          value: "pending",
          isRequired: true,
        },
        {
          id: "not_received_assistance_current_month",
          label: "No haber recibido el auxilio en el mes actual",
          value: "pending",
          isRequired: true,
        },
      ],
    },
  },
  {
    id: aidRequestTypeDM.ADDICTION_PROBLEMS.id,
    title: "Problemas de adicción",
    description:
      "Factura original o copia del contrato de prestación del servicio y certificación de la institución que atiende al paciente, debidamente avalada.",
    validations: {
      requiredDocuments: [
        {
          id: "original_invoice",
          label: "Factura original",
          value: "pending",
          isRequired: true,
        },
        {
          id: "medical_history_copy",
          label: "Fotocopia de la historia clínica",
          value: "pending",
        },
      ],
      regulations: [
        {
          id: "have_savings_in_sight",
          label: "Poseer Ahorro a la Vista",
          value: "pending",
        },
        {
          id: "minimum_associate_seniority",
          label: "Antigüedad mínima como asociado",
          value: "pending",
          isRequired: true,
        },
        {
          id: "be_up_to_date_on_obligations",
          label: "Estar al día en sus obligaciones",
          value: "pending",
        },
        {
          id: "available_assistance_quota",
          label: "Cupo disponible auxilios",
          value: "pending",
          isRequired: true,
        },
        {
          id: "beneficiary_validity_by_age",
          label: "Validez del beneficiario por edad",
          value: "pending",
        },
      ],
    },
  },
  {
    id: aidRequestTypeDM.PARTIAL_DAMAGE_HOUSE.id,
    title: "Daño parcial de vivienda",
    description:
      "Certificado de tradición actualizado del inmueble a nombre del asociado. Factura cancelada por la compra de materiales y/o cuenta de cobro de la mano de obra de la reparación de los daños, expedidas por una persona natural con RUT o entidad legalmente constituida. Soportar con registro fotográfico a color y video.",
    validations: {
      requiredDocuments: [
        {
          id: "calamity_proof_documents",
          label: "Documentos que comprueben la calamidad",
          value: "pending",
          isRequired: true,
        },
        {
          id: "associate_title_deed_certificate",
          label: "Certificado de tradición a nombre del asociado",
          value: "pending",
        },
        {
          id: "calamity_photographic_record",
          label: "Registro fotográfico de la calamidad",
          value: "pending",
          isRequired: true,
        },
        {
          id: "paid_invoice_for_materials_purchase_and_or_workmanship_billing",
          label:
            "Factura cancelada por la compra de materiales y/o cuenta de cobro de la mano de obra",
          value: "pending",
        },
      ],
      regulations: [
        {
          id: "have_savings_in_sight",
          label: "Poseer Ahorro a la Vista",
          value: "pending",
        },
        {
          id: "minimum_associate_seniority",
          label: "Antigüedad mínima como asociado",
          value: "pending",
          isRequired: true,
        },
        {
          id: "available_assistance_quota",
          label: "Cupo disponible auxilios",
          value: "pending",
          isRequired: true,
        },
      ],
    },
  },
  {
    id: aidRequestTypeDM.TOTAL_HOUSING_DAMAGE.id,
    title: "Daño total de vivienda",
    description:
      "Certificado de tradición actualizado del inmueble a nombre del asociado. Factura cancelada por la compra de materiales y/o cuenta de cobro de la mano de obra de la reparación de los daños, expedidas por una persona natural con RUT o entidad legalmente constituida. Soportar con registro fotográfico a color y video.",
    validations: {
      requiredDocuments: [
        {
          id: "calamity_proof_documents",
          label: "Documentos que comprueben la calamidad",
          value: "pending",
          isRequired: true,
        },
        {
          id: "associate_title_deed_certificate",
          label: "Certificado de tradición a nombre del asociado",
          value: "pending",
        },
        {
          id: "calamity_photographic_record",
          label: "Registro fotográfico de la calamidad",
          value: "pending",
          isRequired: true,
        },
        {
          id: "paid_invoice_for_materials_purchase_and_or_workmanship_billing",
          label:
            "Factura cancelada por la compra de materiales y/o cuenta de cobro de la mano de obra",
          value: "pending",
        },
      ],
      regulations: [
        {
          id: "have_savings_in_sight",
          label: "Poseer Ahorro a la Vista",
          value: "pending",
        },
        {
          id: "minimum_associate_seniority",
          label: "Antigüedad mínima como asociado",
          value: "pending",
          isRequired: true,
        },
        {
          id: "available_assistance_quota",
          label: "Cupo disponible auxilios",
          value: "pending",
          isRequired: true,
        },
      ],
    },
  },
  {
    id: aidRequestTypeDM.DEATH_BENEFICIARY.id,
    title: "Fallecimiento de beneficiario",
    description:
      "Fotocopia del registro o certificado de defunción, en un plazo no mayor a 30 días calendario de ocurrido el deceso. Aplica solo para los asociados que tienen el servicio exequial con Fondecom.",
    validations: {
      requiredDocuments: [
        {
          id: "death_certificate_copy",
          label: "Fotocopia del certificado de defunción",
          value: "pending",
          isRequired: true,
        },
      ],
      regulations: [
        {
          id: "have_savings_in_sight",
          label: "Poseer Ahorro a la Vista",
          value: "pending",
        },
        {
          id: "mandatory_funeral_service",
          label: "Tiene el servicio exequial obligatorio",
          value: "pending",
          isRequired: true,
        },
        {
          id: "minimum_associate_seniority",
          label: "Antigüedad mínima como asociado",
          value: "pending",
          isRequired: true,
        },
        {
          id: "be_up_to_date_on_obligations",
          label: "Estar al día en sus obligaciones",
          value: "pending",
        },
        {
          id: "available_assistance_quota",
          label: "Cupo disponible auxilios",
          value: "pending",
          isRequired: true,
        },
        {
          id: "beneficiary_validity_by_age",
          label: "Validez del beneficiario por edad",
          value: "pending",
        },
      ],
    },
  },
  {
    id: aidRequestTypeDM.EXHUMATION_OSSUARY_ASSISTANCE.id,
    title: "Auxilio por exhumación u osario",
    description:
      "Factura original a nombre del asociado o certificación que lo vincule con el pago de la misma, o copia del contrato suscrito con el parque cementerio. Aplica solo para los asociados que tienen el servicio exequial con Fondecom.",
    validations: {
      requiredDocuments: [
        {
          id: "original_invoice",
          label: "Factura original",
          value: "pending",
          isRequired: true,
        },
      ],
      regulations: [
        {
          id: "have_savings_in_sight",
          label: "Poseer Ahorro a la Vista",
          value: "pending",
        },
        {
          id: "mandatory_funeral_service",
          label: "Tiene el servicio exequial obligatorio",
          value: "pending",
          isRequired: true,
        },
        {
          id: "minimum_associate_seniority",
          label: "Antigüedad mínima como asociado",
          value: "pending",
          isRequired: true,
        },
        {
          id: "be_up_to_date_on_obligations",
          label: "Estar al día en sus obligaciones",
          value: "pending",
        },
        {
          id: "available_assistance_quota",
          label: "Cupo disponible auxilios",
          value: "pending",
          isRequired: true,
        },
        {
          id: "beneficiary_validity_by_age",
          label: "Validez del beneficiario por edad",
          value: "pending",
        },
      ],
    },
  },
  {
    id: aidRequestTypeDM.ORTHOPEDIC_BOOTS.id,
    title: "Botas ortopédicas",
    description:
      "Se otorga auxilio por botas ortopédicas una vez al año. Factura original y fotocopia de historia clínica o epicrisis u orden médica.",
    validations: {
      requiredDocuments: [
        {
          id: "original_invoice",
          label: "Factura original",
          value: "pending",
          isRequired: true,
        },
        {
          id: "medical_history_copy",
          label: "Fotocopia de la historia clínica",
          value: "pending",
        },
      ],
      regulations: [
        {
          id: "have_savings_in_sight",
          label: "Poseer Ahorro a la Vista",
          value: "pending",
        },
        {
          id: "minimum_associate_seniority",
          label: "Antigüedad mínima como asociado",
          value: "pending",
          isRequired: true,
        },
        {
          id: "be_up_to_date_on_obligations",
          label: "Estar al día en sus obligaciones",
          value: "pending",
        },
        {
          id: "available_assistance_quota",
          label: "Cupo disponible auxilios",
          value: "pending",
          isRequired: true,
        },
        {
          id: "beneficiary_validity_by_age",
          label: "Validez del beneficiario por edad",
          value: "pending",
        },
      ],
    },
  },
  {
    id: aidRequestTypeDM.MEDICATIONS.id,
    title: "Medicamentos",
    description:
      "Factura(s) con fecha no superior a 30 días de generada y fotocopia de la fórmula con diagnóstico y con fecha de emisión no superior a 3 meses. Máximo tres (3) solicitudes al año por esta línea de auxilio. El auxilio solo se concede por fórmulas del mismo diagnóstico y del mismo día.",
    validations: {
      requiredDocuments: [
        {
          id: "original_invoice",
          label: "Factura original",
          value: "pending",
          isRequired: true,
        },
        {
          id: "medical_prescription_copy",
          label: "Fotocopia de la fórmula médica",
          value: "pending",
        },
      ],
      regulations: [
        {
          id: "request_value_per_formula",
          label:
            "Valor de la solicitud igual o superior al 15% de 1 SMMLV por fórmula",
          value: "pending",
          isRequired: true,
        },
        {
          id: "have_savings_in_sight",
          label: "Poseer Ahorro a la Vista",
          value: "pending",
        },
        {
          id: "minimum_associate_seniority",
          label: "Antigüedad mínima como asociado",
          value: "pending",
          isRequired: true,
        },
        {
          id: "be_up_to_date_on_obligations",
          label: "Estar al día en sus obligaciones",
          value: "pending",
        },
        {
          id: "available_assistance_quota",
          label: "Cupo disponible auxilios",
          value: "pending",
          isRequired: true,
        },
        {
          id: "beneficiary_validity_by_age",
          label: "Validez del beneficiario por edad",
          value: "pending",
        },
      ],
    },
  },
  {
    id: aidRequestTypeDM.MEDICAL_TRANSFERS.id,
    title: "Traslados médicos",
    description:
      "Factura o cuenta de cobro original del transporte con RUT del prestador del servicio y soporte de asistencia a la terapia.",
    validations: {
      requiredDocuments: [
        {
          id: "original_invoice",
          label: "Factura original",
          value: "pending",
          isRequired: true,
        },
        {
          id: "therapy_attendance_copy",
          label: "Fotocopia de asistencia a la terapia",
          value: "pending",
        },
      ],
      regulations: [
        {
          id: "minimum_associate_seniority",
          label: "Antigüedad mínima como asociado",
          value: "pending",
          isRequired: true,
        },
        {
          id: "be_up_to_date_on_obligations",
          label: "Estar al día en sus obligaciones",
          value: "pending",
        },
        {
          id: "available_assistance_quota",
          label: "Cupo disponible auxilios",
          value: "pending",
          isRequired: true,
        },
        {
          id: "beneficiary_validity_by_age",
          label: "Validez del beneficiario por edad",
          value: "pending",
        },
      ],
    },
  },
  {
    id: aidRequestTypeDM.TEMPORARY_CARE_ACCOMPANIMENT.id,
    title: "Acompañamiento asistencial temporal",
    description:
      "Fotocopia de la incapacidad suscrita por el médico tratante, adscrito a la EPS o ARL a través de la cual el asociado reciba el servicio obligatorio de salud. Fotocopia de la historia clínica o epicrisis en donde se registre la eventualidad. Este auxilio no aplica para los asociados pensionados.",
    validations: {
      requiredDocuments: [
        {
          id: "original_invoice",
          label: "Factura original",
          value: "pending",
          isRequired: true,
        },
        {
          id: "medical_history_copy",
          label: "Fotocopia de la historia clínica",
          value: "pending",
        },
      ],
      regulations: [
        {
          id: "minimum_associate_seniority",
          label: "Antigüedad mínima como asociado",
          value: "pending",
          isRequired: true,
        },
        {
          id: "be_up_to_date_on_obligations",
          label: "Estar al día en sus obligaciones",
          value: "pending",
        },
        {
          id: "available_assistance_quota",
          label: "Cupo disponible auxilios",
          value: "pending",
          isRequired: true,
        },
        {
          id: "beneficiary_validity_by_age",
          label: "Validez del beneficiario por edad",
          value: "pending",
        },
      ],
    },
  },
  {
    id: aidRequestTypeDM.LENSES.id,
    title: "Lentes",
    description:
      "Orden médica y factura de compra u orden de pedido con sello de cancelado a nombre del asociado discriminando el valor exclusivo de los lentes. Se entrega una vez cada dos años para el asociado. El auxilio no aplica para montura.",
    validations: {
      requiredDocuments: [
        {
          id: "original_invoice",
          label: "Factura original",
          value: "pending",
          isRequired: true,
        },
        {
          id: "medical_order_copy",
          label: "Fotocopia de la orden médica",
          value: "pending",
        },
      ],
      regulations: [
        {
          id: "available_assistance_quota",
          label: "Cupo disponible auxilios",
          value: "pending",
          isRequired: true,
        },
        {
          id: "not_received_assistance_current_or_previous_year",
          label: "No haber recibido el auxilio en el año actual o anterior",
          value: "pending",
        },
      ],
    },
  },
  {
    id: aidRequestTypeDM.INCAPACITY_180_DAYS.id,
    title: "Incapacidad superior a 180 días",
    description:
      "Fotocopia de la incapacidad suscrita por el médico tratante, adscrito a la EPS o ARL a través de la cual el asociado reciba el servicio obligatorio de salud. Fotocopia de la historia clínica o epicrisis en donde se registre la incapacidad. No aplica a quienes estén pensionados.",
    validations: {
      requiredDocuments: [
        {
          id: "medical_history_copy",
          label: "Fotocopia de la historia clínica",
          value: "pending",
        },
        {
          id: "eps_or_arl_disability_copy",
          label: "Fotocopia de la incapacidad por la EPS o ARL",
          value: "pending",
        },
      ],
      regulations: [
        {
          id: "available_assistance_quota",
          label: "Cupo disponible auxilios",
          value: "pending",
          isRequired: true,
        },
      ],
    },
  },
  {
    id: aidRequestTypeDM.AIDS_SPORTS_ARTISTIC_ACTIVITIES.id,
    title: "Auxilios para actividades deportivas o artísticas",
    description:
      "El asociado debe tener una antigüedad igual o superior a un año y debe haber realizado el curso de economía solidaria ofrecido por Fondecom.",
    validations: {
      requiredDocuments: [
        {
          id: "invoice_or_payment_receipt",
          label: "Factura o recibo de pago",
          value: "pending",
          isRequired: true,
        },
      ],
      regulations: [
        {
          id: "minimum_associate_seniority",
          label: "Antigüedad mínima como asociado",
          value: "pending",
          isRequired: true,
        },
        {
          id: "be_up_to_date_on_obligations",
          label: "Estar al día en sus obligaciones",
          value: "pending",
        },
        {
          id: "available_assistance_quota",
          label: "Cupo disponible auxilios",
          value: "pending",
          isRequired: true,
        },
        {
          id: "beneficiary_validity_by_age",
          label: "Validez del beneficiario por edad",
          value: "pending",
        },
        {
          id: "not_received_assistance_current_month",
          label: "No haber recibido el auxilio en el mes actual",
          value: "pending",
          isRequired: true,
        },
      ],
    },
  },
  {
    id: aidRequestTypeDM.DISABILITY_EXTENSION.id,
    title: "Incapacidad prórroga",
    description:
      "Fotocopia de la prórroga de incapacidad suscrita por el médico tratante, adscrito a la EPS o ARL a través de la cual el asociado reciba el servicio obligatorio de salud. Fotocopia de la historia clínica o epicrisis en donde se registre la eventualidad. Este auxilio no aplica para los asociados pensionados.",
    validations: {
      requiredDocuments: [
        {
          id: "disability_copy",
          label: "Fotocopia de la incapacidad",
          value: "pending",
          isRequired: true,
        },
        {
          id: "medical_history_copy",
          label: "Fotocopia de la historia clínica",
          value: "pending",
        },
      ],
      regulations: [
        {
          id: "have_savings_in_sight",
          label: "Poseer Ahorro a la Vista",
          value: "pending",
        },
        {
          id: "minimum_associate_seniority",
          label: "Antigüedad mínima como asociado",
          value: "pending",
          isRequired: true,
        },
        {
          id: "be_up_to_date_on_obligations",
          label: "Estar al día en sus obligaciones",
          value: "pending",
        },
        {
          id: "disability_days_allowed",
          label: "La incapacidad cumple con los días permitidos",
          value: "pending",
        },
        {
          id: "available_assistance_quota",
          label: "Cupo disponible auxilios",
          value: "pending",
          isRequired: true,
        },
        {
          id: "beneficiary_validity_by_age",
          label: "Validez del beneficiario por edad",
          value: "pending",
        },
      ],
    },
  },
  {
    id: aidRequestTypeDM.PARTIAL_DAMAGE_HOUSE.id,
    title: "Daño de enseres básicos",
    description:
      "Certificado de tradición actualizado del inmueble a nombre del asociado. Factura cancelada por la compra de materiales y/o cuenta de cobro de la mano de obra de la reparación de los daños, expedidas por una persona natural con RUT o entidad legalmente constituida. Soportar con registro fotográfico a color y video.",
    validations: {
      requiredDocuments: [
        {
          id: "calamity_proof_documents",
          label: "Documentos que comprueben la calamidad",
          value: "pending",
          isRequired: true,
        },
        {
          id: "competent_entity_issued_catastrophe_certificate",
          label:
            "Certificado de la catástrofe expedida por una entidad competente",
          value: "pending",
        },
        {
          id: "invoice_from_legally_established_entity",
          label:
            "Factura cancelada y expedida por una entidad legalmente constituida",
          value: "pending",
          isRequired: true,
        },
        {
          id: "photographic_record_of_goods_damage",
          label: "Registro fotográfico del daño de los enseres",
          value: "pending",
        },
      ],
      regulations: [
        {
          id: "have_savings_in_sight",
          label: "Poseer Ahorro a la Vista",
          value: "pending",
        },
        {
          id: "minimum_associate_seniority",
          label: "Antigüedad mínima como asociado",
          value: "pending",
          isRequired: true,
        },
        {
          id: "available_assistance_quota",
          label: "Cupo disponible auxilios",
          value: "pending",
          isRequired: true,
        },
      ],
    },
  },
];

export { aidsRequestMock };
