namespace SpriteKind {
    export const BlueplayerAMMO = SpriteKind.create()
    export const RedplayerAMMO = SpriteKind.create()
}
function Blueplayer2 () {
    Blueplayer_左圖 = assets.image`myImage1`
    Blueplayer_右圖 = Blueplayer_左圖.clone()
    Blueplayer_右圖.flipX()
    Blueplayer = sprites.create(Blueplayer_左圖, SpriteKind.Player)
    controller.player2.moveSprite(Blueplayer, 75, 0)
    Blueplayer.ay = 重力
    info.player2.setLife(10)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (RedPlayer_jump_count_left <= 1) {
        RedPlayer.vy = 跳躍速度
        RedPlayer_jump_count_left += 1
    }
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.hazardLava0, function (sprite, location) {
    sprite.vy = 0
    tiles.placeOnRandomTile(sprite, sprites.builtin.forestTiles0)
    if (sprite == Blueplayer) {
        info.player2.changeLifeBy(-1)
    } else {
        info.player1.changeLifeBy(-1)
    }
})
controller.player2.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    if (Blue_jump_count_left <= 1) {
        Blueplayer.vy = 跳躍速度
        Blue_jump_count_left += 1
    }
})
controller.player2.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . f f f f . . 
        . f 8 8 8 8 f . 
        f 8 8 8 8 8 8 f 
        f 8 8 8 8 8 8 f 
        . f 8 8 8 8 f . 
        . . f f f f . . 
        `, Blueplayer, AMMO_Speed, 0)
    projectile.setKind(SpriteKind.BlueplayerAMMO)
    if (Blueplayer.image == Blueplayer_左圖) {
        projectile.vx = 0 - AMMO_Speed
    }
})
function Redplayer () {
    Redplayer_左圖 = assets.image`myImage`
    Redplayer_右圖 = Redplayer_左圖.clone()
    Redplayer_右圖.flipX()
    RedPlayer = sprites.create(Redplayer_左圖, SpriteKind.Player)
    controller.moveSprite(RedPlayer, 75, 0)
    RedPlayer.ay = 重力
    info.setLife(10)
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . f f f f . . 
        . f 2 2 2 2 f . 
        f 2 2 2 2 2 2 f 
        f 2 2 2 2 2 2 f 
        . f 2 2 2 2 f . 
        . . f f f f . . 
        `, RedPlayer, AMMO_Speed, 0)
    projectile.setKind(SpriteKind.RedplayerAMMO)
    if (RedPlayer.image == Redplayer_左圖) {
        projectile.vx = 0 - AMMO_Speed
    }
})
sprites.onOverlap(SpriteKind.RedplayerAMMO, SpriteKind.Player, function (sprite, otherSprite) {
    if (otherSprite == Blueplayer) {
        info.player2.changeLifeBy(-1)
        sprite.destroy()
    }
})
info.player1.onLifeZero(function () {
    game.splash("藍色玩家", "勝利！")
    game.over(true)
})
sprites.onOverlap(SpriteKind.BlueplayerAMMO, SpriteKind.Player, function (sprite, otherSprite) {
    if (otherSprite == RedPlayer) {
        info.player1.changeLifeBy(-1)
        sprite.destroy()
    }
})
info.player2.onLifeZero(function () {
    game.splash("紅色玩家", "勝利！")
    game.over(true)
})
let Redplayer_右圖: Image = null
let Redplayer_左圖: Image = null
let projectile: Sprite = null
let RedPlayer: Sprite = null
let Blueplayer: Sprite = null
let Blueplayer_右圖: Image = null
let Blueplayer_左圖: Image = null
let Blue_jump_count_left = 0
let RedPlayer_jump_count_left = 0
let 跳躍速度 = 0
let 重力 = 0
let AMMO_Speed = 0
AMMO_Speed = 120
重力 = 250
跳躍速度 = -120
RedPlayer_jump_count_left = 2
Blue_jump_count_left = 2
tiles.setTilemap(tilemap`層級4`)
scene.setBackgroundColor(9)
scene.centerCameraAt(80, 76)
Redplayer()
Blueplayer2()
game.onUpdate(function () {
    if (RedPlayer.isHittingTile(CollisionDirection.Bottom)) {
        RedPlayer_jump_count_left = 0
    }
})
game.onUpdate(function () {
    if (Blueplayer.isHittingTile(CollisionDirection.Bottom)) {
        Blue_jump_count_left = 0
    }
})
game.onUpdate(function () {
    if (RedPlayer.vx < 0) {
        RedPlayer.setImage(Redplayer_左圖)
    } else if (RedPlayer.vx > 0) {
        RedPlayer.setImage(Redplayer_右圖)
    }
})
game.onUpdate(function () {
    if (Blueplayer.vx < 0) {
        Blueplayer.setImage(Blueplayer_左圖)
    } else if (Blueplayer.vx > 0) {
        Blueplayer.setImage(Blueplayer_右圖)
    }
})
