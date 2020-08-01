input.onPinPressed(TouchPin.P0, function () {
    ship.change(LedSpriteProperty.X, -1)
})
input.onPinPressed(TouchPin.P1, function () {
    ship.change(LedSpriteProperty.X, 1)
})
let shooter: game.LedSprite = null
let enemy: game.LedSprite = null
let ship: game.LedSprite = null
ship = game.createSprite(2, 4)
ship.change(LedSpriteProperty.Brightness, 200)
game.setScore(0)
basic.forever(function () {
    enemy = game.createSprite(randint(0, 4), 0)
    enemy.change(LedSpriteProperty.Brightness, 150)
    basic.pause(150)
    enemy.turn(Direction.Right, 90)
    for (let index = 0; index < 4; index++) {
        enemy.change(LedSpriteProperty.Y, 1)
        basic.pause(500)
        if (enemy.isTouching(ship)) {
            game.gameOver()
        }
    }
    if (enemy.isTouchingEdge()) {
        enemy.delete()
    }
})
basic.forever(function () {
    if (input.pinIsPressed(TouchPin.P1) && input.pinIsPressed(TouchPin.P0)) {
        shooter = game.createSprite(ship.get(LedSpriteProperty.X), ship.get(LedSpriteProperty.Y))
        shooter.change(LedSpriteProperty.Brightness, 50)
        for (let index = 0; index < 4; index++) {
            shooter.change(LedSpriteProperty.Y, -1)
            basic.pause(150)
            if (shooter.isTouching(enemy)) {
                game.addScore(1)
                enemy.delete()
                shooter.delete()
            }
        }
        if (shooter.get(LedSpriteProperty.Y) <= 0) {
            shooter.delete()
        }
        if (game.score() > 5) {
            basic.showIcon(IconNames.Happy)
            basic.showString("Winner")
        }
    }
})
