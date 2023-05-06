import React from 'react'
import { useLocation } from "react-router-dom";

function FishTankDetails() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  
  return (
    <div>FishTankDetails {id}</div>
  )
}

export default FishTankDetails