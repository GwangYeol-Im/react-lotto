import React, { Component } from 'react';
import { LOTTERY_PRICE, MAX_PAYMENT, MESSAGE } from '../utils';

class PaymentForm extends Component {
  constructor(props) {
    super(props);
    this.messageRef = React.createRef();
  }

  //TODO: 필드 범위 (private, public) 얘기해보기
  isValidPayment(value) {
    return value > 0 && value % LOTTERY_PRICE === 0;
  }

  handleInputCheck = ({ target }) => {
    const value = Number(target.value);
    const $input = this.messageRef.current;

    if (this.isValidPayment(value)) {
      $input.innerText = '';

      return;
    }

    $input.innerText = MESSAGE.PAYMENT_FORM.INVALID_PAYMENT;
  };

  handleSubmit = event => {
    event.preventDefault();
    const value = Number(event.target.value);
    const $input = this.messageRef.current;

    if (!this.isValidPayment(value)) {
      $input.innerText = MESSAGE.PAYMENT_FORM.INVALID_PAYMENT;

      return;
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="payment-input">구입할 금액을 입력해주세요.</label>
        <div>
          <input
            id="payment-input"
            type="number"
            placeholder={`구입 금액 (${LOTTERY_PRICE}원 단위)`}
            onChange={this.handleInputCheck}
            max={MAX_PAYMENT}
          />
          <button type="submit">확인</button>
        </div>
        <p ref={this.messageRef}></p>
      </form>
    );
  }
}

export default PaymentForm;
