import { animateMap, getAnimatableImages } from './animateHelperFunctions'
// console.log('hello')

async function init() {
  const animatableImages = await getAnimatableImages()
  console.log(animatableImages)
  animatableImages.forEach(animateMap)
}

init()
