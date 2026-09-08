import ws from 'ws';

const wss = new ws.Server({
    port:5001,

},()=>console.log("Web socket"))