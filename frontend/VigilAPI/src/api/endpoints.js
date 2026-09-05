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