import IP from '../models/User_IP'
export default (io, adminOnline) => {
    io.of('/admin').on('connection', (socket) => {
        adminOnline.increaseAdmin()
        socket.on('disconnect', function() {
            adminOnline.decreaseAdmin()
        })

        socket.on('admin_msg', (data) => {
           console.log("inside admin_msg",data)

            IP.findById(data.to).then((res) => {
                console.log("idd",res.socket_id)
                io.of('/user')
                    .to(res.socket_id)
                    .emit('new_msg', { msg: data.msg })
            }).catch(error => {
                console.log("error",error)
            })
        })
    })
}
