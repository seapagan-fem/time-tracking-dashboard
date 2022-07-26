/* -------------------------------------------------------------------------- */
/*                         read in data from JSON file                        */
/* -------------------------------------------------------------------------- */
const data = await fetch("../data.json").then((res) => res.json());

/* -------------------------------------------------------------------------- */
/*              populate the cards with data depending on choice              */
/* -------------------------------------------------------------------------- */
const prefix = (value) => {
  // add the correct pluralized prefix to the privided value
  return `${value}hr${value === 1 ? "" : "s"}`;
};

const populateSingleCard = (cardType, data) => {
  Array.from(document.getElementsByName(cardType)).forEach((el) => {
    el.querySelector(".metric-time").innerText = prefix(data.current);
    el.querySelector(".metric-previous").innerText = prefix(data.previous);
  });
};

const populateCards = (choice, metricData) => {
  metricData.forEach((type) => {
    populateSingleCard(type.title.toLowerCase(), type.timeframes[choice]);
  });
};

/* -------------------------------------------------------------------------- */
/*                         handle the selection change                        */
/* -------------------------------------------------------------------------- */
const getChoice = () => {
  return document.querySelector('input[name="period"]:checked').value;
};

const handleRadioClick = (e) => populateCards(getChoice(), data);

/* -------------------------------------------------------------------------- */
/*                  add click listeners to the radio buttons                  */
/* -------------------------------------------------------------------------- */
document
  .getElementsByName("period")
  .forEach((el) => el.addEventListener("click", handleRadioClick));

/* -------------------------------------------------------------------------- */
/*                          fill in the initial state                         */
/* -------------------------------------------------------------------------- */
populateCards(getChoice(), data);
