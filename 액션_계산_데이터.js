// 계산
function subCouponRank(subscriber) {
  if (subscriber.rec_count >= 10) return "best";
  return "good";
}

// 데이터
let coupon = {
  code: "어쩌구",
  rank: "bad",
};

// 계산
function selectCouponsByRank(coupons, rank) {
  let ret = [];
  for (let c = 0; c < coupons.length; c++) {
    let coupon = coupons[c];
    if (coupon.rank === rank) ret.push(coupon.code);
  }
  return ret;
}

// 데이터
let message = {
  from: "thisisemail@gmail.com",
  to: "thatisemail@gmail.com",
  subject: "your weekly coupons inside",
  body: "here you are",
};

// 계산
function emailForSubscriber(subscriber, goods, bests) {
  let rank = subCouponRank(subscriber);
  if (rank === "best") {
    return {
      from: "aaa",
      to: "bbb",
      subject: "ccc",
      body: "ddd" + bests.join(", "),
    };
  } else
    return {
      from: "eee",
      to: "fff",
      subject: "ggg",
      body: "hhh" + goods.join(", "),
    };
}

// 계산
function emailsForSubscribers(subscribers, goods, bests) {
  let emails = [];
  for (let s = 0; s < subscribers.length; s++) {
    let subscriber = subscribers[s];
    let email = emailForSubscriber(subscriber, goods, bests);
    emails.push(email);
  }
  return emails;
}

// 액션
function sendIssue() {
  let coupons = fetchCouponsFromDB();
  let goodCoupons = selectCouponsByRank(coupons, "good");
  let bestCoupons = selectCouponsByRank(coupons, "best");
  let subscribers = fetchSubscribersFromDB();
  let emails = emailForSubscriber(subscribers, goodCoupons, bestCoupons);
  for (let e = 0; e < emails.length; e++) {
    let email = emails[e];
    emailSystem.send(email);
  }
}
