import { ensureElement } from "@/utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface SucsessInterface {
  total: string;
}

export class SucsessView extends Component<SucsessInterface> {
  protected totalEl: HTMLParagraphElement;
  protected closeButton: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this.totalEl = ensureElement<HTMLParagraphElement>(
      ".order-success__description",
      this.container,
    );
    this.closeButton = ensureElement<HTMLButtonElement>(
      ".order-success__close",
      this.container,
    );

    this.closeButton.addEventListener("click", () => {
      this.events.emit("sucsess:close");
    });
  }

  set total(value: string) {
    this.totalEl.textContent = `Списано ${value} синапсов`;
  }
}