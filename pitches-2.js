///Initializer variables
const margin = {top: 20, right: 20, bottom: 20, left:50};
var width = 700 - margin.left - margin.right;
var  height = 700 - margin.top - margin.bottom;
const  padding = 1;
const MapColumns = 60;
const MapRows = 90;

//map hexagons

var hexRadius = d3.min([
        width/((MapColumns + 0.5) * Math.sqrt(3)),
		height/((MapRows + 1/3) * 1.5)
    ]);

// console.log(hexRadius)

//Set the new height and width of the SVG based on the max possible
width = MapColumns*hexRadius*Math.sqrt(3);
height = MapRows*1.5*hexRadius+0.5*hexRadius;

//Set the hexagon radius
var hexbin = d3.hexbin().radius(hexRadius);

//creating svg and g
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

//read csv and render elements
d3.csv('pitch_bins.csv', function(error, data){

    var points = [];

    data.forEach(function(d){
        d.launch_speed_bin = +d.launch_speed_bin;
		d.launch_angle_bin = +d.launch_angle_bin;
		d.count = +d.count;

        points.push([hexRadius * d.launch_speed_bin * 1.745 + 0.5, hexRadius * d.launch_angle_bin * 1.5, d.count]);

   })

   var colores = d3.scaleLinear()
         .domain([-1,4.5]) //probabity
         .interpolate(d3.interpolateHcl)
         .range(['beige', d3.rgb(241,91,36,1)]);

    var g = svg.append("g")
  	     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var radiusScale = d3.scaleSqrt().domain([0,hexRadius]).range(-1,4.5)

     g.selectAll(".hexagon")
        .data(hexbin(points))
        .enter().append("path")
        .attr("class", "hexagon")
        .attr('stroke', '#fff')
        .attr("d", function (d) {
        	return "M" + d.x + "," + d.y + hexbin.hexagon(radiusScale(d[3]));
        })
        .attr('class', 'fieldLocation')


    g.selectAll('path').data(data)
        .attr('fill', '#fff')
        .filter(function(d) { return d.count > -0.574; })
        .attr('fill', function(d){return colores(d.count);})


	 //y values
	 var xValue = function(d){return +d.launch_speed};
	 var xScale = d3.scaleLinear().range([0, width]).nice();
	 var xAxis = d3.axisBottom(xScale);

	 //x values
	 var yValue = function(d){return +d.launch_angle};
	 var yScale = d3.scaleLinear().range([height, 0]).nice();
	 var yAxis = d3.axisLeft(yScale);

    xScale.domain([2, 122]).clamp(true);
    yScale.domain([-90, 90]).clamp(true);

   // xScale.domain(0, 500).clamp(true);
   // yScale.domain([0, 500]).clamp(true);


	 ////   inserting axis in the outside space
	 //x axis
	 g.append("g")
	    .attr("transform", "translate(0," + height + ")")
	    .call(xAxis
				.tickValues([30,60,90,120])
				.tickSize(-height)
			)
			.attr("class", "ticks")
			.attr('font-family', 'Helvetica')
			.attr('font-size', 16)
		  // .style('stroke-dasharray',"5,5")

	g.append("text")
				.attr("class", "label")
				.attr("x", width)
				.attr("y", height-10)
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
        .attr('font-family', 'Helvetica')
        .attr('font-style', 'strong')
        .attr('font-size', 16)

	 g.append("text")
		.attr("class", "label")
		.attr("x", width/2)
		.attr("y",- 5)
		.style("text-anchor", "middle")
		.text("Hit Probability - MLB 2018")
		.style('fill', 'grey')
		.attr('font-family', 'Helvetica')
		.attr('font-style', 'strong')
		.attr('font-size', 16)


    var canvas = d3.select("canvas").node(),
    context = canvas.getContext("2d"),
    canvasWidth = canvas.width;

    var image = context.createImageData(canvasWidth, 1),
    interpolate = d3.interpolateRgbBasis(colores.range());

    for (var i = 0, k = 0; i < canvasWidth; ++i, k += 4) {
      var c = d3.rgb(interpolate(i / (canvasWidth - 1)));
      image.data[k] = c.r;
      image.data[k + 1] = c.g;
      image.data[k + 2] = c.b;
      image.data[k + 3] = 255;
    }

    context.putImageData(image, 0, 0);
});
