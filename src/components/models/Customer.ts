import { IBuyer, TPayment, TValidateErrors } from "@/types/index";

export class Customer {
    private customer: IBuyer = {
        payment: null,
        email: "",
        phone: "",
        address: "",
    };

    savePaymentMethod(paymentMethod: TPayment): void {
        this.customer.payment = paymentMethod;
    }

    saveEmail(email: string): void {
        this.customer.email = email;
    }

    savePhone(phone: string): void {
        this.customer.phone = phone;
    }

    saveAddress(address: string): void {
        this.customer.address = address;
    }

    getCustomerData(): IBuyer {
        return this.customer;
    }

    clearCustomerData(): void {
        this.customer = {
            payment: null,
            email: "",
            phone: "",
            address: "",
        };
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