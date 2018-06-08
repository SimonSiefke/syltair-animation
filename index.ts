import { animateMap, getAnimatableImages } from './animateHelperFunctions.ts'

async function init() {
  const animatableImages = await getAnimatableImages()
  animatableImages.forEach(animateMap)
}

init()
