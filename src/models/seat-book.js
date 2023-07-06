import { Schema, model, models } from 'mongoose'

export const SeatSchema = new Schema(
  {
    movieId: {
      type: Number,
      required: [true, 'Id is required!'],
    },
    time: {
      type: String,
      required: [true, 'Time is required!'],
    }, 
    bookerName: {
      type: String,
      required: [true, 'Booker name is required!'],
    }, 
    bookerAge: {
      type: Number,
      required: [true, 'Age is required!'],
    }, 
    seatNumbers: {
      type: [Number],
      required: [true, 'Seat number is required!'],
    }, 
    token: {
      type: String,
      required: true,
      unique: true, 
    },
  }
)

const Seat = models.seat || model("seat", SeatSchema);

export default Seat;
