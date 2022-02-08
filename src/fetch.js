async function getResource(){
    try {
        //e.preventDefault();
        //let data;
        let res = await fetch('/getConfig',{
            method:'post',
            //body: JSON.stringify(data),
            headers:{'Content-Type': 'application/json',},
        });
        if(res.ok) {
            res = await res.json();
            console.log("login res: ",res);
            sessionStorage.setItem('user', JSON.stringify(res.user));
            this.setState({ chatRedirect: true });
        } else {
            //Error message
        }
    } catch (err){
        console.log("login err: ",err);
        //Error message
    }
};