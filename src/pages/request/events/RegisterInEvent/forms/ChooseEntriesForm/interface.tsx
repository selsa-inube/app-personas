import { EntryCounterCard } from "@components/cards/EntryCounterCard";
import { OutlineCard } from "@components/cards/OutlineCard";
import { ParticipantCard } from "@components/cards/ParticipantCard";
import { AddParticipantModal } from "@components/modals/events/AddParticipantModal";
import { inube } from "@design/tokens";
import {
  Button,
  Message,
  Stack,
  Tag,
  Text,
  useMediaQuery,
} from "@inubekit/inubekit";
import { getTicketAvailableAppearance } from "@pages/request/events/EventOptions/utils";
import { FormikProps } from "formik";
import { MdOutlinePersonAdd } from "react-icons/md";
import { IBeneficiary } from "src/model/entity/user";
import { IChooseEntriesEntry } from "./types";

interface ChooseEntriesFormUIProps {
  formik: FormikProps<IChooseEntriesEntry>;
  loading?: boolean;
  showParticipantModal: boolean;
  onToggleParticipantModal: () => void;
  customHandleChange: (categoryId: string, count: number) => void;
  onAddParticipant: (participant: IBeneficiary) => void;
  onRemoveParticipant: (participant: IBeneficiary) => void;
}

function ChooseEntriesFormUI(props: ChooseEntriesFormUIProps) {
  const {
    formik,
    showParticipantModal,
    onAddParticipant,
    onRemoveParticipant,
    customHandleChange,
    onToggleParticipantModal,
  } = props;

  const isMobile = useMediaQuery("(max-width: 450px)");

  return (
    <>
      <form>
        <Stack
          direction="column"
          gap={isMobile ? inube.spacing.s300 : inube.spacing.s400}
        >
          <Message
            appearance="help"
            title="Estimado usuario, los asientos solo serán reservados hasta que complete el asistido de participación (incluido el proceso de pago si aplica)."
          />

          <Stack direction="column" gap={inube.spacing.s200}>
            <Text type="title" size="large" weight="bold">
              {formik.values?.event?.title}
            </Text>

            <Stack direction="column" gap={inube.spacing.s100}>
              <Stack gap={inube.spacing.s200}>
                <Text type="label" size="large">
                  Entradas disponibles del evento:
                </Text>
                <Tag
                  label={
                    formik.values?.event?.ticketsAvailable.toString() || "0"
                  }
                  appearance={getTicketAvailableAppearance(
                    formik.values?.event?.ticketsAvailable || 0,
                  )}
                />
              </Stack>

              <Stack gap={inube.spacing.s200}>
                <Text type="label" size="large">
                  Entradas disponibles por asociado:
                </Text>
                <Tag
                  label={formik.values?.event?.entriesUser.toString() || "0"}
                  appearance={getTicketAvailableAppearance(
                    formik.values?.event?.entriesUser || 0,
                  )}
                />
              </Stack>
            </Stack>
          </Stack>

          <Stack direction="column" gap={inube.spacing.s250}>
            <Text type="title" size="medium" weight="bold">
              Cantidad de entradas
            </Text>
            {formik.values.event?.entryType === "OpenEntries" ? (
              <Stack direction="column" gap={inube.spacing.s150}>
                {formik.values?.entriesCategories?.map((category) => (
                  <EntryCounterCard
                    key={category.id}
                    categoryId={category.id}
                    categoyName={category.name}
                    count={category.count}
                    onChange={customHandleChange}
                    isExceeded={formik.values.isExceeded}
                  />
                ))}
              </Stack>
            ) : (
              <>
                {formik.values.participants &&
                  formik.values.participants?.length > 0 && (
                    <Stack direction="column" gap={inube.spacing.s150}>
                      {formik.values.participants?.map((participant) => (
                        <ParticipantCard
                          key={participant.identificationNumber}
                          beneficiary={participant}
                          withButton
                          onRemove={onRemoveParticipant}
                        />
                      ))}
                    </Stack>
                  )}
                <Button
                  iconBefore={<MdOutlinePersonAdd />}
                  variant="outlined"
                  spacing="compact"
                  appearance="primary"
                  onClick={onToggleParticipantModal}
                  disabled={formik.values.isExceeded}
                >
                  Agregar participante
                </Button>
              </>
            )}

            <Stack direction="row" justifyContent="flex-end">
              <OutlineCard>
                <Stack
                  direction="row"
                  padding={`${inube.spacing.s100} ${inube.spacing.s200}`}
                  gap={inube.spacing.s100}
                >
                  <Text type="title" size="medium" weight="bold">
                    Entradas totales:
                  </Text>
                  <Tag
                    label={formik.values?.totalEntries?.toString() || "0"}
                    appearance="gray"
                    displayIcon={false}
                  />
                </Stack>
              </OutlineCard>
            </Stack>
          </Stack>
        </Stack>
      </form>

      {showParticipantModal && (
        <AddParticipantModal
          portalId="modals"
          allowedRelationships={
            formik.values.entriesCategories.length > 0
              ? formik.values.entriesCategories[0]?.allowedRelationships || []
              : []
          }
          onCloseModal={onToggleParticipantModal}
          onAddParticipant={onAddParticipant}
        />
      )}
    </>
  );
}

export { ChooseEntriesFormUI };
