import { connectToDB } from "@/utils/database";
import { initializeBalance } from "@/utils/init-balance";
import Balance from "@/models/balance"

export const GET = async (request) => {
  try {
    await connectToDB()
    initializeBalance(1000000);
    const balance = await Balance.findOne({})

    return new Response(JSON.stringify(balance), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch balance");
  }
}

export const PATCH = async (request) => {
  const { balance } = await request.json();
  try {
    await connectToDB();
  
    const updatedBalance = await Balance.findOneAndUpdate({}, { balance }, { new: true });

    if (balance <= 0) {
      return new Response("Balance must be a positive number", { status: 400 });
    }
          
    return new Response(JSON.stringify(updatedBalance), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to update balance", { status: 500 });
  }
};
