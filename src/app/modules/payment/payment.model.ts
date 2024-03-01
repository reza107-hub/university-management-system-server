import { Schema, model } from 'mongoose';
import { TPayment } from './payment.interface';

const paymentSchema = new Schema<TPayment>(
  {
    email: { type: String, required: true },
    feeType: { type: String, required: true },
    trans_id: { type: String, required: true },
    fee: { type: Number, required: true },
    paidStatus: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

const Payment = model<TPayment>('Payment', paymentSchema);

export default Payment;
