import { useState, useEffect } from "react";
import { getEndpoints } from "../api/endpoints";  
import { Link } from "react-router-dom";  

export default function EndpointList(){
    let [endpoints, setEndpoint] = useState([]);
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState(false);

    useEffect(()=>{
        async function fetchData(){
            try{
                let endpoint_list = await getEndpoints();
                setLoading(false);
                setEndpoint(endpoint_list)
            }
            catch (e){
                setError(true);
                setLoading(false);
            }
        }
        fetchData();
    },[])

   return (
    <>
        {loading && <p>Loading...</p>}
        {error && <p>Something went wrong</p>}
        {!loading && !error && (
            <ul>
                {endpoints.map((endpoint) => (
                    <li key={endpoint.id}>
                        <Link to={`/endpoints/${endpoint.id}`}>
                            <p>{endpoint.name}</p>
                            <p>{endpoint.url}</p>
                            <p>{endpoint.ping_interval}</p>
                        </Link>
                    </li>   
                ))}
            </ul>
        )}
    </>
    )
}