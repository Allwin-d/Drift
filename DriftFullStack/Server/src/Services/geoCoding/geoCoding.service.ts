import axios from "axios";


export type geoCodingType = {
    place_id : number,
    licence : string,
    osm_type : string,
    osm_id : number,
    lat : string,
    lon : string,
    category : string,
    type : string,
    place_rank : number,
    importance : number,
    addressType : string,
    name : string,
    display_name : string,
    address : {
        road : string,
        suburb : string,
        city : string,
        county : string,
        state_district : string,
        state : string,
        "ISO3166-2-1v14" : string,
        postcode : string,
        country : string,
        country_code : string,
    },
    boundingbox : string[]
}


const geoCoding = async (lat: number, lng: number) => {
  const GEO_CODING_API = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;
  try {
    const response = await axios.get(GEO_CODING_API,{
        headers : {
            "User-Agent" : "DriftApp/1.0(allwinselva7@gmail.com)"
        }
    });


  } catch (err) {

  }
};

export default geoCoding;
