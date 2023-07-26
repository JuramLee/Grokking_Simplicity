// dom이 있어야만 작동하는 코드나, 전역변수를 사용하거나, 아예 외부에서 따로 해당 함수만 사용할 경우
// 함수형 프로그래밍에 부합하지 않는다.

let shopping_cart = [];
let shopping_cart_total = 0;

function add_item_to_cart(name, price) {
  // 계산으로 분리
  shopping_cart.push({
    name,
    price,
  });
  // ~ ~ ~ ~
  calc_cart_total();
}

function calc_cart_total() {
  // 계산으로 분리
  shopping_cart_total = 0; // 전역변수 값을 바꾸기 때문에 출력
  for (let i = 0; i < shopping_cart.length; i++) {
    // shopping_cart가 입력
    let item = shopping_cart[i];
    shopping_cart_total += item.price;
  }
  // ~ ~ ~ ~
  set_cart_total_dom();
  update_shipping_icons();
  update_tax_dom();
}

function update_shipping_icons() {
  let buy_buttons = get_buy_buttons_dom();
  for (let i = 0; i < buy_buttons.length; i++) {
    let button = buy_buttons[i];
    let item = button.item;
    if (item.price + shopping_cart_total >= 20) {
      button.show_free_shipping_icon();
    } else button.hide_free_shipping_icon();
  }
}

function update_tax_dom() {
  set_tax_dom(shipping_cart_total * 0.1);
}
