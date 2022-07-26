/* -------------------------------------------------------------------------- */
/*                         read in data from JSON file                        */
/* -------------------------------------------------------------------------- */
const data = await fetch("../data.json").then((res) => res.json());

/* -------------------------------------------------------------------------- */
/*              populate the cards with data depending on choice              */
/* -------------------------------------------------------------------------- */

const titleCase = (word) => {
  // converts a word to 'Title' case. Why does JS not have this as standard???
  // Maybe I'm just spoiled by Python
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const postfix = (value) => {
  // add the correct pluralized postfix to the provided value
  return `${value}hr${value === 1 ? "" : "s"}`;
};

const prefix = (value) => {
  // add the correct prefix for the previous data
  const currentChoice = getChoice();
  switch (currentChoice) {
    case "weekly":
    case "monthly":
      return `Last ${titleCase(currentChoice).slice(0, -2)} - ${value}`;
    default:
      // this will be daily
      return `Yesterday - ${value}`;
  }
};

const populateSingleCard = (cardType, data) => {
  Array.from(document.getElementsByName(cardType)).forEach((el) => {
    el.querySelector(".metric-time").innerText = postfix(data.current);
    el.querySelector(".metric-previous").innerText = prefix(
      postfix(data.previous)
    );
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
