function promo() {
  function getTimeLeft(endtime) {
    let endt = endtime;
    let nowTime = new Date();

    let diff = endt - nowTime;

    if (diff <= 0) {
      clearInterval(timer);
      return;
    }

    secsLeft = Math.floor((diff / 1000) % 60);
    minsLeft = Math.floor((diff / 1000 / 60) % 60);
    hoursLeft = Math.floor((diff / (1000 * 60 * 60)) % 24);
    daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24)) % 60;

    // console.log(secsLeft);
    // console.log(minsLeft);
    // console.log(hoursLeft);
    // console.log(daysLeft);

    return {
      // 'total': diff,
      days: daysLeft,
      hours: hoursLeft,
      minutes: minsLeft,
      seconds: secsLeft,
    };
  }

  let promoDate = new Date(2022, 10, 13, 17, 25, 0);

  const timerBlock = document.querySelectorAll(".timer__block span");
  //const timerId = setInterval('');
  //console.log(timerBlock);

  function setTimeToPromoBlock(timeList) {
    timerBlock.forEach((item, i) => {
      item.innerHTML = ("0" + timeList[item.id]).slice(-2);
      //console.log();
      // console.log(timeList[days]);
    });
  }

  const timer = setInterval(() => {
    let promoTimeLeft = getTimeLeft(promoDate);
    // console.log(promoTimeLeft);
    if (promoTimeLeft) {
      setTimeToPromoBlock(promoTimeLeft);
    }
  }, 1000);
}

module.exports = promo();
