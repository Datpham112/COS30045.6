d3.csv("data/W6_TVdata.csv", d => ({
  brand: d.brand,
  model: d.model,
  screenSize: +d.screenSize,
  screenTech: d.screenTech,
  star: +d.star,
  energyConsumption: +d.energyConsumption
})).then(data => {
  console.log(data);
  drawHistogram(data);
  drawScatterplot(data);
  populateFilters(data);
  createTooltip();
  handleMouseEvents();
}).catch(error => {
  console.error("Error loading the CSV file:", error);
});
