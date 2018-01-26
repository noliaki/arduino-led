import five from 'johnny-five'
import requestAnimationFrame from 'raf'
import { AccelInterface } from './interface'

export default class LED {
  private static R: number = 0
  private static G: number = 0
  private static B: number = 0

  private static rgb: five.Led.RGB
  private static board: five.Board = new five.Board()

  public static init (): Promise<any> {
    return new Promise((resolve, reject): any => {
      LED.board.on('ready', () => {
        LED.boardReady()
        resolve()
      })
    })
  }

  public static accelToRGB (accel: AccelInterface = { x: 0, y: 0, z: 0}): string {
    LED.R += Math.abs((accel.x) / 5)
    LED.G += Math.abs((accel.y) / 5)
    LED.B += Math.abs((accel.z) / 5)

    if ( LED.R > 255 ) {
      LED.R = 255
    }
    if ( LED.G > 255 ) {
      LED.G = 255
    }
    if ( LED.B > 255 ) {
      LED.B = 255
    }

    const r: string = `00${Math.floor(LED.R).toString(16)}`.slice(-2)
    const g: string = `00${Math.floor(LED.G).toString(16)}`.slice(-2)
    const b: string = `00${Math.floor(LED.B).toString(16)}`.slice(-2)

    return `#${r}${g}${b}`
  }

  private static boardReady () {
    LED.rgb = new five.Led.RGB({
      pins: [6, 3, 5]
    })

    LED.decleaseRGB()
    LED.board.loop(50, () => {
      LED.rgb.color(LED.accelToRGB() as any)
    })
  }

  private static decleaseRGB (): void {
    LED.R -= 1
    LED.G -= 1
    LED.B -= 1

    if (LED.R < 0) {
      LED.R = 0
    }
    if (LED.G < 0) {
      LED.G = 0
    }
    if (LED.B < 0) {
      LED.B = 0
    }

    console.log(LED.R, LED.G, LED.B)

    requestAnimationFrame(LED.decleaseRGB)
  }
}
