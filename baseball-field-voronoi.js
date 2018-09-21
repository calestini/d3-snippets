
//Viz space
var margin = {top: 20, right: 20, bottom: 30, left: 50},
  width = 800 - margin.left - margin.right,
  height = 800 - margin.top - margin.bottom;


//Creating svg space
var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform","translate(" + margin.left + "," + margin.top + ")");


var xScale = d3.scaleLinear().range([0, width]);
var yScale = d3.scaleLinear().range([height, 0]); //inverting scale for y-axis to a normal axis

xScale.domain([0, 100]);
yScale.domain([0, 100]);

//outer field boundaries
var outter_field = [
      {"x":50, "y":0},
      {"x":0,"y":50},
      {"x":30,"y":90},
      {"x":70,"y":90},
      {"x":100,"y":50},
    ];

//diamond locations
var diamond = [
      {"x":50, "y":2},
      {"x":32,"y":20},
      {"x":50,"y":36},
      {"x":68,"y":20},
    ];

//elements to #empty the borders
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

var upper_left_triangle = [
  {"x":0, "y":50},
  {"x":0,"y":100},
  {"x":38,"y":100},
]

var upper_right_triangle = [
  {"x":62, "y":100},
  {"x":100,"y":100},
  {"x":100,"y":50},
]

var trapezius = [
  {"x":28, "y":90},
  {"x":37,"y":100},
  {"x":63,"y":100},
  {"x":72,"y":90},
]

//#############################################################################
/* Clarifications about the spots in the diamound.
1) We want to use a voronoi grid to separate points and create the field areas
2) We have multiple inner archs (of radius R[i]) in which the points are circumscribed
  2.A) The arcs start on Angle = 45 and all the way to Angle = 135
  2.B) As the figure is simetric, we need to place 3 points between 45 deg. and 90 deg.
      But we want them to be centered, so we need ot divide 45 / 4 = 11.25
3) We know that y[i] = R[i]*sin(teta) and x[i]= R[i]*cos(teta)

//#############################################################################
*/
var diamondAngle = 45;
var radiuses = [87, 75, 62, 55, 45, 38, 30]

//Function to convert from angle to radians, so we can use sine and cosine
function toRadians (angle) {
  return angle * (Math.PI / 180);
};

function getCoordinates(angle, radius){
  var x = radius * Math.cos(toRadians(angle));
  var y = radius * Math.sin(toRadians(angle));
  return {"x": x+50, "y": y};
};

function createHitMap(diamondAngle, radiuses){
  //creates the points in a scale to 100
  var angleIncrement = (90-diamondAngle)/(4);
  var locations_dic = [];

  var tempAngle = diamondAngle;
  for (j = 0; j< 6; j++){
    tempAngle = diamondAngle;
    for (i = 1; i<8; i++){
      tempAngle = tempAngle+(1*angleIncrement) //(starting point);

      var result = getCoordinates(tempAngle, radiuses[j]);
      locations_dic.push({
        "x": result.x,"y": result.y
      })
    }
  };


  locations_dic.push({
    "x": getCoordinates(diamondAngle+angleIncrement, 10).x,
    "y": getCoordinates(diamondAngle+angleIncrement, 10).y
  })
  locations_dic.push({
    "x": getCoordinates(90, 10).x,
    "y": getCoordinates(90, 10).y
  })
  locations_dic.push({
    "x": getCoordinates(diamondAngle+7*angleIncrement, 10).x,
    "y": getCoordinates(diamondAngle+7*angleIncrement, 10).y
  })


  //diamond points
  locations_dic.push({
    "x": getCoordinates(90, 2).x,
    "y": getCoordinates(90, 2).y
  })


  locations_dic.push({
    "x": getCoordinates(diamondAngle+2*angleIncrement, 20).x,
    "y": getCoordinates(diamondAngle+2*angleIncrement, 20).y
  })
  locations_dic.push({
    "x": getCoordinates(90, 20).x,
    "y": getCoordinates(90, 20).y
  })
  locations_dic.push({
    "x": getCoordinates(diamondAngle+6*angleIncrement, 20).x,
    "y": getCoordinates(diamondAngle+6*angleIncrement, 20).y
  })

  return locations_dic;
};

locations = createHitMap(40, radiuses);


var angles = [56.25, 67.50, 78.75, 90, 101.25, 112.50, 123.75, 135];
//points for all hit locations in the map:
var radiuses = [87, 75, 62, 55, 45, 38, 30]


var voronoi = d3.voronoi()
  .x(function(d) { return xScale(d.x); })
  .y(function(d) { return yScale(d.y); })
  .extent([[0, 0], [width, height]]);

var varanoiHitLocations = voronoi.polygons(locations);

svg.selectAll("polygon").data([outter_field]).enter()
.append("polygon")
  .attr("points",function(d) {
      return d.map(function(d) {
          return [xScale(d.x),yScale(d.y)].join(",");
      })
  }).attr('fill','#47681a');


svg.data([diamond]).append("polygon")
  .attr("points",function(d) {
      return d.map(function(d) {
          return [xScale(d.x),yScale(d.y)].join(",");
      }).join(" ");
  }).attr('fill','#b7a15f');

/*
svg.selectAll("circle")
    .data(locations).enter()
    .append("circle")
    .attr("cx", function(d){ return xScale(d.x);})
    .attr("cy", function(d){ return yScale(d.y);})
    .attr("r", 5)
*/

  svg.append("circle").attr("r", 10).attr("cx", xScale(50)).attr("cy", yScale(2)).attr('class', 'bases');
  svg.append("circle").attr("r", 10).attr("cx", xScale(32)).attr("cy", yScale(20)).attr('class', 'bases');
  svg.append("circle").attr("r", 10).attr("cx", xScale(50)).attr("cy", yScale(36)).attr('class', 'bases');
  svg.append("circle").attr("r", 10).attr("cx", xScale(68)).attr("cy", yScale(20)).attr('class', 'bases');
  svg.append("circle").attr("r", 10).attr("cx", xScale(50)).attr("cy", yScale(20)).attr('class', 'bases');


svg.selectAll("path")
  .data(varanoiHitLocations)
  .enter()
  .append("path")
  .attr("d", function(d) { return "M" + d.join(",") + "Z"; })
  .attr('fill', 'transparent')
  .attr('stroke','grey')
  .attr('class', 'fieldLocation')

/*
svg.data([left_triangle])
.append("polygon")
  .attr("points",function(d) {
      return d.map(function(d) {
          return [xScale(d.x),yScale(d.y)].join(",");
      })
  })
  .attr('fill', 'white');;

svg.data([right_triangle])
.append("polygon")
  .attr("points",function(d) {
      return d.map(function(d) {
          return [xScale(d.x),yScale(d.y)].join(",");
      })
  })
  .attr('fill', 'white');



svg.data([upper_left_triangle])
  .append("polygon")
    .attr("points",function(d) {
        return d.map(function(d) {
            return [xScale(d.x),yScale(d.y)].join(",");
        })
    })
    .attr('fill', 'white');

svg.data([upper_right_triangle])
  .append("polygon")
    .attr("points",function(d) {
        return d.map(function(d) {
            return [xScale(d.x),yScale(d.y)].join(",");
        })
    })
    .attr('fill', 'white');


svg.data([trapezius])
  .append("polygon")
    .attr("points",function(d) {
        return d.map(function(d) {
            return [xScale(d.x),yScale(d.y)].join(",");
        })
    })
    .attr('fill', 'white');
*/
