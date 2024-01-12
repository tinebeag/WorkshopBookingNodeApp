const startDate = document.querySelector(".startDate");
const endDate = document.querySelector(".endDate");

const date = new Date();

const dateString = date.toLocaleDateString().split("/");

const today = dateString[2] + "-" + dateString[1] + "-" + dateString[0];

startDate.value = today;

endDate.value = dateString[2] + "-12-31";
