import EndpointList from "../Components/EndpointList";
import NewEndpointModal from "../Components/newEndpointModal";
import { useState, useEffect } from "react";
import { getEndpoints } from "../api/endpoints"; 

export default function Dashboard(){
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

    function handleEndpointCreated(newEndpoint){
        setEndpoint([...endpoints, newEndpoint])
    }

    function handleEndpointUpdated(updatedEndpoint){
        setEndpoint(endpoints.map((each)=>
            each.id === updatedEndpoint.id ? updatedEndpoint:each
        ))
    }

    function handleEndpointDelete(endpoint_id){
        setEndpoint(endpoints.filter((each)=> each.id !== endpoint_id))
    }

    return(
        <>

            <NewEndpointModal onEndpointCreated={handleEndpointCreated}/>
            <EndpointList endpoints_prop={endpoints} loading_prop={loading} error_prop={error} onEndpointUpdated={handleEndpointUpdated} onEndpointDelete={handleEndpointDelete}/>
            
        </>
    )
}