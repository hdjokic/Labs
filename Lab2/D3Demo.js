const data = [
    { company: 'Apple', Billion: 51.41 },
    { company: 'Saudi Aramco', Billion: 49.27},
    { company: 'Facebook', Billion: 29.14 },
    { company: 'SoftBank Group', Billion: 47.05 },
    { company: 'A Group', Billion: 97.05 }
    ];
  
    const width = 1000;
    const height = 550;
    const margin = { top: 50, bottom: 50, left: 50, right:50 };
  
    const svg = d3.select('#d3-container')
        .append('svg')
        .attr('width', width - margin.left - margin.right)
        .attr('height', height - margin.top - margin.bottom)
        .attr("viewBox", [0, 0, width, height]);

    const x = d3.scaleBand()
        .domain(d3.range(data.length))
        .range([margin.left, width - margin.right])
        .padding(0.1)

    const y = d3.scaleLinear()
        .domain([0, 100])
        .range([height - margin.bottom, margin.top])
  
    svg
        .append("g")
        .attr("fill", 'blue')
        .selectAll("rect")
        .data(data.sort((a, b) => d3.descending(a.Billion, b.Billion)))
        .join("rect")
        .attr("x", (d, i) => x(i))
        .attr("y", d => y(d.Billion))
        .attr('title', (d) => d.Billion)
        .attr("class", "rect")
        .attr("height", d => y(0) - y(d.Billion))
        .attr("width", x.bandwidth());

    function xAxis(g) {
        g.attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).tickFormat(i => data[i].company))
            .attr("font-size", '20px')
        }
  
    function yAxis(g) {
        g.attr("transform", `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(y).ticks(null, data.format))
        .attr("font-size", '20px')
    }
  
    svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);
    svg.node();