(function() {
  'use strict';
  var socket = io()
    , canvas  = document.getElementById('canvas')
    , context = canvas.getContext('2d')
    , players = []
    , playerID
    , playing
    , animationID
    , font = '100px Lucida Console'
    , wallBounce = new Audio('pongwallbounce')
    , playerBounce = new Audio('pongplayerbounce')
    
    var html = document.querySelector('html')
    canvas.width = html.offsetWidth
    canvas.height = html.offsetHeight

    var ball = { x: canvas.width/2
               , y: 25
               , radius: 25
               , speed: 5
               , goingRight: (Math.random() > 0.5)
               , goingDown: true
               }

    function animation () {
      if (animationID){
        window.cancelAnimationFrame(animationID)
      }
      animationID = window.requestAnimationFrame(animation)
      clear()
      for (var i = 0; i < 2; i++) {
        var player = players[i]
        context.beginPath()
        context.rect( player.x
                    , player.y
                    , player.width
                    , player.height
                    )
        context.fillStyle = 'white'
        context.fill()
        context.closePath()

        context.beginPath()
        context.font = font
        var margin = 400
          , x = (i === 0) ? margin : canvas.width - margin
          , y = 100
        context.fillText(player.score, x, y)
        context.fillStyle = 'white'
        context.fill()
        context.closePath()
      }

      ball.x += (ball.goingRight) ? ball.speed : -ball.speed
      ball.y += (ball.goingDown) ? ball.speed : -ball.speed

      if (ball.y - ball.radius < 0 || ball.y > canvas.height) {
        ball.goingDown = !ball.goingDown
        wallBounce.play()
      }

      var collision = players[playerID]
        , xCollision = false
        , score
      switch (playerID) {
        case 0:
          xCollision = (ball.x <= collision.x+collision.width)
          score = 'player1'
          break
        case 1:
          xCollision = (ball.x >= collision.x)
          score = 'player2'
          break
      }

      if (xCollision) {
        if (ball.y+ball.radius*2 >= collision.y && ball.y+ball.radius*2 <= collision.y+collision.height) {
          playerBounce.play()
          socket.emit('reverseBall')
          ball.goingRight = !ball.goingRight
        }
        else if (ball.x+ball.radius*2 <= 0 || ball.x-ball.radius >= canvas.width) {
            ball.x = canvas.width/2
            ball.y = 25
            ball.speed = 5
            socket.emit('score', score)
        }
      }
      context.beginPath()
      context.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2)
      context.closePath()
      context.fillStyle = 'white'
      context.fill()
      socket.emit('movement', { y : ball.y
                              , x : ball.x
                              , goingDown : ball.goingDown
                              , goingRight : ball.goingRight
                              , speed: ball.speed
                              })
    }

    socket.on('socketId', function (socketId) {
      canvas.width = html.offsetWidth
      canvas.height = html.offsetHeight
    })

    socket.on('ready', function (ID) {
      playing = true
      playerID = ID
      var boxHeight = 200

      for (var i = 0;i < 2; i++) {
        var xPos = (i < 1 ) ? 50 : canvas.width - 150
        players.push({ x: xPos
                     , y: canvas.height/2 - 100
                     , width: 50
                     , height: 200
                     , score: 0
                     , speed: 25
                     })
      }
      animationID = window.requestAnimationFrame(animation)
    })

    socket.on('wait', function() {
      var message = 'WAITING FOR PLAYERS'
      context.font = font
      var messageWidth = context.measureText(message)
      context.fillStyle = 'white'
      context.fillText(message
                      , canvas.width/2 - (messageWidth.width/2)
                      , canvas.height/2 + 50
                      )
      context.fill()
    })


    document.addEventListener('keydown', function (event) {
      if (playing) {
        var player = players[playerID]
        switch (event.keyCode) {
          case 38:
            player.y -= player.speed
          break
          case 40:
            player.y += player.speed
          break
        }
        socket.emit('playerMovement', player)
      }
    })

    document.addEventListener('keyup', function (event) {
      players[playerID].speed = 25
    })

    socket.on('reverseBall', function() {
      ball.goingRight = !ball.goingRight
    })

    socket.on('playerMovement', function (player) {
      players[(playerID === 0) ? 1: 0] = player
    })

    socket.on('movement', function (movement) {

      if (ball.x !== movement.x && ball.y !== movement.y) {
        ball.x = movement.x
        ball.y = movement.y
        ball.goingDown = movement.goingDown
        ball.goingRight = movement.goingRight
        ball.speed = movement.speed
      }
    })
    socket.on('score', calcScore)

    function calcScore (player) {
      switch (player) {
        case 'player1':
          players[1].score += 1
          break
        case 'player2':
          players[0].score += 1
          break
      }
    }
    function clear () {
      context.clearRect(0, 0, canvas.width, canvas.height)
    }
})()