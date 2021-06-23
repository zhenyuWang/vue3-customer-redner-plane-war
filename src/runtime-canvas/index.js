import { createRenderer } from "vue";
import { Container, Sprite, Graphics, Texture, Text } from "pixi.js";

const renderer = createRenderer({
  // 创建元素接口
  createElement(type) {
    let element;
    switch (type) {
      case "container":
        element = new Container();
        break;
      case "sprite":
        element = new Sprite();
        break;
      case 'text':
        element = new Text();
        element.style = { fill: "red", font: "16px" }
        break;
      case "rect":
        element = new Graphics();
        element.beginFill(0x808080)
        element.drawRect(0, 0, 50, 7);
        element.endFill();
        break;
      case "rectInner":
        element = new Graphics();
        element.beginFill(0x00ff00)
        element.drawRect(0, 0, 25, 7);
        element.endFill();
        break;
    }
    return element;
  },
  // hostPatchProp=>pathProp vue 会自动给我们添加host 以下同理
  parentNode(el) {
    return el.parent;
  },
  insert(el, parent) {
    if (el && parent) {
      parent.addChild(el)
    }
  },
  remove(el) {
    // 当删除一个元素的时候 进行调用
    if (el && el.parent) {
      el.parent.removeChild(el);
    }
  },
  createText(text) {
    return new Text(text);
  },
  setElementText(el, text) {
    el.textContent = text;
  },
  patchProp(el, key, preVal, nextVal) {
    switch (key) {
      case "texture":
        el.texture = Texture.from(nextVal);
        break;
      case "onClick":
        el.on("pointertap", nextVal);
        break;
      default:
        el[key] = nextVal;
        break;
    }
  },
  nextSibling() { },
  createComment() { }
})

export function createApp(rootComponent) {
  return renderer.createApp(rootComponent);
}