import { ensureElement } from "@/utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IBasketView {
  products: HTMLElement[];
  total: string;
  checkoutDisabled: boolean;
}

export class BascetView extends Component<IBasketView> {
  protected listElement: HTMLElement;
  protected totalElement: HTMLElement;
  protected checkoutButton: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this.listElement = ensureElement<HTMLElement>(
      ".basket__list",
      this.container,
    );
    this.totalElement = ensureElement<HTMLElement>(
      ".basket__price",
      this.container,
    );
    this.checkoutButton = ensureElement<HTMLButtonElement>(
      ".basket__button",
      this.container,
    );

    this.checkoutButton.addEventListener("click", () => {
      this.events.emit("basket:checkoutClick");
    });
  }

  set products(value: HTMLElement[]) {
    this.listElement.innerHTML = "";
    value.forEach((item) => {
      this.listElement.appendChild(item);
    });

    this.checkoutDisabled = value.length === 0;
  }

  set total(value: string) {
    this.totalElement.textContent = `${value} синапсов`;
  }

  set checkoutDisabled(value: boolean) {
    this.checkoutButton.disabled = value;
  }
}