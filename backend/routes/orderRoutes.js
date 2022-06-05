import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import OrderModel from '../models/orderModel.js';
import { isAuth } from '../utils.js';

const orderRouter = express.Router();
orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const newOrder = new OrderModel({
      orderItems: req.body.orderItems.map((x) => ({ ...x, merch: x._id })),
      customerInformation: req.body.customerInformation,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    });

    const order = await newOrder.save();
    res.status(201).send({ message: 'Order Created', order });
  })
);

export default orderRouter;
