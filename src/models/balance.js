import { Schema, model, models } from 'mongoose'

const balanceSchema = new Schema({
  balance: {
    type: Number,
    required: true
  }
});

const Balance = models.Balance || model('Balance', balanceSchema);
export default Balance;
