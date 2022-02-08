const { spawn,exec  } = require('child_process');
const path = require('path');


module.exports = function (app){

    app.post('/getConfig',function(req, res){
        let fileConfig = path.join(__dirname,'../../../DeshConfigs/config.json');
        res.sendFile(fileConfig);
    })

    app.post('/runBatFile', function (req, res) {

        const fileBat = path.join(__dirname,'../myPostgreSQL/StartDB.bat');
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

    app.post('/stopBatFile', function (req, res) {

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

