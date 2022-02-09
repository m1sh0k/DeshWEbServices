const { spawn,exec  } = require('child_process');
const path = require('path');
const fs = require('fs');
var HttpError = require('./../error').HttpError;
var AuthError = require('./../error').AuthError;
var DevError = require('./../error').DevError;


module.exports = function (app){

    app.post('/getConfig',async function(req, res, next){
        try{
            console.log('/getConfig');
            let data = await fs.promises.readFile('../DeshConfigs/config.json', {encoding: 'UTF-8'});
            console.log('/getConfig data: ',data);
            res.json(data);
        }catch (err) {
            return next(err);
        }
    })

    app.post('/getFileConfig',async function(req, res, next){
        try{
            console.log('/getFileConfig');
            let fileName = req.body.fileName;
            if(!fileName) return next(new HttpError(403, 'Invalid data request. You dont set file name.'));
            let fileConfig = await fs.promises.readFile('../../../DeshConfigs/'+fileName, {encoding: 'UTF-8'});
            res.sendFile(fileConfig);
        }catch(err){
            return next(err);
        }
    })

    app.post('/saveConfig',async function(req, res, next){
        try{
            let fileData = req.body.fileData;
            let fileName = req.body.fileName;
            if(!fileData || !fileName) return next(new HttpError(403, 'Invalid data request. You dont set file name or config data.'));
            await fs.promises.appendFile('../../../DeshConfigs/'+fileName, fileData + '\r',);
            res.sendStatus(200);
        }catch(err){
            return next(err);
        }
    })

    app.post('/runDeshServer', function (req, res) {

        const fileBat = path.join(__dirname,'../myPostgreSQL/StartDB.bat');//get link
        const bat = spawn(fileBat, { shell: true });//create child_process
        let config = path.join(__dirname,'../../../DeshConfigs/config.json');//server config file link
        console.log("fileJson: ",config.toString());
        config.toString();
        let dataObj = JSON.parse(config);
        console.log("dataObj: ",dataObj);
        let arrOfArgs = Object.values(dataObj.serverConfig);//server start arguments array
        console.log("arrObjJson: ",arrOfArgs);

        bat.stdout.on('data',arrOfArgs, (data) => {
            console.log("stdout: ",data.toString());
        });

        bat.stderr.on('data', (data) => {
            console.error("stderr: ",data.toString());
        });

        bat.on('exit', (code) => {
            console.log(`Child exited with code ${code}`);
        });
    })

    app.post('/stopDeshServer', function (req, res) {

        const fileBat = path.join(__dirname,'../myPostgreSQL/StopDB.bat');
        const bat = spawn(fileBat, { shell: true });

        bat.stdout.on('data', (data) => {
            console.log("stdout: ",data.toString());
        });

        bat.stderr.on('data', (data) => {
            console.error("stderr: ",data.toString());
        });

        bat.on('exit', (code) => {
            console.log(`Child exited with code ${code}`);
        });
    })

    //The 404 Route
    app.get('*', function(req, res){
        res.status(404).send('We are sorry but the page you are looking for does not exist.');
    });
}

