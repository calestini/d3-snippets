
  //Viz space
var margin = {top: 30, right: 20, bottom: 30, left: 50},
  width = 350 - margin.left - margin.right,
  height = 350 - margin.top - margin.bottom,
  padding = 1;

var space = 20;
var colorgrid = new Array(space-2);//create an empty array with length 45

var colores = d3.scaleLinear()
      .domain([0,1])
      .interpolate(d3.interpolateHcl)
      .range([d3.rgb(241,91,36,1), d3.rgb('#363e4f')]);
/*
      //Player A Nelson Cruz
       [[ 0.06  0.13  0.22  0.5   0.36  0.64  0.68  0.62]
        [ 0.06  0.15  0.2   0.39  0.27  0.68  0.82  1.02]
        [ 0.06  0.1   0.22  0.16  0.34  0.31  0.48  1.01]]

      //Josh Donaldson
      [[ 0.04  0.22  0.28  0.5   0.04  0.81  1.39  0.95]
      [ 0.05  0.11  0.21  0.54  0.49  0.42  0.45  1.29]
      [ 0.05  0.11  0.22  0.1   0.33  0.37  0.53  0.74]]
*/
//

var states = [
  {'x': 1, 'y': 0, 'color': '#52c2b8', 'playerA': 0.06, 'playerB': 0.04, 'axis': 'None'},
  {'x': 2, 'y': 0, 'color': '#52c2b8', 'playerA': 0.13, 'playerB': 0.22, 'axis': '1st'},
  {'x': 3, 'y': 0, 'color': '#52c2b8', 'playerA': 0.22, 'playerB': 0.28, 'axis': '2nd'},
  {'x': 4, 'y': 0, 'color': '#52c2b8', 'playerA': 0.5 , 'playerB': 0.5,  'axis': '3rd'},
  {'x': 5, 'y': 0, 'color': '#52c2b8', 'playerA': 0.36, 'playerB': 0.04, 'axis': '1+2'},
  {'x': 6, 'y': 0, 'color': '#52c2b8', 'playerA': 0.64, 'playerB': 0.81, 'axis': '1+3'},
  {'x': 7, 'y': 0, 'color': '#52c2b8', 'playerA': 0.68, 'playerB': 1.39, 'axis': '2+3'},
  {'x': 8, 'y': 0, 'color': '#52c2b8', 'playerA': 0.62, 'playerB': 0.95, 'axis': '1+2+3'},
  {'x': 1, 'y': 1, 'color': '#42bae1', 'playerA': 0.06, 'playerB': 0.05, 'axis': 'None'},
  {'x': 2, 'y': 1, 'color': '#42bae1', 'playerA': 0.15, 'playerB': 0.11, 'axis': '1st'},
  {'x': 3, 'y': 1, 'color': '#42bae1', 'playerA': 0.2 , 'playerB': 0.21, 'axis': '2nd'},
  {'x': 4, 'y': 1, 'color': '#42bae1', 'playerA': 0.39, 'playerB': 0.54, 'axis': '3rd'},
  {'x': 5, 'y': 1, 'color': '#42bae1', 'playerA': 0.27, 'playerB': 0.49, 'axis': '1+2'},
  {'x': 6, 'y': 1, 'color': '#42bae1', 'playerA': 0.68, 'playerB': 0.42, 'axis': '1+3'},
  {'x': 7, 'y': 1, 'color': '#42bae1', 'playerA': 0.82, 'playerB': 0.45, 'axis': '2+3'},
  {'x': 8, 'y': 1, 'color': '#42bae1', 'playerA': 1.02, 'playerB': 1.29, 'axis': '1+2+3'},
  {'x': 1, 'y': 2, 'color': '#f15b24', 'playerA': 0.06, 'playerB': 0.05, 'axis': 'None'},
  {'x': 2, 'y': 2, 'color': '#f15b24', 'playerA': 0.1 , 'playerB': 0.11, 'axis': '1st'},
  {'x': 3, 'y': 2, 'color': '#f15b24', 'playerA': 0.22, 'playerB': 0.22, 'axis': '2nd'},
  {'x': 4, 'y': 2, 'color': '#f15b24', 'playerA': 0.16, 'playerB': 0.1, 'axis':  '3rd'},
  {'x': 5, 'y': 2, 'color': '#f15b24', 'playerA': 0.34, 'playerB': 0.33, 'axis': '1+2'},
  {'x': 6, 'y': 2, 'color': '#f15b24', 'playerA': 0.31, 'playerB': 0.37, 'axis': '1+3'},
  {'x': 7, 'y': 2, 'color': '#f15b24', 'playerA': 0.48, 'playerB': 0.53, 'axis': '2+3'},
  {'x': 8, 'y': 2, 'color': '#f15b24', 'playerA': 1.01, 'playerB': 0.74, 'axis': '1+2+3'},
]
//

