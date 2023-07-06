import { connectToDB } from "@/utils/database";
import SeatBook from "@/models/seat-book"

export const GET = async (request) => {
  try {
    await connectToDB()
    const seatBook = await SeatBook.find({})

    return new Response(JSON.stringify(seatBook), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch seat book");
  }
}

export const POST = async (request) => {
  const {bookerName, bookerAge, movieId, time, seatNumbers} = await request.json();
  try {
    await connectToDB();
  
    const newSeatBook = new SeatBook({
      movieId: movieId,
      time: time, 
      bookerName: bookerName, 
      bookerAge: bookerAge, 
      seatNumbers: seatNumbers, 
      token: `${movieId}-${time}-${seatNumbers[0]}`,
    })
    await newSeatBook.save();
    
    return new Response(JSON.stringify(newSeatBook), { status: 201 })
  } catch (error) {
    console.log(error);
    return new Response("Failed to create a new book", { status: 500});
  }
}
