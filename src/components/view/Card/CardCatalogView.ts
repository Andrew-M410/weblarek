import { ensureElement } from "@/utils/utils";
import { ICard, CardView } from "./CardView";
import { categoryMap } from "@/utils/constants";
import { IProduct } from "@/types/index";

interface ICardCatalog extends ICard {
  image: IProduct["image"];
  category: IProduct["image"];
}

interface ICardCatalogActions {
  onClick?: () => void;
}

export class CardCatalogView extends CardView<ICardCatalog> {
  protected categoryElement: HTMLElement;
  protected imageElement: HTMLImageElement;

  constructor(container: HTMLElement, actions?: ICardCatalogActions) {
    super(container);

    this.categoryElement = ensureElement<HTMLElement>(
      ".card__category",
      this.container,
    );
    this.imageElement = ensureElement<HTMLImageElement>(
      ".card__image",
      this.container,
    );

    if (actions?.onClick) {
      this.container.addEventListener("click", actions.onClick);
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
}