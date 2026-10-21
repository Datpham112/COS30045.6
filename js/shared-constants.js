const margin = { top: 40, right: 30, bottom: 50, left: 70 };
const width = 800;
const height = 400;
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

let innerChart;
let innerChartS;

const tooltipWidth = 150;
const tooltipHeight = 54;

const barColor = "#606464";
const bodyBackgroundColor = "#fffaf0";

const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();
const xScaleS = d3.scaleLinear();
const yScaleS = d3.scaleLinear();
const colorScale = d3.scaleOrdinal();

const binGenerator = d3.bin()
  .value(d => d.energyConsumption)
  .domain([0, 2800])
  .thresholds(d3.range(200, 2800, 200));

const filters_screen = [
  { id: "all", label: "All", isActive: true },
  { id: "LED", label: "LED", isActive: false },
  { id: "LCD", label: "LCD", isActive: false },
  { id: "OLED", label: "OLED", isActive: false }
];
