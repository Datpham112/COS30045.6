const drawScatterplot = (data) => {
  const svg = d3.select("#scatterplot")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`);

  innerChartS = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  xScaleS.domain([0, d3.max(data, d => d.star)]).range([0, innerWidth]).nice();
  yScaleS.domain([0, d3.max(data, d => d.energyConsumption)]).range([innerHeight, 0]).nice();

  colorScale
    .domain(["LED", "LCD", "OLED"])
    .range(d3.schemeCategory10);

  innerChartS.selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", d => xScaleS(d.star))
    .attr("cy", d => yScaleS(d.energyConsumption))
    .attr("r", 4)
    .attr("fill", d => colorScale(d.screenTech))
    .attr("opacity", 0.5);

  innerChartS.append("g")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(d3.axisBottom(xScaleS));

  innerChartS.append("g").call(d3.axisLeft(yScaleS));

  svg.append("text")
    .attr("class", "axis-label")
    .attr("x", margin.left)
    .attr("y", 20)
    .text("Labeled Energy Consumption (kWh/year)");

  svg.append("text")
    .attr("class", "axis-label")
    .attr("x", width - margin.right)
    .attr("y", height - 10)
    .attr("text-anchor", "end")
    .text("Star Rating");

  const legend = svg.append("g")
    .attr("transform", `translate(${width - 100}, ${margin.top})`);

  colorScale.domain().forEach((screenTech, i) => {
    const legendRow = legend.append("g")
      .attr("transform", `translate(0, ${i * 20})`);

    legendRow.append("rect")
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", colorScale(screenTech));

    legendRow.append("text")
      .attr("x", 20)
      .attr("y", 10)
      .style("alignment-baseline", "middle")
      .text(screenTech);
  });
};
