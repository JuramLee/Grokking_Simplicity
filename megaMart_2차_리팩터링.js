// 액션
let shopping_cart = [];
// let shopping_cart_total = 0;  => 사용X

// 액션 (전역변수 읽기)
function add_item_to_cart(name, price) {
  let item = make_cart_item(name, price);
  shopping_cart = add_item(shopping_cart, item);
  // calc_cart_total(shopping_cart);
  let total = calc_total(shopping_cart);
  set_cart_total_dom(total);
  update_shipping_icons(shopping_cart);
  update_tax_dom(total);
}

// cart에 대한 동작, item에 대한 동작
// 인자로 배열과 뒤에 추가할 아이템을 받는 함수라 좀 더 일반적으로 사용가능하다
// 따라서 이름을 다시 지어서 범용으로 만들자
// function add_item(cart, item) {
//   let new_cart = cart.slice();
//   new_cart.push(item);
//   return new_cart;
// }

// add_element_last()는 A 배열 유틸리티이다.
// 계산
function add_element_last(array, el) {
  let new_array = array.slice();
  new_array.push(el);
  return new_array;
}

// cart에 대한 동작
// 계산
function add_item(cart, item) {
  return add_element_last(cart, item);
}

// item 객체를 만드는 함수. item에 대한 동작
// 계산
function make_cart_item(name, price) {
  return {
    name,
    price,
  };
}

// add_item_to_cart()에 흡수 (전역변수인 shopping_cart_total가 어디에도 쓰이지 않음 => 불필요한 분리)
// function calc_cart_total(cart) {
//   let total = calc_total(cart);
//   set_cart_total_dom(total);
//   update_shipping_icons(cart);
//   update_tax_dom(total);
//   shopping_cart_total = total;
// }

function set_cart_total_dom(total) {
  total;
}

// cart에 대한 동작, item에 대한 동작, business 규칙
// 계산
function calc_total(cart) {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    total += item.price;
  }
  return total;
}

// 액션 (DOM 수정)
function update_shipping_icons(cart) {
  let buy_buttons = get_buy_buttons_dom();
  for (let i = 0; i < buy_buttons.length; i++) {
    let button = buy_buttons[i];
    let item = button.item;
    let hasFreeShipping = get_free_shipping_with_item(cart, item);
    set_free_shipping_icon(button, hasFreeShipping);
    /*
    let new_cart = add_item(cart, make_cart_item(item.name, item.price));
    if (get_free_shipping(new_cart)) {
      button.show_free_shipping_icon();
    } else button.hide_free_shipping_icon();
     */
  }
}

function get_free_shipping_with_item(cart, item) {
  let new_cart = add_item(cart, item);
  return get_free_shipping(new_cart);
}

function set_free_shipping_icon(button, isShown) {
  if (isShown) return button.show_free_shipping_icon();
  button.hide_free_shipping_icon();
}

// business 규칙
// 계산
function get_free_shipping(cart) {
  return calc_total(cart) >= 20;
}

// 액션 (DOM 수정)
function update_tax_dom(total) {
  set_tax_dom(calc_tax(total));
}

// business 규칙
// 계산
function calc_tax(amount) {
  return amount * 0.1;
}
