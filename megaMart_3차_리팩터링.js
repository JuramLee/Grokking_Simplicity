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
