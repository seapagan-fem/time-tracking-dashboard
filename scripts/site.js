console.log("Javascript Loaded");

const handleRadioClick = (e) => {
  const choice = document.querySelector('input[name="period"]:checked').value;
  console.log(`Selection Changed to ${choice}`);
};

document
  .getElementsByName("period")
  .forEach((el) => el.addEventListener("click", handleRadioClick));
