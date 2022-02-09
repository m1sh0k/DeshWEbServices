let getResource;
export default getResource = async function(...props){
    try {

        let res = await fetch(props.link,{
            method: props.method,
            body: JSON.stringify(props.data),
            headers:{'Content-Type': 'application/json',},
        });
        if(res.ok) {
            console.log("fetch res: ",res);
            res = await res.json();
            return res
        }
    } catch (err){
        console.log("login err: ",err);
        return err
    }
};