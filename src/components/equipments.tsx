import { IEquipmentsProps } from "../BE/interfaces";

export const Equipments = ({
  equipments,
  onOpenContainer,
  onMouseOverElement
}: IEquipmentsProps) => {
  return (
    <div className="equipments">
      <div
        className={"equipments__slot"}
        onMouseEnter={(ev) => {
          onMouseOverElement({
            type: "inventory"
          });
        }}
        onMouseLeave={(ev) => {
          onMouseOverElement(undefined);
        }}
        onClick={() => {
          if (equipments.inventory?.containerId === undefined) {
            return;
          }

          onOpenContainer(equipments.inventory.containerId);
        }}
      >
        <div className={`bg-${equipments.inventory?.spriteIds[0]}`} />
      </div>
    </div>
  );
};
