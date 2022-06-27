function promo(date) {

  // let promoDate = new Date(2022, 10, 13, 17, 25, 0);
  let promoDate = date;
  const timerBlock = document.querySelectorAll(".timer__block span");

  const timer = setInterval(() => {
    let promoTimeLeft = getTimeLeft(promoDate);
    // console.log(promoTimeLeft);
    if (promoTimeLeft) {
      setTimeToPromoBlock(promoTimeLeft);
    }
  }, 1000);

  function getTimeLeft(promoDate) {

 
    let diff = Date.parse(promoDate) - Date.parse(new Date());
    // console.log(diff);
    if (diff <= 0) {
      clearInterval(timer);
      return;
    }

    let secsLeft = Math.floor((diff / 1000) % 60);
    let minsLeft = Math.floor((diff / 1000 / 60) % 60);
    let hoursLeft = Math.floor((diff / (1000 * 60 * 60)) % 24);
    let daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24)) % 60;

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

  //const timerId = setInterval('');
  //console.log(timerBlock);

  function setTimeToPromoBlock(time) {
    timerBlock.forEach((item, i) => {
      item.innerHTML = ("0" + time[item.id]).slice(-2);
      //console.log();
      // console.log(timeList[days]);
    });
  }
}

export default promo;
