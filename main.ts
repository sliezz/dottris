input.onButtonPressed(Button.A, function () {
    if (game_over) {
        New_game()
    } else if (disable_buttons) {
    	
    } else {
        if (cursor_X > 0 && !(led.point(cursor_X - 1, cursor_Y))) {
            led.unplot(cursor_X, cursor_Y)
            cursor_X += -1
            Display_cursor()
        }
    }
})
function Can_line_be_dropped (test_y: number) {
    for (let x = 0; x <= 4; x++) {
        if (!(led.point(x, test_y))) {
            return 0
        }
    }
    return 1
}
function Display_cursor () {
    if (!(led.point(cursor_X, cursor_Y))) {
        led.plotBrightness(cursor_X, cursor_Y, Cursor_lightness)
    }
}
input.onButtonPressed(Button.B, function () {
    if (game_over) {
        New_game()
    } else if (disable_buttons) {
    	
    } else {
        if (cursor_X < 4 && !(led.point(cursor_X + 1, cursor_Y))) {
            led.unplot(cursor_X, cursor_Y)
            cursor_X += 1
            Display_cursor()
        }
    }
})
function Game_over () {
    music.play(music.stringPlayable("C - C - C - C C5 ", 500), music.PlaybackMode.UntilDone)
    game_over = 1
    while (game_over) {
        basic.showNumber(Points)
    }
}
function Reset_cursor () {
    cursor_X = 2
    cursor_Y = 0
    if (led.point(cursor_X, cursor_Y)) {
        if (!(game_over)) {
            Game_over()
        }
        return 0
    }
    Display_cursor()
    return 1
}
function New_game () {
    basic.clearScreen()
    Game_speed = 700
    Points = 0
    Reset_cursor()
    game_over = 0
}
let y1 = 0
let y = 0
let cursor_Y1 = 0
let Game_speed = 0
let Points = 0
let cursor_Y = 0
let cursor_X = 0
let game_over = 0
let disable_buttons = 0
let Cursor_lightness = 0
Cursor_lightness = 80
let Dot_lightness = 10
disable_buttons = 0
New_game()
basic.forever(function () {
    basic.pause(Game_speed)
    if (!(game_over)) {
        cursor_Y1 = cursor_Y + 1
        if (cursor_Y < 4 && !(led.point(cursor_X, cursor_Y1))) {
            led.unplot(cursor_X, cursor_Y)
            cursor_Y = cursor_Y1
            led.plotBrightness(cursor_X, cursor_Y, Cursor_lightness)
        } else {
            led.plotBrightness(cursor_X, cursor_Y, Dot_lightness)
            if (Can_line_be_dropped(cursor_Y)) {
                disable_buttons = 1
                y = cursor_Y
                while (y >= 0) {
                    y1 = y
                    y += -1
                    for (let x2 = 0; x2 <= 4; x2++) {
                        if (led.point(x2, y)) {
                            led.plotBrightness(x2, y1, Dot_lightness)
                        } else {
                            led.unplot(x2, y1)
                        }
                    }
                }
                music.play(music.stringPlayable("G F A - A - F - ", 500), music.PlaybackMode.UntilDone)
                Game_speed = Game_speed * 0.9
                Points += 1
                disable_buttons = 0
            }
            Reset_cursor()
        }
    }
})
