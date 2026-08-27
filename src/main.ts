import {
  IBuyer,
  IOrderRequest,
  IProduct,
  TPayment,
  TValidateErrors,
} from "./types/index";

import "./scss/styles.scss";

import { Api } from "./components/base/Api";
import { EventEmitter } from "./components/base/Events";

import { API_URL, CDN_URL } from "./utils/constants";
import { cloneTemplate, ensureElement } from "./utils/utils"

import { Cart } from "./components/models/Cart";
import { Customer } from "./components/models/Customer";
import { Catalog } from "./components/models/Catalog";

import { ApiWebLarek } from "./components/сommunication/ApiWebLarek";

import { Modal } from "./components/view/Modal";
import { Header } from "./components/view/Header";
import { CardDescriptionView } from "./components/view/Card/CardDescriptionView";
import { CardCatalogView } from "./components/view/Card/CardCatalogView";
import { CardBasketView } from "./components/view/Card/CardBasketView";
import { CatalogView } from "./components/view/CatalogView";
import { BascetView } from "./components/view/BasketView";
import { FormContactsView } from "./components/view/Form/FormContactsView";
import { FormPaymentView } from "./components/view/Form/FormPaymentView";
import { SucsessView } from "./components/view/SucsessView";

const events = new EventEmitter();
const api = new Api(API_URL);
const apiWebLarek = new ApiWebLarek(api);

const cart = new Cart(events);
const customer = new Customer(events);
const catalog = new Catalog(events);

const modal = new Modal(ensureElement<HTMLElement>(".modal"), events);
const header = new Header(events, ensureElement<HTMLElement>(".header"));
const catalogView = new CatalogView(ensureElement<HTMLElement>(".gallery"));

const cardPreviewTemplate = ensureElement<HTMLTemplateElement>("#card-preview");
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>("#card-catalog");
const basketTemplate = ensureElement<HTMLTemplateElement>("#basket");
const cardBasketTemplate = ensureElement<HTMLTemplateElement>("#card-basket");
const formPaymentTemplate = ensureElement<HTMLTemplateElement>("#order");
const formContactsTemplate = ensureElement<HTMLTemplateElement>("#contacts");
const sucsessFormTemplate = ensureElement<HTMLTemplateElement>("#success");

const cardPreviewElement = cloneTemplate<HTMLElement>(cardPreviewTemplate);
const basketElement = cloneTemplate<HTMLElement>(basketTemplate);

const cardPreview = new CardDescriptionView(cardPreviewElement, {
  onClick: () => {
    events.emit("preview:click");
  },
});
const basketView = new BascetView(basketElement, events);
const formPayment = new FormPaymentView(
  cloneTemplate<HTMLFormElement>(formPaymentTemplate),
  events,
);
const formContacts = new FormContactsView(
  cloneTemplate<HTMLFormElement>(formContactsTemplate),
  events,
);
const sucsessForm = new SucsessView(
  cloneTemplate<HTMLElement>(sucsessFormTemplate),
  events,
);

function transformProduct(product: IProduct): IProduct {
  return {
    ...product,
    image: CDN_URL + product.image.replace(".svg", ".png"),
  };
}

function renderCatalog(products: IProduct[]): void {
  const cards = products.map((product) => {
    const card = new CardCatalogView(
      cloneTemplate<HTMLElement>(cardCatalogTemplate),
      {
        onClick: () => {
          events.emit("catalog:cardClick", { id: product.id });
        },
      },
    );

    return card.render({
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
    });
  });

  catalogView.render({ catalog: cards });
}

function renderPreviewButton(product: IProduct): void {
  const inCart = cart.isInCart(product.id);
  const isAvailable = product.price !== null;

  cardPreview.render({
    buttonText: !isAvailable
      ? "Недоступно"
      : inCart
        ? "Удалить из корзины"
        : "В корзину",
    buttonDisabled: !isAvailable,
  });
}

function renderProductPreview(product: IProduct): void {
  cardPreview.render({
    title: product.title,
    price: product.price,
    image: product.image,
    category: product.category,
    description: product.description,
  });
  renderPreviewButton(product);

  modal.render({ content: cardPreview.render() });
  modal.open();
}

