
import IP from "../models/User_IP"
const people = {}
export default (io,adminOnline) => {
    io.of('/user').on('connection', (socket) => {
         

        // When a client disconnect
          socket.on('disconnect', function() {
              console.log('usedcdcr ')
          })
      
        //   socket.on('set_info', (data) => {
        //       if (data.name == 'admin') {
        //           admin = socket.id
        //           console.log('admin connected')
        //       }
        //       io.to(people[data.r]).emit('new_msg', { msg: data.msg })
        //   })
      
          socket.on('admin_msg', (data) => {
              
              IP.findById(data.to).then((res) => {
                  io.to(res.socket_id).emit('new_msg', { msg: data.msg })
              })
          })
      
          socket.on('update_id', (data) => {
              IP.findOne({ ip: data.ip }).then((p) => {
                  if (p) {
                      IP.findOneAndUpdate(
                          { ip: p.ip },
                          {
                              $set: {
                                  socket_id: socket.id,
                              },
                          }
                      )
                          .then((res) => console.log('updated', res))
                          .catch((err) => console.log('error', err))
                      // io.to(admin).emit("admin_msg", { msg: data.msg, json: data.r,id:p._id });
                  }
              })
          })
      
          socket.on('new_msg', (data) => {
               console.log("ip", data.r.ip);
               console.log("adminOnline", adminOnline.adminCount);
              IP.findOne({ ip: data.r.ip }).then((p) => {
                  if (p) {
                      if (adminOnline.adminCount !== 0) {
                          io.of('/admin').emit('admin_msg', {
                              msg: data.msg,
                              json: data.r,
                              id: p._id,
                          })
                      } else {
                          io.of('/user')
                              .to(p.socket_id)
                              .emit('new_msg', {
                                  msg:
                                      'Sorry , we could not find anything for you , please visit after some time',
                              })
                          io.of('/user')
                              .to(p.socket_id)
                              .emit('reset', {})
                      }
                  } else {
                      const newIp = new IP({
                          ip: data.r.ip,
                          socket_id: socket.id,
                      })
      
                      newIp
                          .save()
                          .then((res) => {
                              if (adminOnline.adminCount !== 0) {
                                  people[data.r] = socket.id
                                  to = socket.id
                                  var id = res._id
                                  io.of('/admin').emit('admin_msg', {
                                      msg: data.msg,
                                      json: data.r,
                                      id,
                                  })
                              } else {
                                  io.to(p.socket_id).emit('new_msg', {
                                      msg:
                                          'Sorry , we could not find anything for you , please visit after some time',
                                  })
                                  io.to(p.socket_id).emit('reset', {})
                              }
                          })
                          .catch((error) => console.log('error', error))
                  }
              })
          })
      
          console.log('id', socket.id)
      })
}