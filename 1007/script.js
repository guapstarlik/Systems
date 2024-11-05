const dataset = [25, 30, 45, 60, 20];
const names = ['a', 'b', 'c', 'd', 'e']

const svgWidth = 500, svgHeight = 300;
const margin = { top: 50, right: 30, bottom: 30, left: 40 };
const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;

// Create the SVG container
const svg = d3.select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .style("border", "1px dotted red")  // Add dotted red border
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Define the scales
const x = d3.scaleBand()
  // .domain(dataset.map((d, i) => i))
  .domain(names)
  .range([0, width])
  .padding(0.1);

const y = d3.scaleLinear()
  .domain([0, 100])
  .nice()
  .range([height, 0]);

// Create the bars
svg.selectAll(".bar")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("class", "bar")
  // .attr("x", (d, i) => x(i))
 .attr("x", (d, i) => x(names[i]))  // Update to use name for positioning
  .attr("y", d => y(d))
  .attr("width", x.bandwidth())
  .attr("height", d => height - y(d))
  .attr("fill", "teal");

// Add the x-axis
svg.append("g")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(x))

// Add the y-axis
svg.append("g")
  .call(d3.axisLeft(y));