function renderBasket(): HTMLElement {
  const products = cart.getCart();
  const cartItems = products.map((product, index) => {
    const cartItem = new CardBasketView(
      cloneTemplate<HTMLElement>(cardBasketTemplate),
      {
        onDelete: () => {
          events.emit("basket:itemDeleteClick", { id: product.id });
        },
      },
    );

    return cartItem.render({
      index: index + 1,
      title: product.title,
      price: product.price,
    });
  });

  return basketView.render({
    products: cartItems,
    total: cart.getAllPrice().toString(),
    checkoutDisabled: products.length === 0,
  });
}

function openBasket(): void {
  modal.render({ content: renderBasket() });
  modal.open();
}

function openPaymentForm(): void {
  modal.render({
    content: formPayment.render(),
  });
  modal.open();
}

function openContactsForm(): void {
  modal.render({
    content: formContacts.render(),
  });
  modal.open();
}

function getErrorsText(errors: Array<string | undefined>): string {
  return errors.filter(Boolean).join("\n");
}

function renderCustomerData(
  customerData: IBuyer,
  errors: TValidateErrors,
): void {
  const isPaymentFilled = !errors.payment;
  const isAddressFilled = !errors.address;
  const isEmailFilled = !errors.email;
  const isPhoneFilled = !errors.phone;

  formPayment.render({
    payment: customerData.payment,
    address: customerData.address,
    valid: isPaymentFilled && isAddressFilled,
    error: getErrorsText([errors.payment, errors.address]),
  });

  formContacts.render({
    email: customerData.email,
    phone: customerData.phone,
    valid: isEmailFilled && isPhoneFilled,
    error: getErrorsText([errors.email, errors.phone]),
  });
}

function renderOrderSuccess(total: number): void {
  modal.render({
    content: sucsessForm.render({
      total: String(total),
    }),
  });
}

async function submitOrder(customerData: IBuyer): Promise<void> {
  const cartData = cart.getCart();
  const productsId = cartData.map((product) => product.id);
  const price = cart.getAllPrice();

  const customerOrderPost: IOrderRequest = {
    ...customerData,
    total: price,
    items: productsId,
  };

  try {
    const response = await apiWebLarek.postOrder(customerOrderPost);

    cart.clearCart();
    customer.clearCustomerData();
    renderOrderSuccess(response.total);
  } catch (error) {
    console.error("Не удалось оформить заказ:", error);
  }
}

events.on("catalog:changed", () => {
  renderCatalog(catalog.getProducts());
});

events.on("catalog:selected", () => {
  const product = catalog.getSelectedProduct();

  if (product) {
    renderProductPreview(product);
  }
});

events.on("catalog:cardClick", ({ id }: { id: string }) => {
  const product = catalog.findProductsById(id);

  if (product) {
    catalog.setSelectedProduct(product);
  }
});

events.on("modal:close", () => {
  modal.close();
});

events.on("basket:open", openBasket);

events.on("preview:click", () => {
  const product = catalog.getSelectedProduct();

  if (!product || product.price === null) return;

  if (cart.isInCart(product.id)) {
    cart.delProduct(product.id);
  } else {
    cart.addProduct(product);
  }

  modal.close();
});

events.on("basket:itemDeleteClick", ({ id }: { id: string }) => {
  cart.delProduct(id);
});

events.on("cart:changed", () => {
  header.сounter = cart.getQuantity();
  renderBasket();
});

events.on("basket:checkoutClick", () => {
  openPaymentForm();
});

events.on("payment:change", ({ payment }: { payment: TPayment }) => {
  customer.savePaymentMethod(payment);
});

events.on(
  "order:change",
  ({ field, value }: { field: string; value: string }) => {
    if (field === "address") {
      customer.saveAddress(value);
    }
  },
);

events.on("customer:changed", () => {
  renderCustomerData(customer.getCustomerData(), customer.validateCustomerData());
});

events.on("order:submit", () => {
    openContactsForm();
});

events.on(
  "contacts:change",
  ({ field, value }: { field: string; value: string }) => {
    if (field === "email") customer.saveEmail(value);
    if (field === "phone") customer.savePhone(value);
  },
);

events.on("contacts:submit", () => {
    submitOrder(customer.getCustomerData());
});

events.on("sucsess:close", () => {
  modal.close();
});

header.сounter = cart.getQuantity();
renderBasket();
renderCustomerData(customer.getCustomerData(), customer.validateCustomerData());

apiWebLarek.getProducts()
  .then((data) => data.items.map(transformProduct))
  .then((products) => {
    catalog.setProducts(products);
  })
  .catch((error) => {
    console.error("Не удалось загрузить товары:", error);
  });