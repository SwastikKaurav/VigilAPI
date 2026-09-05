export async function getEndpoints(){
    let response = await fetch("http://localhost:8000/endpoints/")
    if (response.ok){
        let data = await response.json();
        return data;
    }
    else{
        throw new Error(response.status)
    }
}

export async function getPings(endpoint_id){
    let response = await fetch(`http://localhost:8000/endpoints/${endpoint_id}/pings`)
    if(response.ok){
        let data = await response.json();
        return data;
    }
    else{
        throw new Error(response.status)
    }
}

async function pings(){
    let data = await getPings()
    console.log(data)
}
pings()