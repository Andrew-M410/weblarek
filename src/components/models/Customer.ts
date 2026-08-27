import { IBuyer, TPayment, TValidateErrors } from "@/types/index";
import { IEvents } from "../base/Events";

export class Customer {
  private customer: IBuyer = {
    payment: null,
    email: "",
    phone: "",
    address: "",
  };
  
  constructor(private events: IEvents) {}

  savePaymentMethod(paymentMethod: TPayment): void {
    this.customer.payment = paymentMethod;
    this.events.emit("customer:changed");
  }

  saveEmail(email: string): void {
    this.customer.email = email;
    this.events.emit("customer:changed");
  }

  savePhone(phone: string): void {
    this.customer.phone = phone;
    this.events.emit("customer:changed");
  }

  saveAddress(address: string): void {
    this.customer.address = address;
    this.events.emit("customer:changed");
  }

  getCustomerData(): IBuyer {
    return { ...this.customer };
  }

  clearCustomerData(): void {
    this.customer = {
      payment: null,
      email: "",
      phone: "",
      address: "",
    };
    this.events.emit("customer:changed");
  }

  validateCustomerData(): TValidateErrors {
    const errors: TValidateErrors = {};

    if (!this.customer.payment) {
      errors.payment = "Укажите тип оплаты";
    }

    if (!this.customer.email.trim()) {
      errors.email = "Укажите email";
    }

    if (!this.customer.phone.trim()) {
      errors.phone = "Укажите номер телефона";
    }

    if (!this.customer.address.trim()) {
      errors.address = "Укажите адрес";
    }

    return errors;
  }
}