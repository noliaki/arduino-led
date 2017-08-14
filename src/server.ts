import socket from 'socket.io'
import LED from './led'
interface AccelInterface {
  x: number
  y: number
  z: number
}

const io: SocketIO.Server = socket(8080)

io
  .on('connect', (event) => {
    console.log('connect')
  })
  .on('connection', (socket: SocketIO.Socket) => {
    console.log('connect!')
    socket.on('onAccel', (data: AccelInterface) => {
      LED.accelToColor(data)
    })
  })
