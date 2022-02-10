let getResource;
export default getResource = async function(props){
    try {
        console.log("getResource: ",props);
        let res = await fetch(props.link,{
            method: props.method,
            body: JSON.stringify(props.data),
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest'
            },
        });

        if(res.ok) {
            console.log("fetch res: ",res);
            res = await res.json();
            return ({err:null, res:res})
        }else{
            console.log("fetch err res: ",res);
            res = await res.json();
            return ({err:res, res:null})
        }
    } catch (err){
        console.log("fetch err: ",err);
        return ({err:err, res:null})
    }
};