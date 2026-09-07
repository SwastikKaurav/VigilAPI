import { useState } from "react";
import { createEndpoint } from "../api/endpoints";

export default function NewEndpointModal(){
    let [name, setName] = useState("");
    let [url, setUrl] = useState("");
    let [pingInterval, setPingInterval] = useState("");

    function handleNameChange(e){
        setName(e.target.value);
    }

    function handleUrlChange(e){
        setUrl(e.target.value);
    }

    function handlePingIntervalChange(e){
        setPingInterval(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        let data = {"name":name, "url":url, "ping_interval":parseInt(pingInterval)};
        createEndpoint(data);
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
            
                <button type="submit">Submit</button>
            </form>
        </>
    )
}