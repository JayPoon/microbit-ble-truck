bluetooth.onUartDataReceived(serial.delimiters(Delimiters.Dollar), function () {
    recvCmdMsg = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Dollar))
    cmdType = startbit.startbit_analyzeBluetoothCmd(recvCmdMsg)
    if (cmdType == startbit.startbit_getBluetoothCmdtype(startbit.startbit_CmdType.VERSION)) {
        bluetooth.uartWriteString("CMD|0A|81|$")
    }
    if (cmdType == startbit.startbit_getBluetoothCmdtype(startbit.startbit_CmdType.ULTRASONIC)) {
        bluetooth.uartWriteString(startbit.startbit_convertUltrasonic(startbit.startbit_ultrasonic(startbit.startbit_ultrasonicPort.port2)))
    }
    if (cmdType == startbit.startbit_getBluetoothCmdtype(startbit.startbit_CmdType.TEMPERATURE)) {
        bluetooth.uartWriteString(startbit.startbit_convertTemperature(input.temperature()))
    }
    if (cmdType == startbit.startbit_getBluetoothCmdtype(startbit.startbit_CmdType.LIGHT)) {
        bluetooth.uartWriteString(startbit.startbit_convertLight(input.lightLevel()))
    }
    if (cmdType == startbit.startbit_getBluetoothCmdtype(startbit.startbit_CmdType.RGB_LIGHT)) {
        startbit.startbit_setPixelRGBArgs(StartbitLights.Light1, startbit.startbit_getArgs(recvCmdMsg, 1))
        startbit.startbit_setPixelRGBArgs(StartbitLights.Light2, startbit.startbit_getArgs(recvCmdMsg, 1))
        startbit.startbit_showLight()
    }
    if (cmdType == startbit.startbit_getBluetoothCmdtype(startbit.startbit_CmdType.SERVO)) {
        舵机号 = startbit.startbit_getArgs(recvCmdMsg, 1)
        舵机角度 = startbit.startbit_getArgs(recvCmdMsg, 2)
        舵机运行时间 = startbit.startbit_getArgs(recvCmdMsg, 3)
        if (舵机号 == 1) {
            startbit.setServo(startbit.startbit_servorange.range1, 舵机号, 舵机角度, 舵机运行时间)
        } else if (舵机号 == 2) {
            if (舵机角度 >= 95) {
                舵机角度 = 95
            }
            if (舵机角度 <= 30) {
                舵机角度 = 30
            }
            startbit.setServo(startbit.startbit_servorange.range1, 舵机号, 舵机角度, 舵机运行时间)
        } else if (舵机号 == 3) {
            if (舵机角度 >= 140) {
                舵机角度 = 140
            }
            if (舵机角度 <= 85) {
                舵机角度 = 85
            }
            startbit.setServo(startbit.startbit_servorange.range1, 舵机号, 舵机角度, 舵机运行时间)
        }
    }
    if (cmdType == startbit.startbit_getBluetoothCmdtype(startbit.startbit_CmdType.CAR_RUN)) {
        runCmdType = startbit.startbit_getArgs(recvCmdMsg, 1)
        if (runCmdType == startbit.startbit_getRunCarType(startbit.startbit_CarRunCmdType.STOP)) {
            bluetooth.uartWriteString("CMD|01|00|$")
            startbit.startbit_setMotorSpeed(0, 0)
        }
        if (runCmdType == startbit.startbit_getRunCarType(startbit.startbit_CarRunCmdType.GO_AHEAD)) {
            bluetooth.uartWriteString("CMD|01|01|$")
            startbit.startbit_setMotorSpeed(90, 90)
        }
        if (runCmdType == startbit.startbit_getRunCarType(startbit.startbit_CarRunCmdType.GO_BACK)) {
            bluetooth.uartWriteString("CMD|01|02|$")
            startbit.startbit_setMotorSpeed(-90, -90)
        }
        if (runCmdType == startbit.startbit_getRunCarType(startbit.startbit_CarRunCmdType.TURN_LEFT)) {
            bluetooth.uartWriteString("CMD|01|03|$")
            startbit.startbit_setMotorSpeed(90, -90)
        }
        if (runCmdType == startbit.startbit_getRunCarType(startbit.startbit_CarRunCmdType.TURN_RIGHT)) {
            bluetooth.uartWriteString("CMD|01|04|$")
            startbit.startbit_setMotorSpeed(-90, 90)
        }
    }
})
// Listen for bluetooth connections and show tick icon on connection
// When a message is received, set the flash speed and show it on the display
bluetooth.onBluetoothConnected(function () {
    bluetooth.startUartService()
    basic.showIcon(IconNames.Yes)
    basic.pause(500)
    connected = 1
})
// When client disconnects, show a cross icon
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
    connected = 0
})
input.onButtonPressed(Button.A, function () {
    startbit.startbit_setPixelRGBArgs(StartbitLights.Light1, randint(0, 9))
    startbit.startbit_showLight()
})
let connected = 0
let runCmdType = 0
let 舵机运行时间 = 0
let 舵机角度 = 0
let 舵机号 = 0
let cmdType = 0
let recvCmdMsg = ""
startbit.startbit_Init()
// Show a smiley face first to show that everything is setup
basic.showLeds(`
    . . # . .
    # . # # .
    . # # . .
    # . # # .
    . . # . .
    `)
basic.pause(500)
