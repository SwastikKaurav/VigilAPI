import { Link } from "react-router-dom";  
import UpdateEndpointModal from "./UpdateEndpointModal";

export default function EndpointList({endpoints_prop, loading_prop, error_prop, onEndpointUpdated}){

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
                    </li>   
                ))}
            </ul>
        )}
    </>
    )
}