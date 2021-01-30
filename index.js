const port = process.env.PORT || 3000 ;
const USE_COLORS = true;

const express = require('express');
const cors = require('cors');
const chalk = require('chalk');

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const INFO = "info";
const WARN = "warn";
const ERROR = "error";


app.post('/', (req, res) => {
  const {timestamp, message, severity} = req.body;
  let context =`[${new Date(timestamp).toISOString()}][${severity.toUpperCase()}]`; 
  
  if(USE_COLORS){
    if(severity === INFO){
        context = chalk.green(context);
    }
    if(severity === WARN){
        context = chalk.yellow(context);
    }
    if(severity === ERROR){
        context = chalk.red(context);
    }
 }
  
  console.log(`${context} ${message}`);
  res.json({});
})

app.listen(port, () => {
  console.log(`Logs server listening at http://localhost:${port}`)
})
