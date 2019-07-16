
const fs = require('fs');

class Ticket{
    constructor(numero, escritorio){
       this.numero= numero;
       this.escritorio= escritorio;
    }
}

class TicketControl {

    constructor(){
        this.ultimo =0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 =[];
        let data = require('../data/data.json');
        
        if( data.hoy === this.hoy){

            this.ultimo = data.ultimo;
            this.tickets=data.tickets;
            this.ultimos4 = data.ultimos4;
        }else{
           this.reiniciarConteo();
        }
    }

    reiniciarConteo(){
       this.ultimo =0;
       this.tickets =[];
       this.ultimos4 = [];
       console.log("Se ha inicializado el sistema");
       this.grabarArchivo();
    }


    grabarArchivo(){
        let jsonData = {
            ultimo: this.ultimo,
            hoy:this.hoy,
            tickets: this.tickets,
            ultimos4:this.ultimos4
        };
        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
        
    }

    siguienteTicket(){
       this.ultimo += 1;
       let ticket = new Ticket(this.ultimo, null);
       this.tickets.push(ticket);
       this.grabarArchivo();
       return `Ticket ${this.ultimo}`;

    }

    obtenerUltimoTicket(){
        return `Ticket ${this.ultimo}`;
    }

    obtenerUltimos4(){
        return this.ultimos4;
    }

    atenderTicket(escritorio){
        if(this.tickets.length ===0){
            return 'No hay tickets';     
        }
        let numeroTicket = this.tickets[0].numero;
        //borro el primer elemento
        this.tickets.shift();
        let atenderTicket = new Ticket(numeroTicket,escritorio);
        //lo agrego al principio del arreglo
        this.ultimos4.unshift(atenderTicket);
        if(this.ultimos4.length>4){
            this.ultimos4.splice(-1,1); //borra el ultimo
        }
        this.grabarArchivo();
        return atenderTicket;
    }
}

module.exports = {
    TicketControl
}