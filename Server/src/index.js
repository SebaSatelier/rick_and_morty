const {server}= require('./app')
const {conn} = require('./DB_connection')

const PORT = 3001;
            
server.listen(PORT,async () => {
    console.log(`Server raised in port : ${PORT}`);
    await conn.sync({force: true});
});  