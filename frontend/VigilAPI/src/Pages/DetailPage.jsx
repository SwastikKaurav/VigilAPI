import { useParams } from "react-router-dom";
import { getPings } from "../api/endpoints"
import { useEffect, useState } from "react"


export default function DetailPage(){
    let [pings, setPings] = useState([]);
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState(false);

    let { id } = useParams();
    useEffect(()=>{
        async function fetchPings(){
            try{
                let response = await getPings(id);
                setLoading(false);
                setPings(response);
            }
            catch (e){
                setError(true);
                setLoading(false);
            }
        }
        fetchPings();
    },[])

    return(
        <>  
            {loading && <p>Loading...</p>}
            {error && <p>Something went wrong</p>}
            {!loading && !error && <pre>{JSON.stringify(pings, null, 2)}</pre>}
        </>
    )
}