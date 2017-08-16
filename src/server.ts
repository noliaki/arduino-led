import socket from 'socket.io'
import LED from './led'

import { AccelInterface } from './interface'

LED.init().then((): void => {
  listenStart()
})

function listenStart (): void {
  const io: SocketIO.Server = socket(8080)

  io
    .on('connect', (event) => {
      console.log('connect')
    })
    .on('connection', (socket: SocketIO.Socket) => {
      socket.on('onAccel', (data: AccelInterface) => {
        // console.log(data)
        if (typeof data.x !== 'number' || typeof data.y !== 'number' || typeof data.x !== 'number') {
          return
        }
        LED.accelToRGB(data)
      })
    })
}
