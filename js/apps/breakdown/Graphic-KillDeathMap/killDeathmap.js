var breakdownDirectives = angular.module('breakdownDirectives')

breakdownDirectives.directive('killDeathMap', ['Maps', '$timeout', function (Maps, $timeout) {
  var link = function (scope, element, attrs) {
    var mapInfo = Maps.getMapData(scope.map)
    var mapScale = 0.65
    var tColor = '#FFCC66'
    var ctColor = '#0033FF'
    var killerColor = '#00CC66'
    var victimColor = '#FF3300'

    mapInfo.xOffset *= mapScale
    mapInfo.yOffset *= mapScale
    mapInfo.scaleFactor *= (1 + ((mapScale + (1 - mapScale)) / 2))

    var c = element.children('canvas')[0]
    var ctx = c.getContext('2d')

    function getMapPoint (coord, offset, scaleFactor) {
      return Math.abs(offset + (coord / scaleFactor))
    }

    function getRadians (degrees) {
      return (Math.PI / 180) * degrees
    }

    function getPositionPoint (posInfo) {
      return [posInfo.Position.Location.x, posInfo.Position.Location.y]
    }

    // undoes getMapPoint, essentially
    var getCsPoint = function (coord, offset, scaleFactor) {
      return -(offset * scaleFactor) + coord * scaleFactor
    }

    var drawLegend = function () {
      var legendBaseX = mapInfo.legendXOffset
      var legendBaseY = mapInfo.legendYOffset

      var position = {
        Position: {
          Location: {
            x: getCsPoint(
              legendBaseX + 20,
              mapInfo.xOffset,
              mapInfo.scaleFactor
            ),
            y: getCsPoint(
              legendBaseY + 20,
              mapInfo.yOffset,
              mapInfo.scaleFactor
            ),
          },
          ViewX: 0,
          ViewY: 0,
        },
        HasArmor: false,
        HasHelmet: false,
        HasBomb: false,
        HasDefuseKit: false,
      }

      ctx.beginPath()
      ctx.fillStyle = 'rgba(0,0,0,0.5)'
      ctx.fillRect(legendBaseX, legendBaseY, 270, 125)

      drawPoint(position, killerColor)
      ctx.beginPath()
      ctx.font = '15px Arial'
      ctx.fillStyle = '#FFFFFF'
      ctx.fillText('Killer', legendBaseX + 40, legendBaseY + 25)

      position.Position.Location.y = getCsPoint(
        legendBaseY + 50,
        mapInfo.yOffset,
        mapInfo.scaleFactor
      )
      drawPoint(position, victimColor)
      ctx.beginPath()
      ctx.font = '15px Arial'
      ctx.fillStyle = '#FFFFFF'
      ctx.fillText('Victim', legendBaseX + 40, legendBaseY + 55)

      position.Position.Location.y = getCsPoint(
        legendBaseY + 80,
        mapInfo.yOffset,
        mapInfo.scaleFactor
      )
      drawPoint(position, scope.team === 'T' ? tColor : ctColor)
      ctx.beginPath()
      ctx.font = '15px Arial'
      ctx.fillStyle = '#FFFFFF'
      ctx.fillText('Teammate', legendBaseX + 40, legendBaseY + 85)

      position.Position.Location.y = getCsPoint(
        legendBaseY + 110,
        mapInfo.yOffset,
        mapInfo.scaleFactor
      )
      drawPoint(position, scope.team === 'T' ? ctColor : tColor)
      ctx.beginPath()
      ctx.font = '15px Arial'
      ctx.fillStyle = '#FFFFFF'
      ctx.fillText('Enemy', legendBaseX + 40, legendBaseY + 115)

      position.Position.Location.y = getCsPoint(
        legendBaseY + 20,
        mapInfo.yOffset,
        mapInfo.scaleFactor
      )
      position.Position.Location.x = getCsPoint(
        legendBaseX + 140,
        mapInfo.xOffset,
        mapInfo.scaleFactor
      )
      position.HasArmor = true
      drawPoint(position, killerColor)
      ctx.beginPath()
      ctx.font = '15px Arial'
      ctx.fillStyle = '#FFFFFF'
      ctx.fillText('Armor', legendBaseX + 160, legendBaseY + 25)

      position.Position.Location.y = getCsPoint(
        legendBaseY + 50,
        mapInfo.yOffset,
        mapInfo.scaleFactor
      )
      position.HasArmor = true
      position.HasHelmet = true
      drawPoint(position, victimColor)
      ctx.beginPath()
      ctx.font = '15px Arial'
      ctx.fillStyle = '#FFFFFF'
      ctx.fillText('Armor + Helmet', legendBaseX + 160, legendBaseY + 55)

      position.Position.Location.y = getCsPoint(
        legendBaseY + 80,
        mapInfo.yOffset,
        mapInfo.scaleFactor
      )
      position.HasArmor = false
      position.HasHelmet = false
      position.HasBomb = true
      drawPoint(position, tColor)
      ctx.beginPath()
      ctx.font = '15px Arial'
      ctx.fillStyle = '#FFFFFF'
      ctx.fillText('Bomb Carrier', legendBaseX + 160, legendBaseY + 85)

      position.Position.Location.y = getCsPoint(
        legendBaseY + 110,
        mapInfo.yOffset,
        mapInfo.scaleFactor
      )
      position.HasBomb = false
      position.HasDefuseKit = true
      drawPoint(position, ctColor)
      ctx.beginPath()
      ctx.font = '15px Arial'
      ctx.fillStyle = '#FFFFFF'
      ctx.fillText('Defuse Kit', legendBaseX + 160, legendBaseY + 115)
    }

    var drawPoint = function (position, color) {
      ctx.beginPath()

      const X = getMapPoint(
        position.Position.Location.x,
        mapInfo.xOffset,
        mapInfo.scaleFactor
      )
      const Y = getMapPoint(
        position.Position.Location.y,
        mapInfo.yOffset,
        mapInfo.scaleFactor
      )

      ctx.arc(X, Y, 15 * mapScale, 0, 2 * Math.PI, true)
      ctx.fillStyle = color
      ctx.fill()

      ctx.beginPath()

      var ViewX =
        (((Math.cos(getRadians(position.Position.ViewX))) * 25) * mapScale) + X
      var ViewY =
        (((-1 * Math.sin(getRadians(position.Position.ViewX)) * 25)) * mapScale) + Y // eslint-disable-line

      ctx.moveTo(X, Y)
      ctx.lineTo(ViewX, ViewY)
      ctx.lineWidth = 2
      ctx.strokeStyle = color
      ctx.stroke()
      ctx.closePath()

      if (position.HasArmor) {
        var arcLength = 0

        if (position.HasHelmet) {
          arcLength = 2 * Math.PI
        } else {
          arcLength = Math.PI
        }

        var arcStart =
          (-1 * getRadians(position.Position.ViewX)) + (Math.PI / 2)
        var arcEnd = arcStart + arcLength

        ctx.beginPath()
        ctx.arc(X, Y, 18 * mapScale, arcStart, arcEnd)
        ctx.stroke()
      }

      if (position.HasBomb) {
        ctx.beginPath()
        ctx.font = (15 * mapScale) + 'px Arial'
        ctx.fillStyle = '#000000'
        ctx.fillText('B', X - (4 * mapScale), Y + (5 * mapScale))
      }

      if (position.HasDefuseKit) {
        ctx.beginPath()
        ctx.font = (15 * mapScale) + 'px Arial'
        ctx.fillStyle = '#CECECE'
        ctx.fillText('D', X - (4 * mapScale), Y + (5 * mapScale))
      }
    }

    var initMap = function () {
      var img = new Image()
      var points = []

      img.onload = function () {
        img.height *= mapScale
        img.width *= mapScale

        c.height = img.height
        c.width = img.width

        ctx.clearRect(0, 0, c.Width, c.Height)

        ctx.drawImage(img, 0, 0, c.width, c.height)
        drawLegend()

        if (!scope.killData) {
          return
        }

        var i = 0
        let j
        var color = ''

        for (i = 0, j = scope.killData.TeammatePositions.length; i < j; i++) {
          color = scope.team === 'T' ? tColor : ctColor
          drawPoint(scope.killData.TeammatePositions[i], color)
          points.push(getPositionPoint(scope.killData.TeammatePositions[i]))
        }

        for (i = 0, j = scope.killData.EnemyPositions.length; i < j; i++) {
          color = scope.team === 'T' ? ctColor : tColor
          drawPoint(scope.killData.EnemyPositions[i], color)
          points.push(getPositionPoint(scope.killData.EnemyPositions[i]))
        }

        // drawing these last so that they're on top of any teammates.

        points.push(getPositionPoint(scope.killData.Position))
        points.push(getPositionPoint(scope.killData.VictimPosition))

        drawPoint(scope.killData.Position, killerColor)
        drawPoint(scope.killData.VictimPosition, victimColor)
      }

      img.src = mapInfo.imageUrl
    }

    $timeout(initMap, 0)

    scope.$watch('killData', function () {
      initMap()
    })
  }

  return {
    restrict: 'E',
    replace: 'true',
    scope: {
      killData: '=',
      map: '@',
      team: '@',
    },
    link: link,
    templateUrl: '/ng-partials/breakdown/Graphic-KillDeathMap/killDeathMap.html',
  }
}])
