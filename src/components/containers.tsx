import { IContainer, IContainersProps, IItemInstance } from "../BE/interfaces";

export const Containers = ({
  containersData,
  openedContainers,
  onMouseOverElement
}: IContainersProps) => {
  const content: (JSX.Element | null)[] = [...openedContainers].map(
    (containerId: string) => {
      const container: IContainer | undefined = containersData[containerId];

      if (container === undefined) {
        return null;
      }

      const items: JSX.Element[] = [];

      for (let index = 0; index < container.size; index++) {
        const item: IItemInstance | null = container.items[index];
        let itemContent: JSX.Element | null = null;

        if (item) {
          itemContent = <div className={`bg-${item.spriteIds[0]}`} />;
        }

        items.push(
          <div
            key={item?.uniqueId || index}
            className={"containers__space"}
            onMouseEnter={(ev) => {
              onMouseOverElement({
                container,
                containerSlotIndex: index,
                item
              });
            }}
            onMouseLeave={(ev) => {
              onMouseOverElement(undefined);
            }}
          >
            {itemContent}
          </div>
        );
      }

      return <div className={"containers__container"}>{items}</div>;
    }
  );

  return <div className="containers">{content}</div>;
};
