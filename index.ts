import * as $ from 'jquery'
import { TimelineMax } from 'gsap'

let speedifyFactor = 1.5
const dev = false

if (!dev) {
  // first make svg images inline
  $('img')
    .filter(function() {
      // @ts-ignore
      return this.src.match(/.*\.svg$/)
    })
    .each(function() {
      const $img = $(this)
      const speed = $img.data('speed')
      speedifyFactor = speed || speedifyFactor

      const imgID = $img.attr('id')
      const imgClass = $img.attr('class')
      const imgURL = $img.attr('src')

      $.get(
        imgURL,

        data => {
          // Get the SVG tag, ignore the rest
          let $svg = $(data).find('svg')

          // Add replaced image's ID to the new SVG
          if (typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID)
          }
          // Add replaced image's classes to the new SVG
          if (typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass + ' replaced-svg')
          }

          // Remove any invalid XML tags as per http://validator.w3.org
          $svg = $svg.removeAttr('xmlns:a')

          // Replace image with new SVG
          $img.replaceWith($svg)
        }
      ).then(animateMap)
    })
}

if (dev) {
  animateMap()
}
function animateMap() {
  // @ts-ignore
  const timeline = new TimelineMax() // master timeline

  /////////////////////////////////////////////////
  // animate the circles that represent the cities
  ////////////////////////////////////////////////
  function getCircleLength(circle) {
    const r = parseFloat($(circle).attr('r'))
    const circleLength = 2 * Math.PI * r
    return circleLength
  }

  function hideCirclePath(circle) {
    const length = getCircleLength(circle)
    $(circle).css({
      'stroke-dasharray': length,
      'stroke-dashoffset': length,
    })
  }

  const circleAnimationTime = 2000 * (1 / speedifyFactor)
  async function animateCircle(circle) {
    const length = getCircleLength(circle)
    return $(circle)
      .animate({ 'stroke-dashoffset': 0 }, circleAnimationTime)
      .promise()
  }

  timeline.add('startTravelCircles') // create a start label
  const travelCircles = Array.from(document.querySelectorAll('.travel-circle'))

  travelCircles.forEach(hideCirclePath)
  timeline.add(() => {
    for (const travelCircle of travelCircles) {
      animateCircle(travelCircle)
    }
  })

  ///////////////////////////////////////////////
  // animate the drawing if lines between cities
  //////////////////////////////////////////////

  // safari doesn't support negative stroke-dashoffset,
  // so we make the values positive with an offset
  function getOffset(length) {
    return length * 2
  }

  function hideTravelLinePath(travelLinePath) {
    const length = travelLinePath.getTotalLength() + 1
    const offset = getOffset(length)

    $(travelLinePath).css({
      'stroke-dasharray': length,
      'stroke-dashoffset': length + offset + 1,
    })
  }

  const travelLineAnimationTime = 4500 * (1 / speedifyFactor)
  const travelLineAnimationTotalTime = travelLineAnimationTime * 4

  async function animateStrokeDashOffset(travelLine, start, end) {
    $(travelLine).css({
      'stroke-dashoffset': end,
    })
    return $(travelLine)
      .animate({ 'stroke-dashoffset': start }, travelLineAnimationTime * 2)
      .promise()
  }

  async function animateTravelLine({
    travelLine,
    reversed = false,
    bothWays = false,
  }) {
    const length = travelLine.getTotalLength() + 1
    const offset = getOffset(length)
    const start = -length + offset
    const end = length + offset + 1

    if (reversed) {
      await animateStrokeDashOffset(travelLine, end, start)
      if (bothWays) {
        await animateStrokeDashOffset(travelLine, start, end)
      }
    } else {
      await animateStrokeDashOffset(travelLine, start, end)
      if (bothWays) {
        await animateStrokeDashOffset(travelLine, end, start)
      }
    }
  }

  timeline.add('startTravelLines') // create a start label

  // all the lines that should be animated
  const travelLinesPaths = Array.from(document.querySelectorAll('.travel-line'))

  travelLinesPaths.forEach(hideTravelLinePath)

  async function staggerAnimation(travelLinesPaths) {
    for (const travelLinePath of travelLinesPaths) {
      const reversed = travelLinePath.classList.contains('reverse')
      const bothWays = travelLinePath.classList.contains('bothways')
      await animateTravelLine({
        travelLine: travelLinePath,
        reversed,
        bothWays,
      })
    }
    staggerAnimation(travelLinesPaths)
  }

  timeline.add(() => {
    staggerAnimation(travelLinesPaths)
  }, circleAnimationTime / 1000)
}
