import { IMainUIProps } from "../BE/interfaces";
import { Equipments } from "./equipments";
import { Containers } from "./containers";
import React from "react";

export const MainUI = ({
  gameState,
  onOpenContainer,
  onMouseOverElement
}: IMainUIProps): JSX.Element => {
  if (gameState.character === undefined) {
    return <div className="game-main-ui-loading">Loading character ...</div>;
  }

  const { character, openedContainers, containersData } = gameState;

  return (
    <div className="game-main-ui">
      <main>
        <div
          onClick={() => {
            onOpenContainer(character.bank);
          }}
        >
          Bank
        </div>
        <div
          onClick={() => {
            onOpenContainer(character.mail);
          }}
        >
          Mail
        </div>
      </main>
      <section>
        <h6>{character.name}</h6>
        <h6>{character.id}</h6>
        <Equipments
          equipments={character.equipments}
          onOpenContainer={onOpenContainer}
          onMouseOverElement={onMouseOverElement}
        />
        <Containers
          openedContainers={openedContainers}
          containersData={containersData}
          onMouseOverElement={onMouseOverElement}
        />
      </section>
    </div>
  );
};
