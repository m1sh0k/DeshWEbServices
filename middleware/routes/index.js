const { spawn,exec  } = require('child_process');


module.exports = function (app){
    app.get('/runBatFile', function (req, res) {

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

    app.get('/stopBatFile', function (req, res) {

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
}

