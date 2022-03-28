import "./styles.scss";

import { render } from "react-dom";

import { GameContainer } from "./containers/game";

const rootElement = document.getElementById("game-container");

render(
  <div className={"game-tabs"}>
    <GameContainer characterId={"87aa438c-5a96-4f51-94d8-2f917ebfd448"} />
    <GameContainer characterId={"741686fe-2fd3-4c60-b612-56dfda4fa29a"} />
  </div>,
  rootElement
);
