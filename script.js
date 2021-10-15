function onSummaryChange(summaryType) {
  let previousText;
  switch (summaryType) {
    case "daily":
      previousText = "Day";
      break;
    case "weekly":
      previousText = "Week";
      break;
    case "monthly":
      previousText = "Month";
      break;
  }

  fetch("./data.json").then((response) =>
    response.text().then((res) => {
      const data = JSON.parse(res);

      //Mark selected summary link
      const links = document.querySelectorAll("[summary-link]");

      links.forEach((el) => {
        if (el.id === summaryType + "-link") {
          el.classList.add("selected");
        } else {
          el.classList.remove("selected");
        }
      });

      //Read and fetch data from the JSON Array
      data.map((dt) => {
        document.querySelector(
          `#${dt.title.toLocaleLowerCase().split(" ").join("-")}-hrs`
        ).innerHTML = `${dt.timeframes[summaryType].current}hrs`;

        document.querySelector(
          `#${dt.title.toLocaleLowerCase().split(" ").join("-")}-last-hrs`
        ).innerHTML = `Last ${previousText} - ${dt.timeframes[summaryType].previous}hrs`;
      });
    })
  );
}
