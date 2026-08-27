import { ensureElement } from "@/utils/utils";
import { ICard, CardView } from "./CardView";
import { categoryMap } from "@/utils/constants";
import { IProduct } from "@/types/index";

interface ICardDescription extends ICard {
  category: IProduct["category"];
  image: IProduct["image"];
  description: IProduct["description"];
  buttonText?: string;
  buttonDisabled?: boolean;
}

interface ICardDescriptionActions {
  onClick?: () => void;
}

export class CardDescriptionView extends CardView<ICardDescription> {
  protected categoryElement: HTMLElement;
  protected imageElement: HTMLImageElement;
  protected descriptionElement: HTMLElement;
  protected actionButton: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardDescriptionActions) {
    super(container);

    this.categoryElement = ensureElement<HTMLElement>(
      ".card__category",
      this.container,
    );
    this.descriptionElement = ensureElement<HTMLElement>(
      ".card__text",
      this.container,
    );
    this.imageElement = ensureElement<HTMLImageElement>(
      ".card__image",
      this.container,
    );
    this.actionButton = ensureElement<HTMLButtonElement>(
      ".card__button",
      this.container,
    );

    if (actions?.onClick) {
      this.actionButton.addEventListener("click", actions.onClick);
    }
  }

  set category(value: string) {
    this.categoryElement.textContent = value;

    this.categoryElement.classList.remove(...Object.values(categoryMap));
    const categoryClass = categoryMap[value as keyof typeof categoryMap];

    if (categoryClass) {
      this.categoryElement.classList.add(categoryClass);
    }
  }

  set image(value: string) {
    this.setImage(this.imageElement, value);
  }

  set description(value: string) {
    this.descriptionElement.textContent = value;
  }

  set buttonText(value: string) {
    this.actionButton.textContent = value;
  }

  set buttonDisabled(value: boolean) {
    this.actionButton.disabled = value;
  }
}