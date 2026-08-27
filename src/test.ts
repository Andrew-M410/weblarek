// import { Api } from "./components/base/Api";
// import { ApiWebLarek } from "./components/сommunication/ApiWebLarek";
// import { EventEmitter } from "./components/base/Events";
// import { Cart } from "./components/models/Cart";
// import { Customer } from "./components/models/Customer";
// import { Catalog } from "./components/models/Catalog";
// import { API_URL } from "./utils/constants";
// import { apiProducts } from "./utils/data";

// function TestCustomer() {
//   console.log("======================Тестирование данных покупателя======================");
//   const events = new EventEmitter();
//   const customer = new Customer(events);
//   customer.saveEmail("test@example.com");
//   customer.savePhone("1234567890");
//   customer.saveAddress("123 Main St");
//   customer.savePaymentMethod("card");
//   console.log("Данные покупателя:", customer.getCustomerData());
//   console.log("Ошибки в данных покупателя:", customer.validateCustomerData());
//   customer.clearCustomerData();
//   console.log("Данные покупателя после очистки:", customer.getCustomerData());
// }

// function TestCart() {
//   console.log("======================Тестирование корзины======================");
//   const cart = new Cart();
//   cart.addProduct({
//     id: "c101ab44-ed99-4a54-990d-47aa2bb4e7d9",
//     description:
//       "Лизните этот леденец, чтобы мгновенно запоминать и узнавать любой цветовой код CSS.",
//     image: "/Shell.svg",
//     title: "HEX-леденец",
//     category: "другое",
//     price: 1450,
//   });
//   console.log("Корзина:", cart.getCart());
//   console.log("Общая стоимость:", cart.getAllPrice());
//   console.log("Количество товаров:", cart.getQuantity());
//   console.log(
//     "Товар в корзине:",
//     cart.isInCart("c101ab44-ed99-4a54-990d-47aa2bb4e7d9"),
//   );
//   cart.delProduct("c101ab44-ed99-4a54-990d-47aa2bb4e7d9");
//   console.log("Корзина после удаления товара:", cart.getCart());
// }

// async function TestApiLarek() {
//   const api = new Api(API_URL);
//   const apiLarek = new ApiWebLarek(api);
//   console.log("======================Тестирование API WebLarek======================");
//   try {
//     const response = await apiLarek.getProducts();
//     console.log("Ответ от API Larek:", response);
//   } catch (e) {
//     console.error("Ошибка при получении продуктов:", e);
//   }

//   try {
//     const orderResponse = await apiLarek.postOrder({
//       total: 1450,
//       items: ["c101ab44-ed99-4a54-990d-47aa2bb4e7d9"],
//       payment: "card",
//       email: "test@example.com",
//       phone: "1234567890",
//       address: "123 Main St",
//     });
//     console.log("Ответ от API Larek (заказ):", orderResponse);
//   } catch (e) {
//     console.error("Ошибка при отправке заказа:", e);
//   }
// }

// async function testCatalog() {
//   console.log("======================Тестирование каталога======================");
//   const products = new Catalog();
//   products.setProducts(apiProducts.items);
//   console.log("Товары в каталоге:", products.getProducts());
//   const selectedProduct = products.findProductsById(
//     "c101ab44-ed99-4a54-990d-47aa2bb4e7d9",
//   );
//   if (selectedProduct) {
//     console.log("Найденный товар:", selectedProduct);
//     products.setSelectedProduct(selectedProduct);
//     console.log("Выбранный товар:", products.getSelectedProduct());
//   } else {
//     console.log("Товар не найден");
//   }
// }

// export async function runTests() {
//   testCatalog();
//   TestCustomer();
//   TestCart();
//   await TestApiLarek();
// }