import { Application } from 'pixi.js'
import config from '../config'

export const game = new Application({
  width: config.container.width,
  height: config.container.height
})

document.body.append(game.view)

export function getContainer() {
  return game.stage
}