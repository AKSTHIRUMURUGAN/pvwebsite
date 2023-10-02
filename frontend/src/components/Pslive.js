import { Fragment, useEffect, useState } from "react";
export default function Pslive(){
    return(
        <Fragment>
        <h1>Parking Status Live</h1>
<div className="info">
    Total Available Slots: <span id="total-available-slots">0</span><br/>
    Total Occupied Slots: <span id="total-occupied-slots">0</span><br/>
    Available Slots: <span id="available-slots"></span>
</div>
<div className="container" id="container">
<div className="parking-container" id="parking-container-1">
   
</div>
<div className="parking-container" id="parking-container-2">
    
</div>
<div className="parking-container" id="parking-container-3">
  
</div>
</div>

</Fragment>
    )
}