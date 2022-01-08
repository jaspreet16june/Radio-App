import {RadioBrowserApi} from "radio-browser-api";
import AudioPlayer from "radio-browser-api";
import React , {useState, useEffect} from "react";
import defaultImage from "./image/radio.jpg";

let Audio = ()=>{
    const [stations,setStations] = useState();
    const [stationFilter,setStationFilter] = useState("all");
    
    useEffect(()=>{
        setUpApi(stationFilter).then((data) =>{
            setStations(data);
        });
    },[stationFilter]);

    const setUpApi = async (stationFilter)=>{
        const api = new RadioBrowserApi(fetch.bind(window),"My Radio App")
    
    // query stations by language code and limit to first 30 stations
    const stations = await api.searchStations({
        language:"english",
        limit: 30,
        tag:stationFilter
    }).then((data) => {
        return data;
      });
    console.log(stations)
    return stations;

}
    const filters = [
        "all",
        "classical",
        "country",
        "jazz",
        "pop",
        "disco",
        "dance",
        "rap",
        "house"
    ];
    const setDefaultSrc = (event) =>{
        event.target.src = defaultImage;
    }
    return (
        <div className="Audio">
            <div className = "filters">
                {/* <h1>Hello Kya hal</h1> */}
                {filters.map((filter)=>{
                    <span className ={stationFilter === filter ? "selected" : "notSeleted"} onClick={ () => setStationFilter(filter)}>{filter}</span>
                })}
            </div>
            <div className = "station">
                {stations && stations.map((station, index)=>{
                    return (
                        <div className="station" key ={index}>
                            <div className="stationName">
                                <img className="logo" src = {station.favicon} alt ="station name" onError={setDefaultSrc}/> 
                                <div>{station.name}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Audio;
