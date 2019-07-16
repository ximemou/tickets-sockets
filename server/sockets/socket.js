const { io } = require('../server');
const {TicketControl} = require ('../classes/ticket-control');

const ticketControl = new TicketControl();
io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback)=> {
       let siguienteTicket= ticketControl.siguienteTicket();
        console.log(siguienteTicket);
        callback(siguienteTicket);
    });

    client.emit('estadoActual',{
        actual: ticketControl.obtenerUltimoTicket(),
        ultimos4: ticketControl.obtenerUltimos4()
    });

    client.on('atenderTicket', (data, callback) =>{
        if(!data.escritorio){
            return callback({
                err:true,
                mensaje: 'El numero de escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);

        //notificar cambios en los ultimos 4

        client.broadcast.emit('ultimos4',{
            ultimos4: ticketControl.obtenerUltimos4()
        });
    });

});