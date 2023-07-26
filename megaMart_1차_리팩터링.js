// dom이 있어야만 작동하는 코드나, 전역변수를 사용하거나, 아예 외부에서 따로 해당 함수만 사용할 경우
// 함수형 프로그래밍에 부합하지 않는다.

let shopping_cart = [];
let shopping_cart_total = 0;

function add_item_to_cart(name, price) {
  // 함수의 리턴값을 전역변수에 할당하자
  shopping_cart = add_item(shopping_cart, name, price);
  calc_cart_total();
}

function add_item(cart, name, price) {
  // shopping_cart라는 전역변수를 읽고 있기 때문에 입력이다.
  // 암묵적 입력 대신 명시적 입력으로 바꾸자(매개변수로 받자)
  // shopping_cart.push({
  let new_cart = cart.slice(); // slice에 아무런 인자를 넘기지 않는다면 처음부터 끝까지 복제(원본배열 안건들임)
  new_cart.push({
    name,
    price,
  });
  return new_cart;
}

function calc_cart_total() {
  shopping_cart_total = calc_total(shopping_cart);
  set_cart_total_dom();
  update_shipping_icons();
  update_tax_dom();
}

// 1. 암묵적 출력을 없애기 위해 함수를 호출하는 쪽에서 전역변수에 값을 할당하도록 하자.
function calc_total(cart) {
  // 1. shopping_cart_total = 0; // 전역변수가 아닌 지역변수로 바꾸자
  let total = 0;
  // 2. 암묵적 입력을 없애기 위해 외부값이 필요하다면 매개변수로 받고, 그게 아닐 경우 지역변수를 사용하자.
  // for (let i = 0; i < shopping_cart.length; i++) {
  //   let item = shopping_cart[i];
  //   shopping_cart += item.price; // 출력
  // }
  for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    cart += item.price; // 출력
  }
  return total;
}

function update_shipping_icons() {
  let buy_buttons = get_buy_buttons_dom();
  for (let i = 0; i < buy_buttons.length; i++) {
    let button = buy_buttons[i];
    let item = button.item;
    if (get_free_shipping(shopping_cart_total, item.price)) {
      button.show_free_shipping_icon();
    } else button.hide_free_shipping_icon();
  }
}

function get_free_shipping(total, item_price) {
  return item_price + total >= 20;
}

function update_tax_dom() {
  set_tax_dom(calc_tax(shopping_cart_total));
}

// function update_tax_dom() {
//   set_tax_dom(shopping_cart_total * 0.1);
// }

function calc_tax(amount) {
  return amount * 0.1;
}
