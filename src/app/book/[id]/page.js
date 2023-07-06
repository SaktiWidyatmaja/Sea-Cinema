"use client"

import Box from "@mui/material/Box"
import Payment from "@/components/Payment.js"
import Seat from "@/components/Seat.js"
import { useState } from "react"

export default function BookMovie ({ params }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [seatPicked, setSeatPicked] = useState([]);
  const [price, setPrice] = useState(0);
  const { id } = params;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
      <Box sx={{flex: '1 1 30%', backgroundColor: 'white'}}>
        <Payment 
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedDateTime={selectedDateTime}
          setSelectedDateTime={setSelectedDateTime}
          selectedTime={selectedTime}
          seatPicked={seatPicked}
          setSelectedTime={setSelectedTime}
          movieId={id}      
        />
      </Box>
      <Box backgroundColor={'white'} sx={{flex: '1 1 70%'}}>
        <Seat
          seatPicked={seatPicked}
          setSeatPicked={setSeatPicked}
          selectedDateTime={selectedDateTime}
          setSelectedDateTime={setSelectedDateTime}
          movieId={id}      
        />
      </Box>
    </Box>
);
}