const app = require('./app');

const port = 5000;

app.listen(port, (res)=>{
    console.log("app listen on port "+ port);
});