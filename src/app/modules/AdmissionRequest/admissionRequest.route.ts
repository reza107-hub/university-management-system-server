import express, { Request, Response } from 'express';
import { AdmissionRequestController } from './admissionRequest.controller';
const router = express.Router();
import { ObjectId } from 'mongodb';
import SSLCommerzPayment from 'sslcommerz-lts';
import config from '../../config';
import Payment from '../payment/payment.model';
import { sendEmail } from '../../utils/sendEmail';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';
import { createAdmission } from './admissionRequest.service';
import { TAdmission } from './admissionRequest.interface';

router.get('/', AdmissionRequestController.getAllAdmissionRequest);
router.get('/:id', AdmissionRequestController.getSingleAdmissionRequest);

const createPayment = async (
  payload: TAdmission,
  trans_id: string,
  fee: number,
) => {
  const paymentData = {
    email: payload.email,
    feeType: 'Admission Fee',
    trans_id,
    fee,
  };
  await Payment.create(paymentData);
};

router.post('/', async (req, res) => {
  const payload = req.body;
  const store_id = config.SSLCOMMERZ_STORE_ID;
  const store_passwd = config.SSLCOMMERZ_STORE_PASS;
  const is_live = false; //true for live, false for sandbox

  const trans_id = new ObjectId().toString();

  const data = {
    total_amount: 20000,
    currency: 'BDT',
    tran_id: trans_id, // use unique tran_id for each api call
    success_url: `http://localhost:5000/api/admission-request/payment-success/${trans_id}`,
    fail_url: `http://localhost:5000/api/admission-request/payment-fail/${trans_id}`,
    cancel_url: `http://localhost:5000/api/admission-request/payment-cancel/${trans_id}`,
    ipn_url: 'http://localhost:3030/ipn',
    shipping_method: 'Courier',
    product_name: 'Admission Fee',
    product_category: 'Electronic',
    product_profile: 'general',
    cus_name: payload.name.lastName,
    cus_email: payload.email,
    cus_add1: 'Dhaka',
    cus_add2: 'Dhaka',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: payload.contactNumber,
    cus_fax: '01711111111',
    ship_name: 'Customer Name',
    ship_add1: 'Dhaka',
    ship_add2: 'Dhaka',
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: 1000,
    ship_country: 'Bangladesh',
  };

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

  try {
    const apiResponse = await sslcz.init(data);
    const url = apiResponse.GatewayPageURL;
    res.send({ url });
    await createAdmission(payload);
    await createPayment(payload, trans_id, 20000);
  } catch (error) {
    throw new AppError(httpStatus.FORBIDDEN, 'Payment Failed');
  }

  router.post(`/payment-success/:trans_id`, async (req, res) => {
    const trans_id = req.params.trans_id;
    const result = await Payment.findOneAndUpdate(
      { trans_id },
      { paidStatus: true },
    );
    if (result?.isModified) {
      res.redirect(`http://localhost:5173/admission-payment/${trans_id}`);
      await sendEmail(
        payload.email,
        'your payment has been successful',
        'Your admission fee is paid successfully, and you submitted your admission request successfully.',
      );
    }
  });

  const handlePaymentStatus = async (
    req: Request,
    res: Response,
    status: string,
    message: string,
  ) => {
    const trans_id = req.params.trans_id;
    const result = await Payment.findOneAndDelete({ trans_id });

    if (result?.$isDeleted) {
      res.redirect(`http://localhost:5173/`);
    }

    await sendEmail(payload.email, status, message);
    return;
  };

  router.post(`/payment-fail/:trans_id`, async (req, res) => {
    await handlePaymentStatus(
      req,
      res,
      'Your payment has not successful',
      'Your admission fee is not paid successfully',
    );
  });

  router.post(`/payment-cancel/:trans_id`, async (req, res) => {
    await handlePaymentStatus(
      req,
      res,
      'Your payment is canceled',
      'Your admission fee is not paid successfully',
    );
  });
});

export const AdmissionRequestRoute = router;
