import React, { Component } from 'react';
import axios from 'axios';
import { CardNumberElement, CardExpiryElement, CardCVCElement, PostalCodeElement, injectStripe } from 'react-stripe-elements';

class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.state = { complete: false };
    }

    handleSubmit(event) {
        event.preventDefault();
        let { token } = this.props.stripe.createToken({ name: "Name" });
        let url = 'http://localhost:3000/billing'

        axios.post(`${url}`,
          {
            headers: { "Content-Type": "text/plain" },
            body: token.id
          }).then(response => {
            if (response.ok) this.setState({ complete: true });
            console.log(response);
          })
    }

    render() {
        if (this.state.complete) return <h1>Purchase Complete</h1>;
        return <div className="checkout">
            <p>$9.99/month</p>
            <form onSubmit={this.handleSubmit}>
              <label>
                Card number
                <CardNumberElement />
              </label>
              <label>
                Expiration date
                <CardExpiryElement />
              </label>
              <label>
                CVC
                <CardCVCElement />
              </label>
              <label>
                Zip code
                <PostalCodeElement />
              </label>
              <button>Pay</button>
            </form>
            <p>
              Your subscription will automatically renew every month.
              You will be charged $9.99 on each renewal until you
              cancel in the billing settings. If you cancel, previous charges will
              not be refunded, but you may continue to use the service
              until the end of the term you paid for. Unless I can't figure out how to
              implement that then you will just lose your premium service immediately.
            </p>
          </div>;
    }
}

export default injectStripe(CheckoutForm);