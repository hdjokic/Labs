const dataset = [
    { year: 2016, Billion: 137.7 },
    { year: 2017, Billion: 141.2 },
    { year: 2018, Billion: 166.2},
    { year: 2019, Billion: 142.3 },
    { year: 2020, Billion: 137.7 },
    { year: 2016, Billion: 127.7 },
    { year: 2017, Billion: 191.2 },
    { year: 2018, Billion: 106.2},
    { year: 2019, Billion: 102.3 },
    { year: 2020, Billion: 157.7 },
    { year: 2016, Billion: 107.7 },
    { year: 2017, Billion: 11.2 },
    { year: 2018, Billion: 66.2},
    { year: 2019, Billion: 42.3 },
    { year: 2020, Billion: 37.7 },
    { year: 2016, Billion: 117.7 },
    { year: 2029, Billion: 131.2 },
    { year: 2028, Billion: 16.2},
    { year: 2029, Billion: 12.3 },
    { year: 2025, Billion: 177.7 },

    ];
  
    var margin = {top: 100, right: 100, bottom: 100, left: 100}
    , width = window.innerWidth - margin.left - margin.right
    , height = window.innerHeight - margin.top - margin.bottom;

  
  var n = dataset.length;
  var startingYear=2016;

  var xScale = d3.scaleLinear()
      .domain([startingYear+0,startingYear+n-1 ]) 
      .range([0, width]);
   
  var yScale = d3.scaleLinear()
      .domain([0, 200]) 
      .range([height, 0]);  
  
  var line = d3.line()
      .x(function(d, i) { return xScale(); }) 
      .y(function(d) { return yScale(); })  
      .curve(d3.curveMonotoneX) 
  
  
  var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3
            .axisBottom(xScale)
            .ticks(5)
            ); 
      
  svg.append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(yScale)); 
  
  svg.append("path")
      .datum(dataset) 
      .attr("class", "line") 
      .attr("d", line);  
   
  svg.selectAll(".dot")
      .data(dataset)
    .enter().append("circle") 
      .attr("class", "dot")
      .attr("cx", function(d, i) { return xScale(d.year) })
      .attr("cy", function(d) { return yScale(d.Billion) })
      .attr("r", 5);