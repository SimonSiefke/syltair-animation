import { animateMap, getAnimatableImages } from './animateHelperFunctions'

async function init() {
  const animatableImages = await getAnimatableImages()
  animatableImages.forEach(animateMap)
}

init()
