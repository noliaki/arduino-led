import five from 'johnny-five'
interface AccelInterface {
  x: number
  y: number
  z: number
}

export default class LED {
  public static board: five.Board = new five.Board()
  public static rgb: five.Led.RGB
  public static accelToColor: Function = (accel: AccelInterface): void => {
    LED.rgb.color({
      red: accel.x
      green: accel.y
      blue: accel.z
    })

    console.log(LED.rgb.color())
  }

  public static init = (): Promise<any> => {
    return new Promise((resolve, reject): any => {
      LED.board.on('ready', () => {
        LED.boardReady()
        resolve()
      })
    })
  }
  public static boardReady = (): void => {
    LED.rgb = new five.Led.RGB({
      pins: {
        red: 6,
        green: 5,
        blue: 3
      }
    })
    // LED.rgb.on()
  }

}

LED.init().then(() => {
  console.log('run')
  LED.accelToColor({x: 0, y: 255, z: 0})
})


// const board = new five.Board()

// board.on('ready', () => {
//   const led = new five.Led.RGB({
//     pins: {
//       red: 6,
//       green: 5,
//       blue: 3
//     }
//   })

//   const ledpin = new five.Led(3)

//   ledpin.fadeIn()
//   // this.repl.inject({
//   //   led: led
//   // })

//   led.color({
//     red: 0,
//     green: 10,
//     blue: 255
//   })
//   led.on()

//   let index = 0

//   const rainbow = ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#8F00FF"]

//   board.loop(500, function() {
//     led.color(rainbow[index++])
//     console.log(led.color())
//     if (index === rainbow.length) {
//       index = 0
//     }
//   })
// })
