import { Application } from 'pixi.js'
import config from '../config'
// game对象
export const game = new Application({
  width: config.container.width,
  height: config.container.height
})
// 将game对象添加到body
document.body.append(game.view)

// 返回容器
export function getContainer() {
  return game.stage
}