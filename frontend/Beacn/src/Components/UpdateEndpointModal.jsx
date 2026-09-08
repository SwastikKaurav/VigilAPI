import { useState } from "react";
import { updateEndpoint } from "../api/endpoints";

export default function UpdateEndpointModal({endpoint, onEndpointUpdated}){
    let [name, setName] = useState(endpoint.name);
    let [url, setUrl] = useState(endpoint.url);
    let [pingInterval, setPingInterval] = useState(endpoint.ping_interval);
    
    function handleNameChange(e){
        setName(e.target.value);
    }
    
    function handleUrlChange(e){
        setUrl(e.target.value);
    }
    
    function handlePingIntervalChange(e){
        setPingInterval(e.target.value);
    }
    
    async function handleSubmit(e){
        e.preventDefault();
        let data = {"name":name, "url":url, "ping_interval":parseInt(pingInterval)};
        let response = await updateEndpoint(endpoint.id, data);
        onEndpointUpdated(response);
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <label>Name : </label>
                <input value={name} onChange={handleNameChange}/>

                <label>URL : </label>
                <input value={url} onChange={handleUrlChange}/>

                <label>Ping Interval : </label>
                <input value={pingInterval} onChange={handlePingIntervalChange} type="number"/>
            
                <button type="submit">Update</button>
            </form>
        </>
    )
}