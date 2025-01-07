import React from "react";
import {useParams} from 'react-router-dom'
import data from '../../DataSet/ResData.json';

function Info(){
  let {id} = useParams();
  let showData = data.filter((item) =>
    item.id.includes(id))
  return(
    <> 
     {
       showData.map((showing)=>(
       <div key={showing.id}>
        {showing.name}
        {showing.information}
       </div>
       ))
     }
    </>
  );
}
export default Info;