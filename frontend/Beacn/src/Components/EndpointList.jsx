import { Link } from "react-router-dom";  
import UpdateEndpointModal from "./UpdateEndpointModal";
import { deleteEndpoint } from "../api/endpoints";

export default function EndpointList({endpoints_prop, loading_prop, error_prop, onEndpointUpdated, onEndpointDelete}){

    async function handleDelete(endpoint_id){
        try{
            let data = await deleteEndpoint(endpoint_id);
            onEndpointDelete(endpoint_id);
        }
        catch(e){
            alert("Failed to delete endpoint");
        }
    }
   return (
    <>
        {loading_prop && <p>Loading...</p>}
        {error_prop && <p>Something went wrong</p>}
        {!loading_prop && !error_prop && (
            <ul>
                {endpoints_prop.map((endpoint) => (
                    <li key={endpoint.id}>
                        <Link to={`/endpoints/${endpoint.id}`}>
                            <p>{endpoint.name}</p>
                            <p>{endpoint.url}</p>
                            <p>{endpoint.ping_interval}</p>
                        </Link>
                        <UpdateEndpointModal endpoint={endpoint} onEndpointUpdated={onEndpointUpdated}/>
                        <button onClick={() => handleDelete(endpoint.id)}>Delete</button>
                    </li>   
                ))}
            </ul>
        )}
    </>
    )
}