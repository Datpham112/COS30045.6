const drawHistogram = (data) => {
  const svg = d3.select("#histogram")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`);

  innerChart = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const bins = binGenerator(data);
  console.log(bins);

  const minEng = bins[0].x0;
  const maxEng = bins[bins.length - 1].x1;
  const binsMaxLength = d3.max(bins, d => d.length);
  console.log("minEng:", minEng, "maxEng:", maxEng, "binsMaxLength:", binsMaxLength);

  xScale.domain([minEng, maxEng]).range([0, innerWidth]);
  yScale.domain([0, binsMaxLength]).range([innerHeight, 0]).nice();

  innerChart.selectAll("rect")
    .data(bins)
    .join("rect")
    .attr("x", d => xScale(d.x0))
    .attr("y", d => yScale(d.length))
    .attr("width", d => xScale(d.x1) - xScale(d.x0))
    .attr("height", d => innerHeight - yScale(d.length))
    .attr("fill", barColor)
    .attr("stroke", bodyBackgroundColor)
    .attr("stroke-width", 2);

  innerChart.append("g")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(d3.axisBottom(xScale));

  innerChart.append("g").call(d3.axisLeft(yScale));

  svg.append("text")
    .attr("class", "axis-label")
    .attr("x", margin.left)
    .attr("y", 20)
    .text("Frequency");

  svg.append("text")
    .attr("class", "axis-label")
    .attr("x", width - margin.right)
    .attr("y", height - 10)
    .attr("text-anchor", "end")
    .text("Labeled Energy Consumption (kWh/year)");
};
