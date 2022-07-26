/* -------------------------------------------------------------------------- */
/*                         read in data from JSON file                        */
/* -------------------------------------------------------------------------- */
const data = await fetch("data.json").then((res) => res.json());

/* -------------------------------------------------------------------------- */
/*              populate the cards with data depending on choice              */
/* -------------------------------------------------------------------------- */
const getChoice = () => {
  return document.querySelector('input[name="period"]:checked').value;
};

const titleCase = (word) => {
  // converts a word to 'Title' case. Why does JS not have this as standard???
  // Maybe I'm just spoiled by Python
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const postfix = (value) => {
  // add the correct pluralized postfix to the provided value
  return `${value}hr${value === 1 ? "" : "s"}`;
};

const periodPrefix = (value) => {
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
    el.querySelector(".metric-previous").innerText = periodPrefix(
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
document
  .getElementsByName("period")
  .forEach((el) =>
    el.addEventListener("click", () => populateCards(getChoice(), data))
  );

/* -------------------------------------------------------------------------- */
/*                          fill in the initial state                         */
/* -------------------------------------------------------------------------- */
populateCards(getChoice(), data);
