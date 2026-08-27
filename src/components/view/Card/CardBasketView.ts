import { ensureElement } from "@/utils/utils";
import { ICard, CardView } from "./CardView";

interface ICardBasket extends ICard {
  index: number;
}

interface ICardBasketActions {
  onDelete?: () => void;
}

export class CardBasketView extends CardView<ICardBasket> {
  protected indexElement: HTMLElement;
  protected deleteButton: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardBasketActions) {
    super(container);

    this.indexElement = ensureElement<HTMLElement>(
      ".basket__item-index",
      this.container,
    );
    this.deleteButton = ensureElement<HTMLButtonElement>(
      ".basket__item-delete",
      this.container,
    );

    if (actions?.onDelete) {
      this.deleteButton.addEventListener("click", actions.onDelete);
    }
  }

  set index(value: number) {
    this.indexElement.textContent = String(value);
  }
}