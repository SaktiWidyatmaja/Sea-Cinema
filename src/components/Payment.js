import React, { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { Box, Button, Snackbar, Typography, TextField } from '@mui/material';

const availableTimes = [
  { label: '12:00', value: '12:00' },
  { label: '15:00', value: '15:00' },
  { label: '18:00', value: '18:00' },
];

export default function Payment({seatPicked, movieId, selectedDate, setSelectedDate, selectedDateTime, setSelectedDateTime, selectedTime, setSelectedTime}) {
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const router = useRouter();
  const handleTimeChange = (value) => {
    setSelectedTime(value);
  };
  const [bookerName, setBookerName] = useState('');
  const [bookerAge, setBookerAge] = useState('');
  const [movie, setMovie] = useState();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isBalanceInsufficient, setIsBalanceInsufficient] = useState(false);

  const fetchMovies = async () => {
    const response = await fetch("https://seleksi-sea-2023.vercel.app/api/movies");
    const data = await response.json();
    
    setMovie(data[movieId]);
  };

  useEffect(() => {
    fetchMovies();
  })
  useEffect(() => {
    if (selectedDate && selectedTime) {
      const [hours, minutes] = selectedTime.split(':').map(Number);
      const selectedDateTimeObj = new Date(
        selectedDate.$y,
        selectedDate.$M,
        selectedDate.$D,
        hours,
        minutes
      );
      const formattedDateTime = format(selectedDateTimeObj, 'yyyy-MM-dd-HH-mm');
      setSelectedDateTime(formattedDateTime)
    }
    
  }, [seatPicked, selectedDate, selectedDateTime, selectedTime, setSelectedDateTime]) 

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = async () => {
    if (selectedDate && selectedTime) {
      if (parseInt(bookerAge) >= movie.age_rating) {
        const [hours, minutes] = selectedTime.split(':').map(Number);
        const selectedDateTimeObj = new Date(
          selectedDate.$y,
          selectedDate.$M,
          selectedDate.$D,
          hours,
          minutes
          );
        const formattedDateTime = format(selectedDateTimeObj, 'yyyy-MM-dd-HH-mm');
        const seatNumbers = await seatPicked.slice();
        
        try {
          // Panggil API untuk memeriksa saldo
          const balanceResponse = await fetch("/api/balance");
          const balanceData = await balanceResponse.json();
          const ticketPrice = movie.ticket_price * seatPicked.length;
  
          if (balanceData.balance >= ticketPrice) {
          // Lakukan pemesanan
            await fetch("/api/seat-book/", {
              method: "POST",
              body: JSON.stringify({
                movieId: movieId,
                time: formattedDateTime,
                bookerName: bookerName,
                bookerAge: bookerAge,
                seatNumbers: seatNumbers,
              }),
            });

            // Panggil API untuk melakukan penarikan balance
            await fetch("/api/balance", {
              method: "PATCH",
              body: JSON.stringify({ balance: balance - movie.ticket_price * seatPicked.length }),
              headers: {
                "Content-Type": "application/json",
              },
            });

            router.push("/");
          } else {
            setIsBalanceInsufficient(true);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        // Tampilkan pesan kesalahan
        setOpenSnackbar(true);
      }

    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
      <Typography>
          Description
          <br/>
          {movie ? movie.description : null}
      </Typography>
      <Typography>
          Age Rating
          <br/>
          {movie ? movie.age_rating : null}
      </Typography>
      </Box>
      <DatePicker
        value={selectedDate}
        onChange={handleDateChange}
        renderInput={(params) => <input {...params} />}
        disablePast
      />
      <div>
        {availableTimes.map((timeOption) => (
          <button
            key={timeOption.value}
            onClick={() => handleTimeChange(timeOption.value)}
            style={{
              margin: '5px',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              backgroundColor: selectedTime === timeOption.value ? 'green' : 'lightgray',
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            {timeOption.label}
          </button>
        ))}
      </div>
      <br/>

      <Typography>
          Price: 
          {(seatPicked.length && movie) ? movie.ticket_price * seatPicked.length : 0}
      </Typography>
      <br/>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={bookerName}
          onChange={(e) => setBookerName(e.target.value)}
          sx={{ marginBottom: '10px' }}
        />
        <TextField
          label="Age"
          value={bookerAge}
          onChange={(e) => setBookerAge(e.target.value)}
          sx={{ marginBottom: '10px' }}
        />
        <br/>
        <Button onClick={handleSubmit} variant="outlined">
          Book
        </Button>
        <Snackbar
          open={isBalanceInsufficient}
          autoHideDuration={3000}
          onClose={() => setIsBalanceInsufficient(false)}
          message="Saldo Anda tidak mencukupi untuk melakukan pemesanan"
        />
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message="Anda tidak memenuhi batasan usia untuk melakukan pemesanan"
        />

      </form>
    </LocalizationProvider>
  );
}
