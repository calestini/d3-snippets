///Initializer variables
const margin = {top: 30, right: 20, bottom: 30, left:50};
const width = 800 - margin.left - margin.right;
const  height = 800 - margin.top - margin.bottom;
const  padding = 1;

//y values
var xValue = function(d){return +d.launch_speed};
var xScale = d3.scaleLinear().range([0, width]).nice();
var xAxis = d3.axisBottom(xScale);

//x values
var yValue = function(d){return +d.launch_angle};
var yScale = d3.scaleLinear().range([height, 0]).nice();
var yAxis = d3.axisLeft(yScale);

//color scale
var colores = d3.scaleLinear()
      .domain([0,1]) //probabity
      // .interpolate(d3.interpolateHcl)
      .range([d3.rgb('#52c2b8'), d3.rgb('#f15b24')]);

//creating svg and g
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

//read csv and render elements
d3.csv('boston__batting_2018.csv', function(error, data){

   data.forEach(function(d){
            d.launch_angle = +d.launch_angle;
            d.launch_speed = +d.launch_speed;
						d.estimated_ba_using_speedangle = +d.estimated_ba_using_speedangle;
						d.hc_x = d.hc_x;
						d.hc_y = d.hc_y;
   })

   xScale.domain([0, 120]).clamp(true);
   yScale.domain([-70, 70]).clamp(true);

	 // xScale.domain(0, 500).clamp(true);
   // yScale.domain([0, 500]).clamp(true);

	 var g = svg.append("g")
 	     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	 ////   inserting axis in the outside space
	 //x axis
	 g.append("g")
	    .attr("transform", "translate(0," + height + ")")
	    .call(xAxis
				.tickValues([15,30,45,60,75,90,105,120])
				// .tickSize(-height)
			)
			.attr("class", "ticks")
			.attr('font-family', 'Helvetica')
			.attr('font-size', 16)
		  // .style('stroke-dasharray',"5,5")

	g.append("text")
				.attr("class", "label")
				.attr("x", height)
				.attr("y", width)
				.style("text-anchor", "end")
				.text("Exit Velocity (mph)")
				.style('fill', 'grey')
				.attr('font-family', 'Helvetica')
				.attr('font-style', 'strong')
				.attr('font-size', 16)

	//y-axis
	g.append("g")
      .call(yAxis.ticks(4)
				// .tickFormat("")
				.tickValues([-70,-35,0,35,70])
				.tickSize(-width)
			)
			.attr("class", "ticks")
	    .attr('font-family', 'Helvetica')
	    .attr('font-style', 'strong')
	    .attr('font-size', 16)


  g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -25)
			.attr('x',-height/2)
      .attr("dy", ".71em")
    .style("text-anchor", "middle")
    .text("Launch Angle")
		.style('fill', 'grey')
		// .style('fill', '#d6cfcf')
		.attr('font-family', 'Helvetica')
		.attr('font-style', 'strong')
		.attr('font-size', 16)

		//datapoints
	 g.selectAll('.pitch')
		 .data(data)
		 .enter()
		 .append('circle')
		 // .filter(function(d) { return d.events =='home_run'; })
		 .attr('cx', 0)
		 .attr('cy', height/2)
		 .attr('r', 0.5)
		 .transition()
		 .duration(function (d,i){return 750;})
		 .delay(function(d,i){return 500-i;})
		 .attr('r', 7.5)
		 .attr('cx', function(d){return xScale(xValue(d));})
		 .attr('cy', function(d){return yScale(yValue(d));})
		 .style('opacity','0.2')
		 .style('fill', function(d){return colores(d.estimated_ba_using_speedangle)})
});
