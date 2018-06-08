import axios from 'axios'

function parseHtmlString(string) {
  const dummyElement = document.createElement('html')
  dummyElement.innerHTML = string
  return dummyElement.querySelector('svg')
}

function replaceHtmlElement(original, replacerString) {
  const replacer = parseHtmlString(replacerString)
  if (original.parenNode !== null) {
    original.parentNode.replaceChild(replacer, original)
    return replacer
  }
  throw new Error('cannot replace html element')
}

export async function inlineSvgImage(svgImageElement) {
  if (svgImageElement.src.match(/.*\.svg$/)) {
    const { data } = await axios.get(svgImageElement.src)
    return replaceHtmlElement(svgImageElement, data)
  }
  throw new Error('cannot animate non-svg image')
}
