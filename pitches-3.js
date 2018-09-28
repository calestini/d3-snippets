const margin = {top: 20, right: 20, bottom: 20, left:50};
var width = 700 - margin.left - margin.right;
var  height = 700 - margin.top - margin.bottom;
const  padding = 1;
const MapColumns = 40;
const MapRows = 40;

//map hexagons
var hexRadius = d3.min([
	  width/((MapColumns + 0.5) * Math.sqrt(3)),
		height/((MapRows + 1/3) * 1.5)
  ]);

//Set the new height and width of the SVG based on the max possible
width = MapColumns*hexRadius*Math.sqrt(3);
height = MapRows*1.5*hexRadius+0.5*hexRadius;

//Set the hexagon radius
var hexbin = d3.hexbin().radius(hexRadius);


function render_data(pitch){

//read csv and render elements
d3.csv(pitch+'.csv', function(error, data){

		// d3.selectAll('svg').remove();
		//creating svg and g
		var svg = d3.select("body").append("svg")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.top + margin.bottom);


    var points = [];

    data.forEach(function(d){
        d.plate_x_bin = +d.plate_x_bin;
				d.plate_z_bin = +d.plate_z_bin;
				d.ba = +d.ba;

        points.push([hexRadius * d.plate_x_bin * 1.745 + 0.5, hexRadius * d.plate_z_bin * 1.5, d.ba, d.pitch_name]);

   	})

   var colores = d3.scaleLinear()
         .domain([0,1]) //probabity
         .interpolate(d3.interpolateHcl)
         .range(['beige', d3.rgb(241,91,36,1)]);

    var g = svg.append("g")
  	     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var radiusScale = d3.scaleSqrt().domain([0,hexRadius]).range(-1,4.5)
		//y values
		var xValue = function(d){return +d.plate_x_bin};
		var xScale = d3.scaleLinear().range([0, width]).nice();
		var xAxis = d3.axisBottom(xScale);

		//x values
		var yValue = function(d){return +d.plate_z_bin};
		var yScale = d3.scaleLinear().range([height, 0]).nice();
		var yAxis = d3.axisLeft(yScale);

		 xScale.domain([-2.5, 2.5]).clamp(true);
		 yScale.domain([0, 5]).clamp(true);

     g.selectAll(".hexagon")
        .data(hexbin(points))
        .enter().append("path")
        .attr("class", "hexagon")
        .attr('stroke', '#fff')
        .attr("d", function (d) {
        	return "M" + d.x + "," + d.y + hexbin.hexagon();
        })
        .attr('class', 'fieldLocation')

    g.selectAll('path').data(data)
        .attr('fill', 'transparent')
        .filter(function(d) { return d.ba > 0 })
        .attr('fill', function(d){return colores(d.ba);})



   // xScale.domain(0, 500).clamp(true);
   // yScale.domain([0, 500]).clamp(true);

	 g.append('rect')
	 .attr('x', xScale(-0.75))
	 .attr('y', yScale(3.25))
	 .attr('width', xScale(0.75) - xScale(-0.75))
	 .attr('height', yScale(1.75) - yScale(3.25))
	 .style('fill', 'transparent')
	 .style('stroke', '#363e4f')
	 .style('stroke-dasharray',"2,2")
	 .style("stroke-opacity", 1)

	 // console.log(xScale(1));

	 ////   inserting axis in the outside space
	 //x axis
	 g.append("g")
	    .attr("transform", "translate(0," + height + ")")
	    .call(xAxis
				.tickValues([0])
				.tickSize(-height)
			)
			.attr("class", "ticks")
			.attr('font-family', 'Helvetica')
			.attr('font-size', 16)
		  // .style('stroke-dasharray',"5,5")

	g.append("text")
				.attr("class", "label")
				.attr("x", 0)
				.attr("y", height-10)
				.style("text-anchor", "start")
				.text("Horizontal Location (Feet)")
				.style('fill', 'grey')
				.attr('font-family', 'Helvetica')
				.attr('font-style', 'strong')
				.attr('font-size', 16)

    //y-axis

    g.append("g")
      .call(yAxis.ticks(4)
    			// .tickFormat("")
    			.tickValues([2.5])
    			.tickSize(-width)
    		)
    		.attr("class", "ticks")
        .attr('font-family', 'Helvetica')
        .attr('font-style', 'strong')
        .attr('font-size', 16)


  g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -25)
      .attr('x',-height +30)
      .attr("dy", ".71em")
      .style("text-anchor", "start")
      .text("Vertical Location (Feet)")
      .style('fill', 'grey')
      .attr('font-family', 'Helvetica')
      .attr('font-style', 'strong')
      .attr('font-size', 16)

	 g.append("text")
		.attr("class", "label")
		.attr("x", width/2)
		.attr("y",50)
		.style("text-anchor", "middle")
		.text(pitch)
		.style('fill', 'black')
		.attr('font-family', 'Helvetica')
		.attr('font-style', 'strong')
		.attr('font-size', 35)

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
};

const pitch_types = ['2-Seam Fastball', '4-Seam Fastball', 'Changeup', 'Curveball', 'Cutter', 'Knuckle Curve', 'Sinker', 'Slider'];

render_data('Slider')
// render_data('2-Seam Fastball')
// render_data('4-Seam Fastball')
// render_data('Changeup')
//
// render_data('Curveball')
// render_data('Cutter')
// render_data('Knuckle Curve')
// render_data('Sinker')
