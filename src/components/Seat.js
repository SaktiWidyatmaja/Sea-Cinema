// import React, { useState, useEffect } from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import { Typography } from '@mui/material';

// export default function Seat({ selectedDateTime, setSelectedDateTime, seatPicked, setSeatPicked, movieId}) {
//   const [bookedSeats, setBookedSeats] = useState([]);
//   const [isDataLoaded, setIsDataLoaded] = useState(false); // Tambahkan state baru

//   useEffect(() => {
//     setSeatPicked([]);
    
//     // Fetch booked seats data from API
//     const fetchBookedSeats = async () => {
//       try {
//         if (selectedDateTime && movieId) {
//           const response = await fetch(`/api/seat-book/${movieId}/${selectedDateTime}`);
//           const data = await response.json();
//           let seatBooked=[]
//           data.forEach(curr => {
//             seatBooked=[...curr.seatNumbers, ...seatBooked]
//           });
          
//           setBookedSeats(seatBooked);
//           setIsDataLoaded(true); // Set state baru menjadi true ketika data sudah ter-load
//         }
        
//       } catch (error) {
//         console.error('Error fetching booked seats:', error);
//       }
//     };

//     fetchBookedSeats();
//   }, [movieId, selectedDateTime, setSeatPicked]);


//   // Check if a seat is booked
//   const isSeatBooked = (seatNumber) => {
//     return bookedSeats.some((bookedSeatNumber) => bookedSeatNumber === seatNumber);
//   };

//   // Toggle seat selection
//   const handleSeatClick = (seatNumber) => {
//     if (isSeatBooked(seatNumber)) return; // If seat is booked, do nothing

//     setSeatPicked((prevSeatPicked) => {
//       if (prevSeatPicked.includes(seatNumber)) {
//         return prevSeatPicked.filter((seat) => seat !== seatNumber); // Remove seat from selected seats
//       } else {
//         if (prevSeatPicked.length < 6) {
//           return [...prevSeatPicked, seatNumber]; // Add seat to selected seats if the limit is not reached
//         }
//         return prevSeatPicked; // If seat limit is reached, do not change selected seats
//       }
//     });
//   };

//   const renderSeats = () => {
//     if (!isDataLoaded) return null; // Jika data belum ter-load, jangan render apapun

//     const seats = [];
//     for (let i = 1; i <= 64; i++) {
//       const isDisabled = isSeatBooked(i);
//       const isPicked = seatPicked.includes(i);
//       // const isPicked = false;
//       const seatColor = isPicked ? 'success' : 'primary';

//       const buttonStyle = {
//         width: '10%',
//         margin: '5px',
//         marginBottom: '8px',
//         border: isPicked ? '5px solid success' : '5px solid primary',
//         borderWidth: '5px', // Mempertebal garis outline
//         color:{seatColor}
//       };

//       seats.push(
//         <Button
//           key={i}
//           variant="outlined"
//           color={seatColor}
//           disabled={isDisabled}
//           onClick={() => handleSeatClick(i)}
//           sx={buttonStyle}
//         >
//           {i}
//         </Button>
//       );
//     }
//     return seats;
//   };

//   return (
//     <Box gap={"10"}>
//       <Typography>
//         Choose Seats
//       </Typography>
//       {renderSeats()}
//     </Box>
//   );
// }

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

export default function Seat({ selectedDateTime, setSelectedDateTime, seatPicked, setSeatPicked, movieId }) {
  const [bookedSeats, setBookedSeats] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false); // Tambahkan state baru

  useEffect(() => {
    setSeatPicked([]);

    // Fetch booked seats data from API
    const fetchBookedSeats = async () => {
      try {
        console.log(movieId);
        console.log(selectedDateTime);
        if (selectedDateTime && movieId) {
          const response = await fetch(`/api/seat-book/${movieId}/${selectedDateTime}`);
          // const response = await fetch(`/api/seat-book/2/2023-08-12-12-00`);
          // localhost:3002/api/seat-book/2/2023-08-12-12-00 2023-08-06-12-00
          const data = await response.json();
          let seatBooked = [];
          data.forEach((curr) => {
            seatBooked = [...curr.seatNumbers, ...seatBooked];
          });

          setBookedSeats(seatBooked);
          setIsDataLoaded(true); // Set state baru menjadi true ketika data sudah ter-load
        }
      } catch (error) {
        console.error('Error fetching booked seats:', error);
      }
    };

    fetchBookedSeats();
  }, [movieId, selectedDateTime, setSeatPicked]);

  // Check if a seat is booked
  const isSeatBooked = (seatNumber) => {
    return bookedSeats.some((bookedSeatNumber) => bookedSeatNumber === seatNumber);
  };

  // Toggle seat selection
  const handleSeatClick = (seatNumber) => {
    if (isSeatBooked(seatNumber)) return; // If seat is booked, do nothing

    setSeatPicked((prevSeatPicked) => {
      if (prevSeatPicked.includes(seatNumber)) {
        return prevSeatPicked.filter((seat) => seat !== seatNumber); // Remove seat from selected seats
      } else {
        if (prevSeatPicked.length < 6) {
          return [...prevSeatPicked, seatNumber]; // Add seat to selected seats if the limit is not reached
        }
        return prevSeatPicked; // If seat limit is reached, do not change selected seats
      }
    });
  };

  const renderSeats = () => {
    if (!isDataLoaded) return null; // Jika data belum ter-load, jangan render apapun

    const seats = [];
    for (let i = 1; i <= 64; i++) {
      const isDisabled = isSeatBooked(i);
      const isPicked = seatPicked.includes(i);
      // const isPicked = false;
      const seatColor = isPicked ? 'success' : 'primary';

      const buttonStyle = {
        width: '100%',
        height: '100%',
        margin: '2px',
        border: isPicked ? '5px solid success' : '5px solid primary',
        borderWidth: '5px', // Mempertebal garis outline
      };

      seats.push(
        <Button
          key={i}
          variant="outlined"
          color={seatColor}
          disabled={isDisabled}
          onClick={() => handleSeatClick(i)}
          // sx={{ width: '12.5%', marginBottom: '8px' }}
          sx={buttonStyle}
        >
          {i}
        </Button>
      );
    }
    return seats;
  };

  return (
    <Box width={1 / 8} height={1 / 8}>
      <Typography>Choose Seats</Typography>
      <Box display="grid" gridTemplateColumns="repeat(8, 1fr)" padding={"10px"} sx={{gap:"10"}} width="100%" height="100%">
        {renderSeats()}
      </Box>
    </Box>
  );
}
