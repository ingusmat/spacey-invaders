import { Application, Graphics } from "pixi.js";

export const initPixi = (): Application => {
  const app = new Application({
    width: 512,
    height: 448,
    antialias: false,
    resolution: 1,
    backgroundColor: 0x000000,
  });

  const appContainer = document.getElementById('app');
  if (appContainer) {
    appContainer.appendChild(app.view);
  }

  return app;
}