var xScale = d3.scaleLinear().range([0, width]);
var yScale = d3.scaleLinear().range([height, 0]); //inverting scale for y-axis to a normal axis

xScale.domain([0, 3]);
yScale.domain([0, 100]);

var hgrid = Math.floor(width / 8);
var vgrid = Math.floor(height / 24);

var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);

var xaxis = [0.50,1.];

var g = svg.append("g")
            .attr("transform","translate(" + margin.left + "," + 20 + ")");


g.selectAll('.xaxis1')
  .data(xaxis)
  .enter().append('line')
  .style('stroke', ' #363e4f')
  .style('stroke-linecap', 'round')
  .style('stroke-dasharray',"2,2")
  .style("stroke-opacity", .2)
  .attr('x1', function(d, i){return  width/2 +8+ xScale(d);})
  .attr('y1', 0)
  .attr('x2', function(d, i){return  width/2 +8+ xScale(d);})
  .attr('y2', height)


g.selectAll('.xaxis2')
  .data(xaxis)
  .enter().append('line')
  .style('stroke', '#363e4f')
  .style('stroke-linecap', 'round')
  .style('stroke-dasharray',"2,2")
  .style("stroke-opacity", .2)
  .attr('x1', function(d, i){return  width/2-8- xScale(d);})
  .attr('y1', 0)
  .attr('x2', function(d, i){return  width/2-8- xScale(d);})
  .attr('y2', height)

d3.json("/player-comparison.json", function(error, data){
  data.forEach(function (d){
    d.x = +d.x;
    d.y = +d.y;
    d.playerA = +d.playerA;
    d.playerB = +d.playerB;
  });

  g.selectAll('.rect')
    .data(data)
    .enter().append('rect')
    .attr('x', function(d){return width/2+8;})
    .attr('y', function(d, i){return (i)*vgrid;})
    .attr('width', function (d){ return xScale(d.playerA);})
    .attr('fill', function (d){return d.color;})
    .attr('height', vgrid-padding)
    .attr('rx', 5)
    .attr('ry', 5);
});




g.selectAll('.rect2')
  .data(states)
  .enter().append('rect')
  .attr('x', function(d){return width/2-8-xScale(d.playerB);})
  .attr('y', function(d, i){return (i)*vgrid;})
  .attr('width', function (d){ return xScale(d.playerB);})
  .attr('fill', function (d){return d.color;})
  .attr('height', vgrid-padding)
  .attr('rx', 5)
  .attr('ry', 5)


g.selectAll('.axis')
  .data(states)
  .enter().append('text')
  .text(function (d,i){return d.axis})
  .attr('x', function(d){return width/2;})
  .attr('y', function(d, i){return (i)*vgrid+vgrid/2+padding;})
  .style("text-anchor", "middle")
  .style('fill', function (d){return d.color;})
  .attr('font-family', 'Helvetica')
  .attr('font-style', 'strong')
  .attr('font-size', 5)


g.selectAll('.xlabels')
  .data(xaxis)
  .enter().append('text')
  .text(function (d){return d.toFixed(2);})
  .attr('x', function(d){return  width/2 +8+ xScale(d)-1;})
  .attr('y',3)
  .style("text-anchor", "end")
  .style('fill', '#d6cfcf')
  .attr('font-family', 'Helvetica')
  .attr('font-style', 'strong')
  .attr('font-size', 5)


  g.append('text')
    .text('Josh Donaldson')
    .attr('x', width/2 - 8 )
    .attr('y', -5)
    .style("text-anchor", "end")
    .style('fill', '#d6cfcf')
    .attr('font-family', 'Helvetica')
    .attr('font-style', 'strong')
    .attr('font-size', 12)


  g.append('text')
    .text('Nelson Cruz')
    .attr('x', width/2 + 8 )
    .attr('y', -5)
    .style("text-anchor", "start")
    .style('fill', '#d6cfcf')
    .attr('font-family', 'Helvetica')
    .attr('font-style', 'strong')
    .attr('font-size', 12)


  g.selectAll('.xlabels2')
    .data(xaxis)
    .enter().append('text')
    .text(function (d){return d.toFixed(2);})
    .attr('x', function(d){return  width/2-8- xScale(d)+1;})
    .attr('y',3)
    .style("text-anchor", "start")
    .style('fill', '#d6cfcf')
    .attr('font-family', 'Helvetica')
    .attr('font-style', 'strong')
    .attr('font-size', 5)
