import { FormView, IForm } from "./FormView";
import { IEvents } from "@/components/base/Events";
import { IBuyer } from "@/types/index";
import { ensureElement } from "@/utils/utils";

interface IFormContacts extends IForm {
  email: IBuyer["email"];
  phone: IBuyer["phone"];
}

export class FormContactsView extends FormView<IFormContacts> {
  protected emailInput: HTMLInputElement;
  protected phoneInput: HTMLInputElement;

  constructor(container: HTMLFormElement, protected events: IEvents) {
    super(container, events);

    this.emailInput = ensureElement<HTMLInputElement>(
      "input[name='email']",
      this.container,
    );
    this.phoneInput = ensureElement<HTMLInputElement>(
      "input[name='phone']",
      this.container,
    );
  }

  set email(value: IFormContacts["email"]) {
    this.emailInput.value = value;
  }

  set phone(value: IFormContacts["phone"]) {
    this.phoneInput.value = value;
  }
}