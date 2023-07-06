import { connectToDB } from "@/utils/database";
import SeatBook from "@/models/seat-book"

export const DELETE = async (request, {params}) => {
  try {
    await connectToDB();
    await SeatBook.findOneAndRemove({ token: params.token });

    return new Response("Transaction deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to cancel seat book");
  }
}