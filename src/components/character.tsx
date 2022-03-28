import { useEffect, useState, useRef } from "react";
import { Socket } from "../BE/server";
import { ICharacter, ISocketConnection } from "../BE/interfaces";

export const Character = (props: { characterId: string }) => {
  return (
    <div className="character">
      {/* <h2>Name: {characterData.name}</h2>
      <h2>Id: {characterData.id}</h2> */}
      {/* <h2
        onClick={() => {
          socketConnection.current?.dispatch({
            event: "open-container",
            payload: {
              containerId: characterData.bank
            }
          });
        }}
      >
        Bank: {characterData.bank}
      </h2>
      <h2
        onClick={() => {
          socketConnection.current?.dispatch({
            event: "open-container",
            payload: {
              containerId: characterData.mail
            }
          });
        }}
      >
        Mail: {characterData.mail}
      </h2>
      <h2>Equipments:</h2>
      <ul>
        {Object.entries(characterData.equipments).map(([slot, item], index) => (
          <li key={index}>
            <p>
              {slot} :{JSON.stringify(item, null, 2) || "empty"}{" "}
            </p>
          </li>
        ))}
      </ul> */}
    </div>
  );
};
