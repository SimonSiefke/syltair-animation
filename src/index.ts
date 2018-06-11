import { animateMap, getAnimatableImages } from './animateHelperFunctions'
// console.log('hello')

async function init() {
  const animatableImages = await getAnimatableImages()
  animatableImages.forEach(animateMap)
}

init()
