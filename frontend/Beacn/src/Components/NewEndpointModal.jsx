import { useState } from "react";
import { createEndpoint } from "../api/endpoints";

export default function NewEndpointModal({onEndpointCreated}){
    let [name, setName] = useState("");
    let [url, setUrl] = useState("");
    let [pingInterval, setPingInterval] = useState("");
    let [isAdding, setIsAdding] = useState(false);

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
        let response = await createEndpoint(data);
        onEndpointCreated(response);
        setIsAdding(false);
    }

    function handleAdding(){
        setIsAdding(true);
    }
    return(
        <>
            {isAdding ?
            <form onSubmit={handleSubmit}>
                <label>Name : </label>
                <input value={name} onChange={handleNameChange}/>

                <label>URL : </label>
                <input value={url} onChange={handleUrlChange}/>

                <label>Ping Interval : </label>
                <input value={pingInterval} onChange={handlePingIntervalChange} type="number"/>
            
                <button type="submit">Submit</button>
            </form>
            : <button onClick={handleAdding}>Add Endpoint</button>
            }
        </>
    )
}