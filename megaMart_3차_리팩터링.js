let shopping_cart = [];

function add_item_to_cart(name, price) {
  let item = make_cart_item(name, price);
  shopping_cart = add_item(shopping_cart, item);
  let total = calc_total(shopping_cart);
  set_cart_total_dom(total);
  update_shipping_icons(shopping_cart);
  update_tax_dom(total);
}

function add_element_last(array, el) {
  let new_array = array.slice();
  new_array.push(el);
  return new_array;
}

function add_item(cart, item) {
  return add_element_last(cart, item);
}

function make_cart_item(name, price) {
  return {
    name,
    price,
  };
}

function set_cart_total_dom(total) {
  total;
}

function calc_total(cart) {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    total += item.price;
  }
  return total;
}

function update_shipping_icons(cart) {
  let buy_buttons = get_buy_buttons_dom();
  for (let i = 0; i < buy_buttons.length; i++) {
    let button = buy_buttons[i];
    let item = button.item;
    let hasFreeShipping = get_free_shipping_with_item(cart, item);
    set_free_shipping_icon(button, hasFreeShipping);
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

function get_free_shipping(cart) {
  return calc_total(cart) >= 20;
}

function update_tax_dom(total) {
  set_tax_dom(calc_tax(total));
}

function calc_tax(amount) {
  return amount * 0.1;
}

// 범용 함수
function removeItems(array, idx, count) {
  let copy = array.slice();
  copy.splice(idx, count);
  return copy;
}

// function remove_item_by_name(cart, name) {
//   let new_cart = cart.slice();
//   let idx = null;
//   for (let i = 0; i < new_cart.length; i++) {
//     if (new_cart[i].name === name) idx = i;
//   }
//   if (idx !== null) new_cart.splice(idx, 1);
//   return new_cart;
// }

function remove_item_by_name(cart, name) {
  // let new_cart = cart.slice(); // 사용하는 함수에서 깊은복사하고 있어서 별도로 복사안해줘도 된다.
  let idx = null;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === name) idx = i;
  }
  if (idx !== null) return removeItems(cart, idx, 1);
  return cart;
}

// function delete_handler(name) {
//   remove_item_by_name(shopping_cart, name);
//   let total = calc_total(shopping_cart);
//   set_cart_total_dom(total);
//   update_shipping_icons(shopping_cart);
//   update_tax_dom(total);
// }

// 카피온라이트 적용하기
function delete_handler(name) {
  shopping_cart = remove_item_by_name(shopping_cart, name);
  let total = calc_total(shopping_cart);
  set_cart_total_dom(total);
  update_shipping_icons(shopping_cart);
  update_tax_dom(total);
}

let mailing_list = [];

function add_contact(mailing_list, email) {
  let list_copy = mailing_list.slice();
  list_copy.push(email);
  return list_copy;
}

function submit_form_handler(event) {
  let form = event.target;
  let email = form.elements["email"].value;
  mailing_list = add_contact(email);
}
