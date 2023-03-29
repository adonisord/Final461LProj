import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.js";

function HwAvailability() {
  const [availabilityArr, setAvailabilityArr] = useState([]);
  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    fetch("/get-all-availability")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setContentLoaded(true);
        const availabilities = [];
        for (let i = 0; i < data.length; i++) {
            availabilities.push(data[i]);
        }
        setAvailabilityArr(availabilities);
      })
      .catch((err) => console.log(err));
  }, []);

  if (contentLoaded) {
    if (availabilityArr.length > 0) {
        return (
            <>
                <Navbar />
                <div className="container center-container">
                    <div className="center-content">
                        {availabilityArr &&
                            availabilityArr.map((avail) => {
                                return (
                                    <div className="row" key={avail._id}>
                                        <div className="col">
                                            <h3>Hardware Set {avail.set}:</h3>
                                        </div>
                                        <div className="col">
                                            <h4 className="text-end">{avail.availability} / {avail.capacity}</h4>
                                        </div>
                                    </div>
                                );
                            }
                        )}
                    </div>
                </div>
            </>
        )
    } else {
        return(
            <>
                <Navbar />
                <div className="center-container">
                    <div className="center-contnt">
                        <h1>There are no hardware sets.</h1>
                    </div>
                </div>
            </>
        )
    }
  }
}

export default HwAvailability;
