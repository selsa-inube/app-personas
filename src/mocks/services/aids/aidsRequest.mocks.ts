import { aidRequestTypeDM } from "src/model/domains/services/aids/aidRequestTypeDM";
import { IAid } from "src/model/entity/service";

const aidsRequestMock: IAid[] = [
  {
    id: aidRequestTypeDM.HOSPITALIZATION_SURGERY.id,
    title: "Hospitalización y cirugía",
  },
  {
    id: aidRequestTypeDM.DIAGNOSTIC_AIDS.id,
    title: "Ayudas diagnósticas",
  },
  {
    id: aidRequestTypeDM.ORTHOPEDIC_IMPLEMENTS.id,
    title: "Por implementos ortopédicos",
  },
  {
    id: aidRequestTypeDM.INITIAL_DISABILITY.id,
    title: "Incapacidad inicial",
  },
  {
    id: aidRequestTypeDM.DEATH_ASSOCIATE.id,
    title: "Fallecimiento del asociado",
  },
  {
    id: aidRequestTypeDM.ADDICTION_PROBLEMS.id,
    title: "Problemas de adicción",
  },
  {
    id: aidRequestTypeDM.PARTIAL_DAMAGE_HOUSE.id,
    title: "Daño parcial de vivienda",
  },
  {
    id: aidRequestTypeDM.TOTAL_HOUSING_DAMAGE.id,
    title: "Daño total de vivienda",
  },
  {
    id: aidRequestTypeDM.DEATH_BENEFICIARY.id,
    title: "Fallecimiento de beneficiario",
  },
  {
    id: aidRequestTypeDM.EXHUMATION_OSSUARY_ASSISTANCE.id,
    title: "Auxilio por exhumación u osario",
  },
  {
    id: aidRequestTypeDM.ORTHOPEDIC_BOOTS.id,
    title: "Botas ortopédicas",
  },
  {
    id: aidRequestTypeDM.MEDICATIONS.id,
    title: "Medicamentos",
  },
  {
    id: aidRequestTypeDM.MEDICAL_TRANSFERS.id,
    title: "Traslados médicos",
  },
  {
    id: aidRequestTypeDM.TEMPORARY_CARE_ACCOMPANIMENT.id,
    title: "Acompañamiento asistencial temporal",
  },
  {
    id: aidRequestTypeDM.LENSES.id,
    title: "Lentes",
  },
  {
    id: aidRequestTypeDM.INCAPACITY_180_DAYS.id,
    title: "Incapacidad superior a 180 días",
  },
  {
    id: aidRequestTypeDM.AIDS_SPORTS_ARTISTIC_ACTIVITIES.id,
    title: "Auxilios para actividades deportivas o artísticas",
  },
  {
    id: aidRequestTypeDM.DISABILITY_EXTENSION.id,
    title: "Incapacidad prórroga",
  },
  {
    id: aidRequestTypeDM.PARTIAL_DAMAGE_HOUSE.id,
    title: "Daño de enseres básicos",
  },
];

export { aidsRequestMock };
