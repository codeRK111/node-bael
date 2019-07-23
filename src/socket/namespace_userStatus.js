import IP from '../models/User_IP'
export default (io, counter) => {
    io.of('/status').on('connection', (socket) => {
        counter.increaseUserCount()
        socket.on('disconnect', function() {
            counter.decreaseUserCount()
            console.log("counter",counter.userCount)
        })

        console.log("counter",counter.userCount)
    })
}
