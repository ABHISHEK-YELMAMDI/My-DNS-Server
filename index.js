const dgram = require('node:dgram'); // here i m create udp which is bydefault package in nodejs
const dnspacket = require('dns-packet');
const server = dgram.createSocket('udp4'); // udp 6r = rquire


const db ={
    'google.com':'1.2.3.4',
    'yelmadgiabhi.com':'4.5.6.7',

}


server.on('message', (msg, rinfo)=>{
    const incomingReq = dnspacket.decode(msg);
    const ipFromBd = db[incomingReq.questions[0].name];

    const ans = dnspacket.encode({
        type:'response',
        id: incomingReq.id,
        flags: dnspacket.AUTHORITATIVE_ANSWER,
        questions: incomingReq.questions,
        answer: [{
            type:'A',
            class: 'IN',
            name: incomingReq.questions[0].name,
            data: ipFromBd
        }]
    })

    server.send(ans, rinfo.port, rinfo.address)
})

server.bind(53,()=> console.log('DNS Server is running on port 53'))