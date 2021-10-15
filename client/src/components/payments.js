import React from "react";
import StripeCheckout from "react-stripe-checkout";
import * as actions from '../action';
import {useDispatch} from 'react-redux';
const Payments = () => {
    const dispatch=useDispatch();
  //amount in sands
  return (
      <StripeCheckout
      name='Emaily'
      currency='INR'
      description="Rs.500 for 5 credits"
        token={(token) => dispatch(actions.handleToken(token))}
        amount='50000'
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
          <button className="btn">
              Add Credits
          </button>
      </StripeCheckout>
  );
};
export default Payments;
