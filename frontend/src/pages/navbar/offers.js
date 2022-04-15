import React from "react";
import { useNavigate } from "react-router-dom";

export default function Offers() {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = "../";
        navigate(path);
    };

    return (
        <div className="parentoffer">
            <div className="subtitle1">
                <marquee direction="left" scrollamount="10">
                    Book a ride from Jingo to get excited offers
                </marquee>
            </div>

            {/* <div className='subtitle3'>
		<marquee scrollamount="10" direction='down'>Book a ride from rentech to get excited offers.</marquee>
     </div>

	   <div className='subtitle2'>
		<marquee scrollamount="10" direction='up'>Book a ride from rentech to get excited offers.</marquee>
     </div> */}

            <div className="childoffer">
                <div className="textpart">
                    <div className="title">April Offers</div>

                    <div className="lists">
                        <ul style={{ listStyleType: "circle" }}>
                            <li>
                                Get a free bike ride upto 2 hours on your first
                                car ride.
                            </li>
                            <div className="listspace">
                                <li>
                                    Flat <b>25%</b> discount on your second bike
                                    ride.
                                </li>
                            </div>
                        </ul>
                    </div>
                    <button onClick={routeChange} className="offerbtn">
                        Avail now
                    </button>
                </div>

                <div className="subparent">
                    <div className="outer">
                        <div className="inner">
                            <div className="caroffer">
                                <div className="coimg"></div>

                                <div className="fcr">
                                    <h1>
                                        "Free bike ride" upto <b> 2 hours</b> on
                                        your first car ride.{" "}
                                    </h1>
                                    <p>
                                        <button onClick={routeChange}>
                                            Take a ride
                                        </button>
                                    </p>
                                </div>
                            </div>

                            <div className="bikeoffer">
                                <div className="boimg"></div>

                                <div className="fbr">
                                    <h1>
                                        Flat 25% off on your second bike ride
                                    </h1>
                                    <p>
                                        <button onClick={routeChange}>
                                            Take a ride
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        //     <div className='parentoffer'>

        //        <div className='subtitle1'>
        // 		<marquee direction='right' scrollamount="10">Book a ride from rentech to get excited offers.</marquee>
        //        </div>

        // 	   <div className='subtitle3'>
        // 		<marquee scrollamount="10" direction='down'>Book a ride from rentech to get excited offers.</marquee>
        //      </div>

        // 	   <div className='subtitle2'>
        // 		<marquee scrollamount="10" direction='up'>Book a ride from rentech to get excited offers.</marquee>
        //      </div>

        // 		<div className='childoffer'>

        // 		 <div className='textpart'>
        //        <div className='title'>
        // 		April Offers
        //       </div>

        //      <div className='lists'>
        //      <ul style={{listStyleType:'circle'}}>
        // 		 <li>Get a free bike ride upto 2 hours on your first car ride.</li>
        // 		 <div className='listspace'>
        // 		 <li>Flat <b>25%</b> discount on your second bike ride.</li>
        // 		 </div>
        // 	 </ul>
        // 	 </div>
        // 	 <button onClick={routeChange} className='offerbtn'>Avail now</button>
        // 	 </div>

        //      <div className='subparent'>

        //     <div className='outer'>

        // 		<div className='inner'>

        //       <div className='caroffer'>

        // 		  <div className='coimg'></div>

        //         <div className='fcr'>
        // 		 <h1>"Free bike ride" upto <b> 2 hours</b> on your first car ride. </h1>
        // 		 <p><button onClick={routeChange}>Take a ride</button></p>
        //         </div>

        // 	  </div>

        // 	  <div className='bikeoffer'>

        // 		  <div className='boimg'></div>

        // 		  <div className='fbr'>
        // 			  <h1>Flat 25% off on your second bike ride</h1>
        // 			  <p><button onClick={routeChange}>Take a ride</button></p>
        // 		  </div>
        // 	  </div>

        // 	  </div>
        // 	  </div>
        //      </div>
        //     </div>
        // </div>
    );
}
