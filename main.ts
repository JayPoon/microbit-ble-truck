bluetooth.onUartDataReceived(serial.delimiters(Delimiters.Dollar), function () {
    let cmdType = 0
    message = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Dollar))
    basic.showString(message)
    basic.showString("" + (cmdType))
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
let message = ""
startbit.startbit_Init()
// Show a smiley face first to show that everything is setup
basic.showIcon(IconNames.Happy)
basic.pause(500)
