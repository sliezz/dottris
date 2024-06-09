function Game_Over () {
    music.play(music.stringPlayable("C - C - C - C C5 ", 500), music.PlaybackMode.UntilDone)
    game_over = 1
    while (game_over) {
        disable_buttons = 1
        basic.showNumber(Points)
        disable_buttons = 0
    }
}
function Can_a_line_be_dropped (test_y: number) {
    for (let x = 0; x <= 4; x++) {
        if (!(led.point(x, test_y))) {
            return 0
        }
    }
    return 1
}
function Drop_a_line (line_y: number) {
    y = line_y
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
    music.play(music.stringPlayable("G F A - - - - - ", 500), music.PlaybackMode.UntilDone)
    Game_speed = Game_speed * 0.9
    Points += 1
}
input.onButtonPressed(Button.A, function () {
    if (game_over) {
        New_Game()
    } else if (disable_buttons) {
    	
    } else {
        if (cursor_X > 0 && !(led.point(cursor_X - 1, cursor_Y))) {
            led.unplot(cursor_X, cursor_Y)
            cursor_X += -1
            Display_cursor()
        }
    }
})
function Reset_Cursors_position () {
    cursor_X = 2
    cursor_Y = 0
    if (led.point(cursor_X, cursor_Y)) {
        if (!(game_over)) {
            Game_Over()
        }
        return 0
    }
    Display_cursor()
    return 1
}
input.onGesture(Gesture.ScreenDown, function () {
    if (!(game_over) && Points < 10) {
        game_over = 1
        basic.clearScreen()
        while (Points < 10) {
            Game_speed = Game_speed * 0.9
            Points += 1
        }
        Reset_Cursors_position()
        Display_cursor()
        game_over = 0
    }
})
input.onButtonPressed(Button.B, function () {
    if (game_over) {
        New_Game()
    } else if (disable_buttons) {
    	
    } else {
        if (cursor_X < 4 && !(led.point(cursor_X + 1, cursor_Y))) {
            led.unplot(cursor_X, cursor_Y)
            cursor_X += 1
            Display_cursor()
        }
    }
})
function New_Game () {
    basic.clearScreen()
    Game_speed = 700
    Points = 0
    Reset_Cursors_position()
    game_over = 0
}
function Display_cursor () {
    if (!(led.point(cursor_X, cursor_Y))) {
        led.plotBrightness(cursor_X, cursor_Y, Cursors_lightness)
    }
}
let cursor_Y1 = 0
let cursor_Y = 0
let cursor_X = 0
let Game_speed = 0
let y1 = 0
let y = 0
let Points = 0
let game_over = 0
let disable_buttons = 0
let Dot_lightness = 0
let Cursors_lightness = 0
Cursors_lightness = 80
Dot_lightness = 10
disable_buttons = 0
led.setBrightness(80)
led.setDisplayMode(DisplayMode.BlackAndWhite)
New_Game()
basic.forever(function () {
    basic.pause(Game_speed)
    if (!(game_over)) {
        cursor_Y1 = cursor_Y + 1
        if (cursor_Y < 4 && !(led.point(cursor_X, cursor_Y1))) {
            led.unplot(cursor_X, cursor_Y)
            cursor_Y = cursor_Y1
            led.plotBrightness(cursor_X, cursor_Y, Cursors_lightness)
        } else {
            led.plotBrightness(cursor_X, cursor_Y, Dot_lightness)
            if (Can_a_line_be_dropped(cursor_Y)) {
                disable_buttons = 1
                Drop_a_line(cursor_Y)
                disable_buttons = 0
            }
            Reset_Cursors_position()
        }
    }
})
