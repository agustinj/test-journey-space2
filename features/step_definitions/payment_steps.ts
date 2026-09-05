import { When, Then } from '@cucumber/cucumber';
import { PaymentMethod } from '../../pages/paymentMethods/PaymentMethod';
import { CashOnDelivery } from '../../pages/paymentMethods/CashOnDelivery';
import { BankTransfer } from '../../pages/paymentMethods/BankTransfer';

function createPaymentMethod(methodKey: string): PaymentMethod {
  switch (methodKey) {
    case 'cash-on-delivery':
      return new CashOnDelivery();
    case 'bank-transfer':
      return new BankTransfer('Test Bank', 'John Doe', '123456789');
    default:
      throw new Error(`Unknown payment method: ${methodKey}`);
  }
}

When('I pay with {string}', async function (methodKey: string) {
  const paymentMethod = createPaymentMethod(methodKey);
  await this.checkoutPage.payWith(paymentMethod);
});

Then('the order should be placed successfully', async function () {
  await this.checkoutPage.confirmOrder();
  await this.checkoutPage.expectOrderConfirmed();
});