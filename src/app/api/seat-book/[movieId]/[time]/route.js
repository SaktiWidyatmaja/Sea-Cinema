import SeatBook from "@/models/seat-book";
import { connectToDB } from "@/utils/database"

export const GET = async (request, {params}) => {
  await connectToDB();
  const { movieId, time } = params;
  try {
    const seatBooks = await SeatBook.find({ movieId, time});
    return new Response(JSON.stringify(seatBooks), {status: 200})
  } catch (error) {
    return new Response("Movie and time not found", {status: 500});
  }
}