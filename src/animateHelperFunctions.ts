import * as $ from 'jquery'
import { TimelineMax } from 'gsap'
import { inlineSvgImage } from './util'

const animatableImageSelectors = [
  '.page-template-starter .mappa-hintergrund img',
  '.home .mappa-hintergrund img',
]

/**
 * initializes the images by turning them into inline svg elements
 */
export async function getAnimatableImages() {
  const animatableImages = animatableImageSelectors.reduce(
    (total, selector) => [
      ...total,
      ...Array.from(document.querySelectorAll(selector)),
    ],
    []
  )
  const inlinePromises = animatableImages.map(inlineSvgImage)
  return Promise.all(inlinePromises)
}

function getCircleLength(circle) {
  const r = parseFloat(circle.getAttribute('r'))
  const circleLength = 2 * Math.PI * r
  return circleLength
}

function hideCirclePath(circle) {
  const length = getCircleLength(circle)
  circle.style['stroke-dasharray'] = length
  circle.style['stroke-dashoffset'] = length
}

async function animateCircle(circle, circleAnimationTime) {
  return $(circle)
    .animate({ 'stroke-dashoffset': 0 }, circleAnimationTime * 2)
    .promise()
}

// safari doesn't support negative stroke-dashoffset,
// so we make the values positive with an offset
function getOffset(length) {
  return length * 2
}

function hideTravelLinePath(travelLinePath) {
  const length = travelLinePath.getTotalLength() + 1
  const offset = getOffset(length)
  travelLinePath.style['stroke-dasharray'] = length
  travelLinePath.style['stroke-dashoffset'] = length + offset + 1
}

async function animateStrokeDashOffset(
  travelLine,
  start,
  end,
  travelLineAnimationTime
) {
  travelLine.style['stroke-dashoffset'] = end

  return $(travelLine)
    .animate({ 'stroke-dashoffset': start }, travelLineAnimationTime * 2)
    .promise()
}

async function animateTravelLine({
  travelLine,
  reversed = false,
  bothWays = false,
  travelLineAnimationTime,
}) {
  const length = travelLine.getTotalLength() + 1
  const offset = getOffset(length)
  const start = -length + offset
  const end = length + offset + 1

  if (reversed) {
    await animateStrokeDashOffset(
      travelLine,
      end,
      start,
      travelLineAnimationTime
    )
    if (bothWays) {
      await animateStrokeDashOffset(
        travelLine,
        start,
        end,
        travelLineAnimationTime
      )
    }
  } else {
    await animateStrokeDashOffset(
      travelLine,
      start,
      end,
      travelLineAnimationTime
    )
    if (bothWays) {
      await animateStrokeDashOffset(
        travelLine,
        end,
        start,
        travelLineAnimationTime
      )
    }
  }
}

async function staggerAnimation(travelLinesPaths, travelLineAnimationTime) {
  while (true) {
    for (const travelLinePath of travelLinesPaths) {
      const reversed = travelLinePath.classList.contains('reverse')
      const bothWays = travelLinePath.classList.contains('bothways')
      await animateTravelLine({
        travelLine: travelLinePath,
        reversed,
        bothWays,
        travelLineAnimationTime,
      })
    }
  }
}

export function animateMap(image) {
  const timeline = new TimelineMax() // master timeline
  let speedifyFactor = 1.5
  const circleAnimationTime = 2000 * (1 / speedifyFactor)

  timeline.add('startTravelCircles') // create a start label
  const travelCircles = Array.from(image.querySelectorAll(`.travel-circle`))

  travelCircles.forEach(hideCirclePath)
  timeline.add(() => {
    for (const travelCircle of travelCircles) {
      animateCircle(travelCircle, circleAnimationTime)
    }
  })

  const travelLineAnimationTime = 4500 * (1 / speedifyFactor)

  timeline.add('startTravelLines') // create a start label

  // all the lines that should be animated
  const travelLinesPaths = Array.from(image.querySelectorAll(`.travel-line`))
  travelLinesPaths.forEach(hideTravelLinePath)

  timeline.add(() => {
    staggerAnimation(travelLinesPaths, travelLineAnimationTime)
  }, circleAnimationTime / 1000)
}
