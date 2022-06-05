import mongoose from 'mongoose';

const orderModelSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        slug: { type: String, required: true },
        name: { type: String, required: true },
        quanitity: { type: Number, required: true },
        image: { type: String, required: true },
        Price: { type: Number, required: true },
        merch: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Merch',
          required: true,
        },
      },
    ],
    customerInformation: {
      fName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      pCode: { type: String, required: true },
      country: { type: String, required: true },
    },

    paymentMehod: { type: String, required: true },
    paymentResult: {
      id: String,
      statis: String,
      update_time: String,
      email_address: String,
    },

    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', reqiored: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  {
    timsestamps: true,
  }
);

const OrderModel = mongoose.model('OrderModel', orderModelSchema);

export default OrderModel;
