
  //Viz space
  var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  //Creating svg space
	var svg = d3.select("body").append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
            .append("g")
              .attr("transform","translate(" + margin.left + "," + margin.top + ")");


  var x = d3.scaleLinear().range([0, 500]);
	var y = d3.scaleLinear().range([500, 0]); //inverting scale for y-axis to a normal axis

  x.domain([0, 100]);
  y.domain([0, 100]);

  var outter_field = [
        {"x":50, "y":0},
        {"x":0,"y":50},
        {"x":30,"y":90},
        {"x":70,"y":90},
        {"x":100,"y":50},
      ];

  var diamond = [
        {"x":50, "y":10},
        {"x":30,"y":30},
        {"x":50,"y":50},
        {"x":70,"y":30},
      ];

  var left_triangle = [
        {"x":-5, "y":0},
        {"x":-5,"y":55},
        {"x":50,"y":0},
      ];

  var right_triangle = [
        {"x":105, "y":0},
        {"x":105,"y":55},
        {"x":50,"y":0},
      ];


  var arcGenerator = d3.arc();


  var pathData = arcGenerator({
    startAngle:  -45 * (Math.PI/180),
    endAngle: 45 * (Math.PI/180),
    innerRadius: x(5),
    outerRadius: x(50),
  });


svg.selectAll("polygon").data([outter_field]).enter()
.append("polygon")
  .attr("points",function(d) {
      return d.map(function(d) {
          return [x(d.x),y(d.y)].join(",");
      })
  }).attr('fill','#47681a');


var points = [
  [x(50),y(0)],
	[x(15),y(20)],
  [x(50), y(55)],
	[x(85),y(20)],
  [x(50),y(0)]
];

var lineGenerator = d3.line().curve(d3.curveNatural);
var pathData4 = lineGenerator(points);
svg.append('path').attr('d', pathData4).attr('fill', '#e5d3ae')//.attr('transform', 'translate(' +x(50) +','+ y(5)+')');
    //.attr('transform', 'translate(' +x(50) +','+ y(5)+')')


/*
svg.append('path')
    .attr('d', pathData)
    .attr('transform', 'translate(' +x(50) +','+ y(5)+')')
    .attr('class','small_arc')
      ;

//d3.select('path').attr('d', pathData);
  //outfield
  /*
  svg.append('ellipse')
  .attr('cx', x(50))
  .attr('cy', y(10))
  .attr('rx', x(65))
  .attr('ry', x(75))
    ;
*/
  //infield
  /*
  svg.append('ellipse')
  .attr('cx', x(50))
  .attr('cy', y(10))
  .attr('rx', x(35))
  .attr('ry', x(43))
  .attr('class','small_arc')
    ;
*/
  svg.data([diamond]).append("polygon")
    .attr("points",function(d) {
        return d.map(function(d) {
            return [x(d.x),y(d.y)].join(",");
        }).join(" ");
    }).attr('fill','#47681a');

  svg.data([left_triangle])
  .append("polygon")
    .attr("points",function(d) {
        return d.map(function(d) {
            return [x(d.x),y(d.y)].join(",");
        })
    })
    .attr('fill', 'white');;

  svg.data([right_triangle])
  .append("polygon")
    .attr("points",function(d) {
        return d.map(function(d) {
            return [x(d.x),y(d.y)].join(",");
        })
    })
    .attr('fill', 'white');

  svg.append("circle").attr("r", 10).attr("cx", x(50)).attr("cy", y(30)).attr('class', 'bases');
  svg.append("circle").attr("r", 10).attr("cx", x(30)).attr("cy", y(30)).attr('class', 'bases');
  svg.append("circle").attr("r", 10).attr("cx", x(70)).attr("cy", y(30)).attr('class', 'bases');
  svg.append("circle").attr("r", 10).attr("cx", x(50)).attr("cy", y(50)).attr('class', 'bases');
  svg.append("circle").attr("r", 10).attr("cx", x(50)).attr("cy", y(10)).attr('class', 'bases');
