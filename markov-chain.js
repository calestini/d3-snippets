/*
state-space S
Runners:| None | 1st  | 2nd  | 3rd | 1&2 | 1&3 | 2&3 | 1,2,3 |
Outs
0       |  #1  | #2   | #3   | #4  | #5  | #6  | #7  |  #8   |
1       |  #9  | #10  | #11  | #12 | #13 | #14 | #15 |  #16  |
2       |  #17 | #18  | #19  | #20 | #21 | #22 | #23 |  #24  |
*/


  //Viz space
var margin = {top: 30, right: 20, bottom: 30, left: 50},
  width = 500 - margin.left - margin.right,
  height = 250 - margin.top - margin.bottom,
  padding = 1;

var space = 20;
var colorgrid = new Array(space-2);//create an empty array with length 45
var hgrid = Math.floor(width / 8);
var vgrid = Math.floor(height / 3);

var ylabels = ['0 out','1 out','2 out'];
var xlabels = ['None','1st','2nd','3rd','1+2', '1+3','2+3','1+2+3'];

var colores = d3.scaleLinear().domain([0,1])
      .interpolate(d3.interpolateHcl)
      .range([d3.rgb(241,91,36,1), d3.rgb('#363e4f')]);

var colores4 = d3.scaleLinear().domain([0,1.5])
      .interpolate(d3.interpolateHcl)
      .range([d3.rgb(241,91,36,1), d3.rgb('#363e4f')]);


  //Creating svg space
/*
var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform","translate(" + margin.left + "," + margin.top + ")");

var xScale = d3.scaleLinear().range([0, 500]);
var yScale = d3.scaleLinear().range([500, 0]); //inverting scale for y-axis to a normal axis

xScale.domain([0, 100]);
yScale.domain([0, 100]);

var states = [
  {'x': 1, 'y': 0, 'color': '#52c2b8', 'runprob': 0.02381564},
  {'x': 2, 'y': 0, 'color': '#52c2b8', 'runprob': 0.06287995},
  {'x': 3, 'y': 0, 'color': '#52c2b8', 'runprob': 0.14434191},
  {'x': 4, 'y': 0, 'color': '#52c2b8', 'runprob': 0.4719409 },
  {'x': 5, 'y': 0, 'color': '#52c2b8', 'runprob': 0.22464882},
  {'x': 6, 'y': 0, 'color': '#52c2b8', 'runprob': 0.66163931},
  {'x': 7, 'y': 0, 'color': '#52c2b8', 'runprob': 0.63355921},
  {'x': 8, 'y': 0, 'color': '#52c2b8', 'runprob': 0.90293474},
  {'x': 1, 'y': 1, 'color': '#42bae1', 'runprob': 0.02173804},
  {'x': 2, 'y': 1, 'color': '#42bae1', 'runprob': 0.07115754},
  {'x': 3, 'y': 1, 'color': '#42bae1', 'runprob': 0.17315725},
  {'x': 4, 'y': 1, 'color': '#42bae1', 'runprob': 0.48777415},
  {'x': 5, 'y': 1, 'color': '#42bae1', 'runprob': 0.26763072},
  {'x': 6, 'y': 1, 'color': '#42bae1', 'runprob': 0.59706231},
  {'x': 7, 'y': 1, 'color': '#42bae1', 'runprob': 0.55744281},
  {'x': 8, 'y': 1, 'color': '#42bae1', 'runprob': 0.83174637},
  {'x': 1, 'y': 2, 'color': '#f15b24', 'runprob': 0.02228551},
  {'x': 2, 'y': 2, 'color': '#f15b24', 'runprob': 0.07960136},
  {'x': 3, 'y': 2, 'color': '#f15b24', 'runprob': 0.19540237},
  {'x': 4, 'y': 2, 'color': '#f15b24', 'runprob': 0.23691565},
  {'x': 5, 'y': 2, 'color': '#f15b24', 'runprob': 0.26952145},
  {'x': 6, 'y': 2, 'color': '#f15b24', 'runprob': 0.31919628},
  {'x': 7, 'y': 2, 'color': '#f15b24', 'runprob': 0.36945784},
  {'x': 8, 'y': 2, 'color': '#f15b24', 'runprob': 0.58550094},
]


svg.selectAll('rect')
  .data(states)
  .enter().append('rect')
  //.transition()
  //.attr("delay", function(d,i){return 10*i;})
  //.attr("duration", function(d,i){return 10*(i+1)})
  .attr('x', function(d){return (d.x-1)*hgrid;})
  .attr('y', function(d){return (d.y)*vgrid;})
  .attr('width', hgrid-padding)
  .attr('height', vgrid-padding)
  .attr('fill', function(d){return d.color;})
  .attr('rx', padding)
  .attr('ry', padding)
  .attr('class', 'bordered');

svg.selectAll('.ylabel')
  .data(ylabels).enter().append('text')
  .text(function (d){return d;})
  .attr('x', 0)
  .attr('y', function(d, i){return (i)*vgrid;} )
  .attr("transform", "translate(-5," + vgrid / 2 + ")")
  .style("text-anchor", "end")
  .attr('font-family', 'Helvetica')
      .attr('font-size', 12)

svg.selectAll('.xlabel').data(xlabels).enter().append('text')
  .text(function (d){return d;})
  .attr('x', function(d, i){return (i)*hgrid-padding/2;} )
  .attr('y', 0)
  .attr("transform", "translate(" + hgrid / 2 + ",-4)")
  .style("text-anchor", "middle")
.attr('font-family', 'Helvetica')
    .attr('font-size', 12)


svg.selectAll('.inner').data(states).enter().append('text')
  .text(function (d, i){return '#'+(i+1);})
  .attr('x',  function(d){return (d.x-1)*hgrid;} )
  .attr('y', function(d){return (d.y)*vgrid;})
  .attr("transform", "translate(" + (hgrid - padding) / 2 + ","+(vgrid+padding) / 2+")")
  .style("text-anchor", "middle")
  .style('fill', 'white')
  .attr('font-family', 'Helvetica')
  .attr('font-size', 16)

svg.append('text')
  .text('Bases:')
  .attr('x', 0 )
  .attr('y', -4)
  .style("text-anchor", "end")
  .attr('font-family', 'Helvetica')
  .attr('font-size', 12)

var svg2 = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + 5)

var g2 = svg2.append("g")
            .attr("transform","translate(" + margin.left + "," + 20 + ")");

g2.selectAll('rect')
  .data(states)
  .enter().append('rect')
  //.transition()
  //.attr("delay", function(d,i){return 10*i;})
  //.attr("duration", function(d,i){return 10*(i+1)})
  .attr('x', function(d){return (d.x-1)*hgrid;})
  .attr('y', function(d){return (d.y)*vgrid;})
  .attr('width', hgrid-padding)
  .attr('height', vgrid-padding)
  .attr('fill', function(d, i){return colores(d.runprob)})
  .attr('rx', padding)
  .attr('ry', padding)
  .attr('class', 'bordered');



for(var i=0;i<colorgrid.length;i++){
  colorgrid[i] = i*(1/space);
};

  g2.selectAll('.inner').data(states).enter().append('text')
    .text(function (d, i){return Math.round(d.runprob * 100) / 100;})
    .attr('x',  function(d){return (d.x-1)*hgrid;} )
    .attr('y', function(d){return (d.y)*vgrid;})
    .attr("transform", "translate(" + (hgrid - padding) / 2 + ","+(vgrid+padding) / 2+")")
    .style("text-anchor", "middle")
    .style('fill', 'white')
    .attr('font-family', 'Helvetica')
    .attr('font-size', 14)


  g2.selectAll('.ylabel')
    .data(ylabels).enter().append('text')
    .text(function (d){return d;})
    .attr('x', 0)
    .attr('y', function(d, i){return (i)*vgrid;} )
    .attr("transform", "translate(-5," + vgrid / 2 + ")")
    .style("text-anchor", "end")
    .attr('font-family', 'Helvetica')
        .attr('font-size', 12)

  g2.selectAll('.xlabel').data(xlabels).enter().append('text')
    .text(function (d){return d;})
    .attr('x', function(d, i){return (i)*hgrid-padding/2;} )
    .attr('y', 0)
    .attr("transform", "translate(" + hgrid / 2 + ",-4)")
    .style("text-anchor", "middle")
  .attr('font-family', 'Helvetica')
      .attr('font-size', 12)


  svg2.selectAll('.scale')
    .data(colorgrid)
    .enter().append('rect')
    .attr('x', function(d, i){return (width/space)*i + (width/space)-padding + margin.left ;})
    .attr('y', height+20)
    .attr('width', 20)
    .attr('height', 10)
    .attr('fill', function(d, i){return colores(d)})
    .attr('rx', 4)
    .attr('ry', 4)
    .attr('class', 'bordered');


  g2.append('text')
    .text('Bases:')
    .attr('x', 0 )
    .attr('y', -4)
    .style("text-anchor", "end")
    .attr('font-family', 'Helvetica')
    .attr('font-size', 12)


  svg2.append('text')
    .text('0')
    .attr('x', 20-10 +margin.left)
    .attr('y', height+20+8)
    .style("text-anchor", "end")
    .style('fill', 'f15b24')
    .attr('font-family', 'Helvetica')
    .attr('font-size', 10)

  svg2.append('text')
    .text('1')
    .attr('x', width-20+margin.left)
    .attr('y', height+20+8)
    .style("text-anchor", "start")
    .style('fill', 'bl#363e4fe')
    .attr('font-family', 'Helvetica')
    .attr('font-size', 10)
//console.log(colorgrid);
*/
//******************************************************************************//
/*
width3 = 1000
height3 = 500

var svg3 = d3.select("body").append("svg")
            .attr("width", width3 + margin.left + margin.right)
            .attr("height", height3 + margin.top + 5)

var g3 = svg3.append("g")
            .attr("transform","translate(" + margin.left + "," + 20 + ")");

var Tmatrix = [{'outs': 0.0, 'post_state': 1, 'pre_state': 1, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 2, 'pre_state': 1, 'runs': 0.0},
 {'outs': 0.0, 'post_state': 3, 'pre_state': 1, 'runs': 0.0},
 {'outs': 0.0, 'post_state': 4, 'pre_state': 1, 'runs': 0.0},
 {'outs': null, 'post_state': 5, 'pre_state': 1, 'runs': null},
 {'outs': null, 'post_state': 6, 'pre_state': 1, 'runs': null},
 {'outs': null, 'post_state': 7, 'pre_state': 1, 'runs': null},
 {'outs': null, 'post_state': 8, 'pre_state': 1, 'runs': null},
 {'outs': 1.0, 'post_state': 9, 'pre_state': 1, 'runs': 0.0},
 {'outs': null, 'post_state': 10, 'pre_state': 1, 'runs': null},
 {'outs': null, 'post_state': 11, 'pre_state': 1, 'runs': null},
 {'outs': null, 'post_state': 12, 'pre_state': 1, 'runs': null},
 {'outs': null, 'post_state': 13, 'pre_state': 1, 'runs': null},
 {'outs': null, 'post_state': 14, 'pre_state': 1, 'runs': null},
 {'outs': null, 'post_state': 15, 'pre_state': 1, 'runs': null},
 {'outs': null, 'post_state': 16, 'pre_state': 1, 'runs': null},
 {'outs': null, 'post_state': 17, 'pre_state': 1, 'runs': null},
 {'outs': null, 'post_state': 18, 'pre_state': 1, 'runs': null},
 {'outs': null, 'post_state': 19, 'pre_state': 1, 'runs': null},
 {'outs': null, 'post_state': 20, 'pre_state': 1, 'runs': null},
 {'outs': null, 'post_state': 21, 'pre_state': 1, 'runs': null},
 {'outs': null, 'post_state': 22, 'pre_state': 1, 'runs': null},
 {'outs': null, 'post_state': 23, 'pre_state': 1, 'runs': null},
 {'outs': null, 'post_state': 24, 'pre_state': 1, 'runs': null},
 {'outs': null, 'post_state': 25, 'pre_state': 1, 'runs': null},
 {'outs': null, 'post_state': 26, 'pre_state': 1, 'runs': null},
 {'outs': null, 'post_state': 27, 'pre_state': 1, 'runs': null},
 {'outs': null, 'post_state': 28, 'pre_state': 1, 'runs': null},
 {'outs': 0.0, 'post_state': 1, 'pre_state': 2, 'runs': 2.0},
 {'outs': 0.0, 'post_state': 2, 'pre_state': 2, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 3, 'pre_state': 2, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 4, 'pre_state': 2, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 5, 'pre_state': 2, 'runs': 0.0},
 {'outs': 0.0, 'post_state': 6, 'pre_state': 2, 'runs': 0.0},
 {'outs': 0.0, 'post_state': 7, 'pre_state': 2, 'runs': 0.0},
 {'outs': null, 'post_state': 8, 'pre_state': 2, 'runs': null},
 {'outs': 1.0, 'post_state': 9, 'pre_state': 2, 'runs': 1.0},
 {'outs': 1.0, 'post_state': 10, 'pre_state': 2, 'runs': 0.0},
 {'outs': 1.0, 'post_state': 11, 'pre_state': 2, 'runs': 0.0},
 {'outs': 1.0, 'post_state': 12, 'pre_state': 2, 'runs': 0.0},
 {'outs': null, 'post_state': 13, 'pre_state': 2, 'runs': null},
 {'outs': null, 'post_state': 14, 'pre_state': 2, 'runs': null},
 {'outs': null, 'post_state': 15, 'pre_state': 2, 'runs': null},
 {'outs': null, 'post_state': 16, 'pre_state': 2, 'runs': null},
 {'outs': 2.0, 'post_state': 17, 'pre_state': 2, 'runs': 0.0},
 {'outs': null, 'post_state': 18, 'pre_state': 2, 'runs': null},
 {'outs': null, 'post_state': 19, 'pre_state': 2, 'runs': null},
 {'outs': null, 'post_state': 20, 'pre_state': 2, 'runs': null},
 {'outs': null, 'post_state': 21, 'pre_state': 2, 'runs': null},
 {'outs': null, 'post_state': 22, 'pre_state': 2, 'runs': null},
 {'outs': null, 'post_state': 23, 'pre_state': 2, 'runs': null},
 {'outs': null, 'post_state': 24, 'pre_state': 2, 'runs': null},
 {'outs': null, 'post_state': 25, 'pre_state': 2, 'runs': null},
 {'outs': null, 'post_state': 26, 'pre_state': 2, 'runs': null},
 {'outs': null, 'post_state': 27, 'pre_state': 2, 'runs': null},
 {'outs': null, 'post_state': 28, 'pre_state': 2, 'runs': null},
 {'outs': 0.0, 'post_state': 1, 'pre_state': 3, 'runs': 2.0},
 {'outs': 0.0, 'post_state': 2, 'pre_state': 3, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 3, 'pre_state': 3, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 4, 'pre_state': 3, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 5, 'pre_state': 3, 'runs': 0.0},
 {'outs': 0.0, 'post_state': 6, 'pre_state': 3, 'runs': 0.0},
 {'outs': 0.0, 'post_state': 7, 'pre_state': 3, 'runs': 0.0},
 {'outs': null, 'post_state': 8, 'pre_state': 3, 'runs': null},
 {'outs': 1.0, 'post_state': 9, 'pre_state': 3, 'runs': 1.0},
 {'outs': 1.0, 'post_state': 10, 'pre_state': 3, 'runs': 0.0},
 {'outs': 1.0, 'post_state': 11, 'pre_state': 3, 'runs': 0.0},
 {'outs': 1.0, 'post_state': 12, 'pre_state': 3, 'runs': 0.0},
 {'outs': null, 'post_state': 13, 'pre_state': 3, 'runs': null},
 {'outs': null, 'post_state': 14, 'pre_state': 3, 'runs': null},
 {'outs': null, 'post_state': 15, 'pre_state': 3, 'runs': null},
 {'outs': null, 'post_state': 16, 'pre_state': 3, 'runs': null},
 {'outs': 2.0, 'post_state': 17, 'pre_state': 3, 'runs': 0.0},
 {'outs': null, 'post_state': 18, 'pre_state': 3, 'runs': null},
 {'outs': null, 'post_state': 19, 'pre_state': 3, 'runs': null},
 {'outs': null, 'post_state': 20, 'pre_state': 3, 'runs': null},
 {'outs': null, 'post_state': 21, 'pre_state': 3, 'runs': null},
 {'outs': null, 'post_state': 22, 'pre_state': 3, 'runs': null},
 {'outs': null, 'post_state': 23, 'pre_state': 3, 'runs': null},
 {'outs': null, 'post_state': 24, 'pre_state': 3, 'runs': null},
 {'outs': null, 'post_state': 25, 'pre_state': 3, 'runs': null},
 {'outs': null, 'post_state': 26, 'pre_state': 3, 'runs': null},
 {'outs': null, 'post_state': 27, 'pre_state': 3, 'runs': null},
 {'outs': null, 'post_state': 28, 'pre_state': 3, 'runs': null},
 {'outs': 0.0, 'post_state': 1, 'pre_state': 4, 'runs': 2.0},
 {'outs': 0.0, 'post_state': 2, 'pre_state': 4, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 3, 'pre_state': 4, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 4, 'pre_state': 4, 'runs': 1.0},
 {'outs': null, 'post_state': 5, 'pre_state': 4, 'runs': null},
 {'outs': 0.0, 'post_state': 6, 'pre_state': 4, 'runs': 0.0},
 {'outs': 0.0, 'post_state': 7, 'pre_state': 4, 'runs': 0.0},
 {'outs': null, 'post_state': 8, 'pre_state': 4, 'runs': null},
 {'outs': 1.0, 'post_state': 9, 'pre_state': 4, 'runs': 1.0},
 {'outs': 1.0, 'post_state': 10, 'pre_state': 4, 'runs': 0.0},
 {'outs': 1.0, 'post_state': 11, 'pre_state': 4, 'runs': 0.0},
 {'outs': 1.0, 'post_state': 12, 'pre_state': 4, 'runs': 0.0},
 {'outs': null, 'post_state': 13, 'pre_state': 4, 'runs': null},
 {'outs': null, 'post_state': 14, 'pre_state': 4, 'runs': null},
 {'outs': null, 'post_state': 15, 'pre_state': 4, 'runs': null},
 {'outs': null, 'post_state': 16, 'pre_state': 4, 'runs': null},
 {'outs': 2.0, 'post_state': 17, 'pre_state': 4, 'runs': 0.0},
 {'outs': null, 'post_state': 18, 'pre_state': 4, 'runs': null},
 {'outs': null, 'post_state': 19, 'pre_state': 4, 'runs': null},
 {'outs': null, 'post_state': 20, 'pre_state': 4, 'runs': null},
 {'outs': null, 'post_state': 21, 'pre_state': 4, 'runs': null},
 {'outs': null, 'post_state': 22, 'pre_state': 4, 'runs': null},
 {'outs': null, 'post_state': 23, 'pre_state': 4, 'runs': null},
 {'outs': null, 'post_state': 24, 'pre_state': 4, 'runs': null},
 {'outs': null, 'post_state': 25, 'pre_state': 4, 'runs': null},
 {'outs': null, 'post_state': 26, 'pre_state': 4, 'runs': null},
 {'outs': null, 'post_state': 27, 'pre_state': 4, 'runs': null},
 {'outs': null, 'post_state': 28, 'pre_state': 4, 'runs': null},
 {'outs': 0.0, 'post_state': 1, 'pre_state': 5, 'runs': 3.0},
 {'outs': 0.0, 'post_state': 2, 'pre_state': 5, 'runs': 2.0},
 {'outs': 0.0, 'post_state': 3, 'pre_state': 5, 'runs': 2.0},
 {'outs': 0.0, 'post_state': 4, 'pre_state': 5, 'runs': 2.0},
 {'outs': 0.0, 'post_state': 5, 'pre_state': 5, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 6, 'pre_state': 5, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 7, 'pre_state': 5, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 8, 'pre_state': 5, 'runs': 0.0},
 {'outs': 1.0, 'post_state': 9, 'pre_state': 5, 'runs': 2.0},
 {'outs': 1.0, 'post_state': 10, 'pre_state': 5, 'runs': 1.0},
 {'outs': 1.0, 'post_state': 11, 'pre_state': 5, 'runs': 1.0},
 {'outs': 1.0, 'post_state': 12, 'pre_state': 5, 'runs': 1.0},
 {'outs': 1.0, 'post_state': 13, 'pre_state': 5, 'runs': 0.0},
 {'outs': 1.0, 'post_state': 14, 'pre_state': 5, 'runs': 0.0},
 {'outs': 1.0, 'post_state': 15, 'pre_state': 5, 'runs': 0.0},
 {'outs': null, 'post_state': 16, 'pre_state': 5, 'runs': null},
 {'outs': 2.0, 'post_state': 17, 'pre_state': 5, 'runs': 1.0},
 {'outs': 2.0, 'post_state': 18, 'pre_state': 5, 'runs': 0.0},
 {'outs': 2.0, 'post_state': 19, 'pre_state': 5, 'runs': 0.0},
 {'outs': 2.0, 'post_state': 20, 'pre_state': 5, 'runs': 0.0},
 {'outs': null, 'post_state': 21, 'pre_state': 5, 'runs': null},
 {'outs': null, 'post_state': 22, 'pre_state': 5, 'runs': null},
 {'outs': null, 'post_state': 23, 'pre_state': 5, 'runs': null},
 {'outs': null, 'post_state': 24, 'pre_state': 5, 'runs': null},
 {'outs': 3.0, 'post_state': 25, 'pre_state': 5, 'runs': 0.0},
 {'outs': null, 'post_state': 26, 'pre_state': 5, 'runs': null},
 {'outs': null, 'post_state': 27, 'pre_state': 5, 'runs': null},
 {'outs': null, 'post_state': 28, 'pre_state': 5, 'runs': null},
 {'outs': 0.0, 'post_state': 1, 'pre_state': 6, 'runs': 3.0},
 {'outs': 0.0, 'post_state': 2, 'pre_state': 6, 'runs': 2.0},
 {'outs': 0.0, 'post_state': 3, 'pre_state': 6, 'runs': 2.0},
 {'outs': 0.0, 'post_state': 4, 'pre_state': 6, 'runs': 2.0},
 {'outs': 0.0, 'post_state': 5, 'pre_state': 6, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 6, 'pre_state': 6, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 7, 'pre_state': 6, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 8, 'pre_state': 6, 'runs': 0.0},
 {'outs': 1.0, 'post_state': 9, 'pre_state': 6, 'runs': 2.0},
 {'outs': 1.0, 'post_state': 10, 'pre_state': 6, 'runs': 1.0},
 {'outs': 1.0, 'post_state': 11, 'pre_state': 6, 'runs': 1.0},
 {'outs': 1.0, 'post_state': 12, 'pre_state': 6, 'runs': 1.0},
 {'outs': 1.0, 'post_state': 13, 'pre_state': 6, 'runs': 0.0},
 {'outs': 1.0, 'post_state': 14, 'pre_state': 6, 'runs': 0.0},
 {'outs': 1.0, 'post_state': 15, 'pre_state': 6, 'runs': 0.0},
 {'outs': null, 'post_state': 16, 'pre_state': 6, 'runs': null},
 {'outs': 2.0, 'post_state': 17, 'pre_state': 6, 'runs': 1.0},
 {'outs': 2.0, 'post_state': 18, 'pre_state': 6, 'runs': 0.0},
 {'outs': 2.0, 'post_state': 19, 'pre_state': 6, 'runs': 0.0},
 {'outs': 2.0, 'post_state': 20, 'pre_state': 6, 'runs': 0.0},
 {'outs': null, 'post_state': 21, 'pre_state': 6, 'runs': null},
 {'outs': null, 'post_state': 22, 'pre_state': 6, 'runs': null},
 {'outs': null, 'post_state': 23, 'pre_state': 6, 'runs': null},
 {'outs': null, 'post_state': 24, 'pre_state': 6, 'runs': null},
 {'outs': 3.0, 'post_state': 25, 'pre_state': 6, 'runs': 0.0},
 {'outs': null, 'post_state': 26, 'pre_state': 6, 'runs': null},
 {'outs': null, 'post_state': 27, 'pre_state': 6, 'runs': null},
 {'outs': null, 'post_state': 28, 'pre_state': 6, 'runs': null},
 {'outs': 0.0, 'post_state': 1, 'pre_state': 7, 'runs': 3.0},
 {'outs': 0.0, 'post_state': 2, 'pre_state': 7, 'runs': 2.0},
 {'outs': 0.0, 'post_state': 3, 'pre_state': 7, 'runs': 2.0},
 {'outs': 0.0, 'post_state': 4, 'pre_state': 7, 'runs': 2.0},
 {'outs': 0.0, 'post_state': 5, 'pre_state': 7, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 6, 'pre_state': 7, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 7, 'pre_state': 7, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 8, 'pre_state': 7, 'runs': 0.0},
 {'outs': 1.0, 'post_state': 9, 'pre_state': 7, 'runs': 2.0},
 {'outs': 1.0, 'post_state': 10, 'pre_state': 7, 'runs': 1.0},
 {'outs': 1.0, 'post_state': 11, 'pre_state': 7, 'runs': 1.0},
 {'outs': 1.0, 'post_state': 12, 'pre_state': 7, 'runs': 1.0},
 {'outs': 1.0, 'post_state': 13, 'pre_state': 7, 'runs': 0.0},
 {'outs': 1.0, 'post_state': 14, 'pre_state': 7, 'runs': 0.0},
 {'outs': 1.0, 'post_state': 15, 'pre_state': 7, 'runs': 0.0},
 {'outs': null, 'post_state': 16, 'pre_state': 7, 'runs': null},
 {'outs': 2.0, 'post_state': 17, 'pre_state': 7, 'runs': 1.0},
 {'outs': 2.0, 'post_state': 18, 'pre_state': 7, 'runs': 0.0},
 {'outs': 2.0, 'post_state': 19, 'pre_state': 7, 'runs': 0.0},
 {'outs': 2.0, 'post_state': 20, 'pre_state': 7, 'runs': 0.0},
 {'outs': null, 'post_state': 21, 'pre_state': 7, 'runs': null},
 {'outs': null, 'post_state': 22, 'pre_state': 7, 'runs': null},
 {'outs': null, 'post_state': 23, 'pre_state': 7, 'runs': null},
 {'outs': null, 'post_state': 24, 'pre_state': 7, 'runs': null},
 {'outs': 3.0, 'post_state': 25, 'pre_state': 7, 'runs': 0.0},
 {'outs': null, 'post_state': 26, 'pre_state': 7, 'runs': null},
 {'outs': null, 'post_state': 27, 'pre_state': 7, 'runs': null},
 {'outs': null, 'post_state': 28, 'pre_state': 7, 'runs': null},
 {'outs': 0.0, 'post_state': 1, 'pre_state': 8, 'runs': 4.0},
 {'outs': 0.0, 'post_state': 2, 'pre_state': 8, 'runs': 3.0},
 {'outs': 0.0, 'post_state': 3, 'pre_state': 8, 'runs': 3.0},
 {'outs': 0.0, 'post_state': 4, 'pre_state': 8, 'runs': 3.0},
 {'outs': 0.0, 'post_state': 5, 'pre_state': 8, 'runs': 2.0},
 {'outs': 0.0, 'post_state': 6, 'pre_state': 8, 'runs': 2.0},
 {'outs': 0.0, 'post_state': 7, 'pre_state': 8, 'runs': 2.0},
 {'outs': 0.0, 'post_state': 8, 'pre_state': 8, 'runs': 1.0},
 {'outs': 1.0, 'post_state': 9, 'pre_state': 8, 'runs': 3.0},
 {'outs': 1.0, 'post_state': 10, 'pre_state': 8, 'runs': 2.0},
 {'outs': 1.0, 'post_state': 11, 'pre_state': 8, 'runs': 2.0},
 {'outs': 1.0, 'post_state': 12, 'pre_state': 8, 'runs': 2.0},
 {'outs': 1.0, 'post_state': 13, 'pre_state': 8, 'runs': 1.0},
 {'outs': 1.0, 'post_state': 14, 'pre_state': 8, 'runs': 1.0},
 {'outs': 1.0, 'post_state': 15, 'pre_state': 8, 'runs': 1.0},
 {'outs': 1.0, 'post_state': 16, 'pre_state': 8, 'runs': 0.0},
 {'outs': 2.0, 'post_state': 17, 'pre_state': 8, 'runs': 2.0},
 {'outs': 2.0, 'post_state': 18, 'pre_state': 8, 'runs': 1.0},
 {'outs': 2.0, 'post_state': 19, 'pre_state': 8, 'runs': 1.0},
 {'outs': 2.0, 'post_state': 20, 'pre_state': 8, 'runs': 1.0},
 {'outs': 2.0, 'post_state': 21, 'pre_state': 8, 'runs': 0.0},
 {'outs': 2.0, 'post_state': 22, 'pre_state': 8, 'runs': 0.0},
 {'outs': 2.0, 'post_state': 23, 'pre_state': 8, 'runs': 0.0},
 {'outs': null, 'post_state': 24, 'pre_state': 8, 'runs': null},
 {'outs': 3.0, 'post_state': 25, 'pre_state': 8, 'runs': 0.0},
 {'outs': 3.0, 'post_state': 26, 'pre_state': 8, 'runs': 1.0},
 {'outs': null, 'post_state': 27, 'pre_state': 8, 'runs': null},
 {'outs': null, 'post_state': 28, 'pre_state': 8, 'runs': null},
 {'outs': null, 'post_state': 1, 'pre_state': 9, 'runs': null},
 {'outs': null, 'post_state': 2, 'pre_state': 9, 'runs': null},
 {'outs': null, 'post_state': 3, 'pre_state': 9, 'runs': null},
 {'outs': null, 'post_state': 4, 'pre_state': 9, 'runs': null},
 {'outs': null, 'post_state': 5, 'pre_state': 9, 'runs': null},
 {'outs': null, 'post_state': 6, 'pre_state': 9, 'runs': null},
 {'outs': null, 'post_state': 7, 'pre_state': 9, 'runs': null},
 {'outs': null, 'post_state': 8, 'pre_state': 9, 'runs': null},
 {'outs': 0.0, 'post_state': 9, 'pre_state': 9, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 10, 'pre_state': 9, 'runs': 0.0},
 {'outs': 0.0, 'post_state': 11, 'pre_state': 9, 'runs': 0.0},
 {'outs': 0.0, 'post_state': 12, 'pre_state': 9, 'runs': 0.0},
 {'outs': null, 'post_state': 13, 'pre_state': 9, 'runs': null},
 {'outs': null, 'post_state': 14, 'pre_state': 9, 'runs': null},
 {'outs': null, 'post_state': 15, 'pre_state': 9, 'runs': null},
 {'outs': null, 'post_state': 16, 'pre_state': 9, 'runs': null},
 {'outs': 1.0, 'post_state': 17, 'pre_state': 9, 'runs': 0.0},
 {'outs': null, 'post_state': 18, 'pre_state': 9, 'runs': null},
 {'outs': null, 'post_state': 19, 'pre_state': 9, 'runs': null},
 {'outs': null, 'post_state': 20, 'pre_state': 9, 'runs': null},
 {'outs': null, 'post_state': 21, 'pre_state': 9, 'runs': null},
 {'outs': null, 'post_state': 22, 'pre_state': 9, 'runs': null},
 {'outs': null, 'post_state': 23, 'pre_state': 9, 'runs': null},
 {'outs': null, 'post_state': 24, 'pre_state': 9, 'runs': null},
 {'outs': null, 'post_state': 25, 'pre_state': 9, 'runs': null},
 {'outs': null, 'post_state': 26, 'pre_state': 9, 'runs': null},
 {'outs': null, 'post_state': 27, 'pre_state': 9, 'runs': null},
 {'outs': null, 'post_state': 28, 'pre_state': 9, 'runs': null},
 {'outs': null, 'post_state': 1, 'pre_state': 10, 'runs': null},
 {'outs': null, 'post_state': 2, 'pre_state': 10, 'runs': null},
 {'outs': null, 'post_state': 3, 'pre_state': 10, 'runs': null},
 {'outs': null, 'post_state': 4, 'pre_state': 10, 'runs': null},
 {'outs': null, 'post_state': 5, 'pre_state': 10, 'runs': null},
 {'outs': null, 'post_state': 6, 'pre_state': 10, 'runs': null},
 {'outs': null, 'post_state': 7, 'pre_state': 10, 'runs': null},
 {'outs': null, 'post_state': 8, 'pre_state': 10, 'runs': null},
 {'outs': 0.0, 'post_state': 9, 'pre_state': 10, 'runs': 2.0},
 {'outs': 0.0, 'post_state': 10, 'pre_state': 10, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 11, 'pre_state': 10, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 12, 'pre_state': 10, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 13, 'pre_state': 10, 'runs': 0.0},
 {'outs': 0.0, 'post_state': 14, 'pre_state': 10, 'runs': 0.0},
 {'outs': 0.0, 'post_state': 15, 'pre_state': 10, 'runs': 0.0},
 {'outs': null, 'post_state': 16, 'pre_state': 10, 'runs': null},
 {'outs': 1.0, 'post_state': 17, 'pre_state': 10, 'runs': 1.0},
 {'outs': 1.0, 'post_state': 18, 'pre_state': 10, 'runs': 0.0},
 {'outs': 1.0, 'post_state': 19, 'pre_state': 10, 'runs': 0.0},
 {'outs': 1.0, 'post_state': 20, 'pre_state': 10, 'runs': 0.0},
 {'outs': null, 'post_state': 21, 'pre_state': 10, 'runs': null},
 {'outs': null, 'post_state': 22, 'pre_state': 10, 'runs': null},
 {'outs': null, 'post_state': 23, 'pre_state': 10, 'runs': null},
 {'outs': null, 'post_state': 24, 'pre_state': 10, 'runs': null},
 {'outs': 2.0, 'post_state': 25, 'pre_state': 10, 'runs': 0.0},
 {'outs': null, 'post_state': 26, 'pre_state': 10, 'runs': null},
 {'outs': null, 'post_state': 27, 'pre_state': 10, 'runs': null},
 {'outs': null, 'post_state': 28, 'pre_state': 10, 'runs': null},
 {'outs': null, 'post_state': 1, 'pre_state': 11, 'runs': null},
 {'outs': null, 'post_state': 2, 'pre_state': 11, 'runs': null},
 {'outs': null, 'post_state': 3, 'pre_state': 11, 'runs': null},
 {'outs': null, 'post_state': 4, 'pre_state': 11, 'runs': null},
 {'outs': null, 'post_state': 5, 'pre_state': 11, 'runs': null},
 {'outs': null, 'post_state': 6, 'pre_state': 11, 'runs': null},
 {'outs': null, 'post_state': 7, 'pre_state': 11, 'runs': null},
 {'outs': null, 'post_state': 8, 'pre_state': 11, 'runs': null},
 {'outs': 0.0, 'post_state': 9, 'pre_state': 11, 'runs': 2.0},
 {'outs': 0.0, 'post_state': 10, 'pre_state': 11, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 11, 'pre_state': 11, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 12, 'pre_state': 11, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 13, 'pre_state': 11, 'runs': 0.0},
 {'outs': 0.0, 'post_state': 14, 'pre_state': 11, 'runs': 0.0},
 {'outs': 0.0, 'post_state': 15, 'pre_state': 11, 'runs': 0.0},
 {'outs': null, 'post_state': 16, 'pre_state': 11, 'runs': null},
 {'outs': 1.0, 'post_state': 17, 'pre_state': 11, 'runs': 1.0},
 {'outs': 1.0, 'post_state': 18, 'pre_state': 11, 'runs': 0.0},
 {'outs': 1.0, 'post_state': 19, 'pre_state': 11, 'runs': 0.0},
 {'outs': 1.0, 'post_state': 20, 'pre_state': 11, 'runs': 0.0},
 {'outs': null, 'post_state': 21, 'pre_state': 11, 'runs': null},
 {'outs': null, 'post_state': 22, 'pre_state': 11, 'runs': null},
 {'outs': null, 'post_state': 23, 'pre_state': 11, 'runs': null},
 {'outs': null, 'post_state': 24, 'pre_state': 11, 'runs': null},
 {'outs': 2.0, 'post_state': 25, 'pre_state': 11, 'runs': 0.0},
 {'outs': null, 'post_state': 26, 'pre_state': 11, 'runs': null},
 {'outs': null, 'post_state': 27, 'pre_state': 11, 'runs': null},
 {'outs': null, 'post_state': 28, 'pre_state': 11, 'runs': null},
 {'outs': null, 'post_state': 1, 'pre_state': 12, 'runs': null},
 {'outs': null, 'post_state': 2, 'pre_state': 12, 'runs': null},
 {'outs': null, 'post_state': 3, 'pre_state': 12, 'runs': null},
 {'outs': null, 'post_state': 4, 'pre_state': 12, 'runs': null},
 {'outs': null, 'post_state': 5, 'pre_state': 12, 'runs': null},
 {'outs': null, 'post_state': 6, 'pre_state': 12, 'runs': null},
 {'outs': null, 'post_state': 7, 'pre_state': 12, 'runs': null},
 {'outs': null, 'post_state': 8, 'pre_state': 12, 'runs': null},
 {'outs': 0.0, 'post_state': 9, 'pre_state': 12, 'runs': 2.0},
 {'outs': 0.0, 'post_state': 10, 'pre_state': 12, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 11, 'pre_state': 12, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 12, 'pre_state': 12, 'runs': 1.0},
 {'outs': null, 'post_state': 13, 'pre_state': 12, 'runs': null},
 {'outs': 0.0, 'post_state': 14, 'pre_state': 12, 'runs': 0.0},
 {'outs': 0.0, 'post_state': 15, 'pre_state': 12, 'runs': 0.0},
 {'outs': null, 'post_state': 16, 'pre_state': 12, 'runs': null},
 {'outs': 1.0, 'post_state': 17, 'pre_state': 12, 'runs': 1.0},
 {'outs': 1.0, 'post_state': 18, 'pre_state': 12, 'runs': 0.0},
 {'outs': 1.0, 'post_state': 19, 'pre_state': 12, 'runs': 0.0},
 {'outs': 1.0, 'post_state': 20, 'pre_state': 12, 'runs': 0.0},
 {'outs': null, 'post_state': 21, 'pre_state': 12, 'runs': null},
 {'outs': null, 'post_state': 22, 'pre_state': 12, 'runs': null},
 {'outs': null, 'post_state': 23, 'pre_state': 12, 'runs': null},
 {'outs': null, 'post_state': 24, 'pre_state': 12, 'runs': null},
 {'outs': 2.0, 'post_state': 25, 'pre_state': 12, 'runs': 0.0},
 {'outs': null, 'post_state': 26, 'pre_state': 12, 'runs': null},
 {'outs': null, 'post_state': 27, 'pre_state': 12, 'runs': null},
 {'outs': null, 'post_state': 28, 'pre_state': 12, 'runs': null},
 {'outs': null, 'post_state': 1, 'pre_state': 13, 'runs': null},
 {'outs': null, 'post_state': 2, 'pre_state': 13, 'runs': null},
 {'outs': null, 'post_state': 3, 'pre_state': 13, 'runs': null},
 {'outs': null, 'post_state': 4, 'pre_state': 13, 'runs': null},
 {'outs': null, 'post_state': 5, 'pre_state': 13, 'runs': null},
 {'outs': null, 'post_state': 6, 'pre_state': 13, 'runs': null},
 {'outs': null, 'post_state': 7, 'pre_state': 13, 'runs': null},
 {'outs': null, 'post_state': 8, 'pre_state': 13, 'runs': null},
 {'outs': 0.0, 'post_state': 9, 'pre_state': 13, 'runs': 3.0},
 {'outs': 0.0, 'post_state': 10, 'pre_state': 13, 'runs': 2.0},
 {'outs': 0.0, 'post_state': 11, 'pre_state': 13, 'runs': 2.0},
 {'outs': 0.0, 'post_state': 12, 'pre_state': 13, 'runs': 2.0},
 {'outs': 0.0, 'post_state': 13, 'pre_state': 13, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 14, 'pre_state': 13, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 15, 'pre_state': 13, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 16, 'pre_state': 13, 'runs': 0.0},
 {'outs': 1.0, 'post_state': 17, 'pre_state': 13, 'runs': 2.0},
 {'outs': 1.0, 'post_state': 18, 'pre_state': 13, 'runs': 1.0},
 {'outs': 1.0, 'post_state': 19, 'pre_state': 13, 'runs': 1.0},
 {'outs': 1.0, 'post_state': 20, 'pre_state': 13, 'runs': 1.0},
 {'outs': 1.0, 'post_state': 21, 'pre_state': 13, 'runs': 0.0},
 {'outs': 1.0, 'post_state': 22, 'pre_state': 13, 'runs': 0.0},
 {'outs': 1.0, 'post_state': 23, 'pre_state': 13, 'runs': 0.0},
 {'outs': null, 'post_state': 24, 'pre_state': 13, 'runs': null},
 {'outs': 2.0, 'post_state': 25, 'pre_state': 13, 'runs': 0.0},
 {'outs': 2.0, 'post_state': 26, 'pre_state': 13, 'runs': 1.0},
 {'outs': null, 'post_state': 27, 'pre_state': 13, 'runs': null},
 {'outs': null, 'post_state': 28, 'pre_state': 13, 'runs': null},
 {'outs': null, 'post_state': 1, 'pre_state': 14, 'runs': null},
 {'outs': null, 'post_state': 2, 'pre_state': 14, 'runs': null},
 {'outs': null, 'post_state': 3, 'pre_state': 14, 'runs': null},
 {'outs': null, 'post_state': 4, 'pre_state': 14, 'runs': null},
 {'outs': null, 'post_state': 5, 'pre_state': 14, 'runs': null},
 {'outs': null, 'post_state': 6, 'pre_state': 14, 'runs': null},
 {'outs': null, 'post_state': 7, 'pre_state': 14, 'runs': null},
 {'outs': null, 'post_state': 8, 'pre_state': 14, 'runs': null},
 {'outs': 0.0, 'post_state': 9, 'pre_state': 14, 'runs': 3.0},
 {'outs': 0.0, 'post_state': 10, 'pre_state': 14, 'runs': 2.0},
 {'outs': 0.0, 'post_state': 11, 'pre_state': 14, 'runs': 2.0},
 {'outs': 0.0, 'post_state': 12, 'pre_state': 14, 'runs': 2.0},
 {'outs': 0.0, 'post_state': 13, 'pre_state': 14, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 14, 'pre_state': 14, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 15, 'pre_state': 14, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 16, 'pre_state': 14, 'runs': 0.0},
 {'outs': 1.0, 'post_state': 17, 'pre_state': 14, 'runs': 2.0},
 {'outs': 1.0, 'post_state': 18, 'pre_state': 14, 'runs': 1.0},
 {'outs': 1.0, 'post_state': 19, 'pre_state': 14, 'runs': 1.0},
 {'outs': 1.0, 'post_state': 20, 'pre_state': 14, 'runs': 1.0},
 {'outs': 1.0, 'post_state': 21, 'pre_state': 14, 'runs': 0.0},
 {'outs': 1.0, 'post_state': 22, 'pre_state': 14, 'runs': 0.0},
 {'outs': 1.0, 'post_state': 23, 'pre_state': 14, 'runs': 0.0},
 {'outs': null, 'post_state': 24, 'pre_state': 14, 'runs': null},
 {'outs': 2.0, 'post_state': 25, 'pre_state': 14, 'runs': 0.0},
 {'outs': 2.0, 'post_state': 26, 'pre_state': 14, 'runs': 1.0},
 {'outs': null, 'post_state': 27, 'pre_state': 14, 'runs': null},
 {'outs': null, 'post_state': 28, 'pre_state': 14, 'runs': null},
 {'outs': null, 'post_state': 1, 'pre_state': 15, 'runs': null},
 {'outs': null, 'post_state': 2, 'pre_state': 15, 'runs': null},
 {'outs': null, 'post_state': 3, 'pre_state': 15, 'runs': null},
 {'outs': null, 'post_state': 4, 'pre_state': 15, 'runs': null},
 {'outs': null, 'post_state': 5, 'pre_state': 15, 'runs': null},
 {'outs': null, 'post_state': 6, 'pre_state': 15, 'runs': null},
 {'outs': null, 'post_state': 7, 'pre_state': 15, 'runs': null},
 {'outs': null, 'post_state': 8, 'pre_state': 15, 'runs': null},
 {'outs': 0.0, 'post_state': 9, 'pre_state': 15, 'runs': 3.0},
 {'outs': 0.0, 'post_state': 10, 'pre_state': 15, 'runs': 2.0},
 {'outs': 0.0, 'post_state': 11, 'pre_state': 15, 'runs': 2.0},
 {'outs': 0.0, 'post_state': 12, 'pre_state': 15, 'runs': 2.0},
 {'outs': 0.0, 'post_state': 13, 'pre_state': 15, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 14, 'pre_state': 15, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 15, 'pre_state': 15, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 16, 'pre_state': 15, 'runs': 0.0},
 {'outs': 1.0, 'post_state': 17, 'pre_state': 15, 'runs': 2.0},
 {'outs': 1.0, 'post_state': 18, 'pre_state': 15, 'runs': 1.0},
 {'outs': 1.0, 'post_state': 19, 'pre_state': 15, 'runs': 1.0},
 {'outs': 1.0, 'post_state': 20, 'pre_state': 15, 'runs': 1.0},
 {'outs': 1.0, 'post_state': 21, 'pre_state': 15, 'runs': 0.0},
 {'outs': 1.0, 'post_state': 22, 'pre_state': 15, 'runs': 0.0},
 {'outs': 1.0, 'post_state': 23, 'pre_state': 15, 'runs': 0.0},
 {'outs': null, 'post_state': 24, 'pre_state': 15, 'runs': null},
 {'outs': 2.0, 'post_state': 25, 'pre_state': 15, 'runs': 0.0},
 {'outs': 2.0, 'post_state': 26, 'pre_state': 15, 'runs': 1.0},
 {'outs': null, 'post_state': 27, 'pre_state': 15, 'runs': null},
 {'outs': null, 'post_state': 28, 'pre_state': 15, 'runs': null},
 {'outs': null, 'post_state': 1, 'pre_state': 16, 'runs': null},
 {'outs': null, 'post_state': 2, 'pre_state': 16, 'runs': null},
 {'outs': null, 'post_state': 3, 'pre_state': 16, 'runs': null},
 {'outs': null, 'post_state': 4, 'pre_state': 16, 'runs': null},
 {'outs': null, 'post_state': 5, 'pre_state': 16, 'runs': null},
 {'outs': null, 'post_state': 6, 'pre_state': 16, 'runs': null},
 {'outs': null, 'post_state': 7, 'pre_state': 16, 'runs': null},
 {'outs': null, 'post_state': 8, 'pre_state': 16, 'runs': null},
 {'outs': 0.0, 'post_state': 9, 'pre_state': 16, 'runs': 4.0},
 {'outs': 0.0, 'post_state': 10, 'pre_state': 16, 'runs': 3.0},
 {'outs': 0.0, 'post_state': 11, 'pre_state': 16, 'runs': 3.0},
 {'outs': 0.0, 'post_state': 12, 'pre_state': 16, 'runs': 3.0},
 {'outs': 0.0, 'post_state': 13, 'pre_state': 16, 'runs': 2.0},
 {'outs': 0.0, 'post_state': 14, 'pre_state': 16, 'runs': 2.0},
 {'outs': 0.0, 'post_state': 15, 'pre_state': 16, 'runs': 2.0},
 {'outs': 0.0, 'post_state': 16, 'pre_state': 16, 'runs': 1.0},
 {'outs': 1.0, 'post_state': 17, 'pre_state': 16, 'runs': 3.0},
 {'outs': 1.0, 'post_state': 18, 'pre_state': 16, 'runs': 2.0},
 {'outs': 1.0, 'post_state': 19, 'pre_state': 16, 'runs': 2.0},
 {'outs': 1.0, 'post_state': 20, 'pre_state': 16, 'runs': 2.0},
 {'outs': 1.0, 'post_state': 21, 'pre_state': 16, 'runs': 1.0},
 {'outs': 1.0, 'post_state': 22, 'pre_state': 16, 'runs': 1.0},
 {'outs': 1.0, 'post_state': 23, 'pre_state': 16, 'runs': 1.0},
 {'outs': 1.0, 'post_state': 24, 'pre_state': 16, 'runs': 0.0},
 {'outs': 2.0, 'post_state': 25, 'pre_state': 16, 'runs': 0.0},
 {'outs': 2.0, 'post_state': 26, 'pre_state': 16, 'runs': 1.0},
 {'outs': 2.0, 'post_state': 27, 'pre_state': 16, 'runs': 2.0},
 {'outs': null, 'post_state': 28, 'pre_state': 16, 'runs': null},
 {'outs': null, 'post_state': 1, 'pre_state': 17, 'runs': null},
 {'outs': null, 'post_state': 2, 'pre_state': 17, 'runs': null},
 {'outs': null, 'post_state': 3, 'pre_state': 17, 'runs': null},
 {'outs': null, 'post_state': 4, 'pre_state': 17, 'runs': null},
 {'outs': null, 'post_state': 5, 'pre_state': 17, 'runs': null},
 {'outs': null, 'post_state': 6, 'pre_state': 17, 'runs': null},
 {'outs': null, 'post_state': 7, 'pre_state': 17, 'runs': null},
 {'outs': null, 'post_state': 8, 'pre_state': 17, 'runs': null},
 {'outs': null, 'post_state': 9, 'pre_state': 17, 'runs': null},
 {'outs': null, 'post_state': 10, 'pre_state': 17, 'runs': null},
 {'outs': null, 'post_state': 11, 'pre_state': 17, 'runs': null},
 {'outs': null, 'post_state': 12, 'pre_state': 17, 'runs': null},
 {'outs': null, 'post_state': 13, 'pre_state': 17, 'runs': null},
 {'outs': null, 'post_state': 14, 'pre_state': 17, 'runs': null},
 {'outs': null, 'post_state': 15, 'pre_state': 17, 'runs': null},
 {'outs': null, 'post_state': 16, 'pre_state': 17, 'runs': null},
 {'outs': 0.0, 'post_state': 17, 'pre_state': 17, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 18, 'pre_state': 17, 'runs': 0.0},
 {'outs': 0.0, 'post_state': 19, 'pre_state': 17, 'runs': 0.0},
 {'outs': 0.0, 'post_state': 20, 'pre_state': 17, 'runs': 0.0},
 {'outs': null, 'post_state': 21, 'pre_state': 17, 'runs': null},
 {'outs': null, 'post_state': 22, 'pre_state': 17, 'runs': null},
 {'outs': null, 'post_state': 23, 'pre_state': 17, 'runs': null},
 {'outs': null, 'post_state': 24, 'pre_state': 17, 'runs': null},
 {'outs': 1.0, 'post_state': 25, 'pre_state': 17, 'runs': 0.0},
 {'outs': null, 'post_state': 26, 'pre_state': 17, 'runs': null},
 {'outs': null, 'post_state': 27, 'pre_state': 17, 'runs': null},
 {'outs': null, 'post_state': 28, 'pre_state': 17, 'runs': null},
 {'outs': null, 'post_state': 1, 'pre_state': 18, 'runs': null},
 {'outs': null, 'post_state': 2, 'pre_state': 18, 'runs': null},
 {'outs': null, 'post_state': 3, 'pre_state': 18, 'runs': null},
 {'outs': null, 'post_state': 4, 'pre_state': 18, 'runs': null},
 {'outs': null, 'post_state': 5, 'pre_state': 18, 'runs': null},
 {'outs': null, 'post_state': 6, 'pre_state': 18, 'runs': null},
 {'outs': null, 'post_state': 7, 'pre_state': 18, 'runs': null},
 {'outs': null, 'post_state': 8, 'pre_state': 18, 'runs': null},
 {'outs': null, 'post_state': 9, 'pre_state': 18, 'runs': null},
 {'outs': null, 'post_state': 10, 'pre_state': 18, 'runs': null},
 {'outs': null, 'post_state': 11, 'pre_state': 18, 'runs': null},
 {'outs': null, 'post_state': 12, 'pre_state': 18, 'runs': null},
 {'outs': null, 'post_state': 13, 'pre_state': 18, 'runs': null},
 {'outs': null, 'post_state': 14, 'pre_state': 18, 'runs': null},
 {'outs': null, 'post_state': 15, 'pre_state': 18, 'runs': null},
 {'outs': null, 'post_state': 16, 'pre_state': 18, 'runs': null},
 {'outs': 0.0, 'post_state': 17, 'pre_state': 18, 'runs': 2.0},
 {'outs': 0.0, 'post_state': 18, 'pre_state': 18, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 19, 'pre_state': 18, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 20, 'pre_state': 18, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 21, 'pre_state': 18, 'runs': 0.0},
 {'outs': 0.0, 'post_state': 22, 'pre_state': 18, 'runs': 0.0},
 {'outs': 0.0, 'post_state': 23, 'pre_state': 18, 'runs': 0.0},
 {'outs': null, 'post_state': 24, 'pre_state': 18, 'runs': null},
 {'outs': 1.0, 'post_state': 25, 'pre_state': 18, 'runs': 0.0},
 {'outs': 1.0, 'post_state': 26, 'pre_state': 18, 'runs': 1.0},
 {'outs': null, 'post_state': 27, 'pre_state': 18, 'runs': null},
 {'outs': null, 'post_state': 28, 'pre_state': 18, 'runs': null},
 {'outs': null, 'post_state': 1, 'pre_state': 19, 'runs': null},
 {'outs': null, 'post_state': 2, 'pre_state': 19, 'runs': null},
 {'outs': null, 'post_state': 3, 'pre_state': 19, 'runs': null},
 {'outs': null, 'post_state': 4, 'pre_state': 19, 'runs': null},
 {'outs': null, 'post_state': 5, 'pre_state': 19, 'runs': null},
 {'outs': null, 'post_state': 6, 'pre_state': 19, 'runs': null},
 {'outs': null, 'post_state': 7, 'pre_state': 19, 'runs': null},
 {'outs': null, 'post_state': 8, 'pre_state': 19, 'runs': null},
 {'outs': null, 'post_state': 9, 'pre_state': 19, 'runs': null},
 {'outs': null, 'post_state': 10, 'pre_state': 19, 'runs': null},
 {'outs': null, 'post_state': 11, 'pre_state': 19, 'runs': null},
 {'outs': null, 'post_state': 12, 'pre_state': 19, 'runs': null},
 {'outs': null, 'post_state': 13, 'pre_state': 19, 'runs': null},
 {'outs': null, 'post_state': 14, 'pre_state': 19, 'runs': null},
 {'outs': null, 'post_state': 15, 'pre_state': 19, 'runs': null},
 {'outs': null, 'post_state': 16, 'pre_state': 19, 'runs': null},
 {'outs': 0.0, 'post_state': 17, 'pre_state': 19, 'runs': 2.0},
 {'outs': 0.0, 'post_state': 18, 'pre_state': 19, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 19, 'pre_state': 19, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 20, 'pre_state': 19, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 21, 'pre_state': 19, 'runs': 0.0},
 {'outs': 0.0, 'post_state': 22, 'pre_state': 19, 'runs': 0.0},
 {'outs': 0.0, 'post_state': 23, 'pre_state': 19, 'runs': 0.0},
 {'outs': null, 'post_state': 24, 'pre_state': 19, 'runs': null},
 {'outs': 1.0, 'post_state': 25, 'pre_state': 19, 'runs': 0.0},
 {'outs': 1.0, 'post_state': 26, 'pre_state': 19, 'runs': 1.0},
 {'outs': null, 'post_state': 27, 'pre_state': 19, 'runs': null},
 {'outs': null, 'post_state': 28, 'pre_state': 19, 'runs': null},
 {'outs': null, 'post_state': 1, 'pre_state': 20, 'runs': null},
 {'outs': null, 'post_state': 2, 'pre_state': 20, 'runs': null},
 {'outs': null, 'post_state': 3, 'pre_state': 20, 'runs': null},
 {'outs': null, 'post_state': 4, 'pre_state': 20, 'runs': null},
 {'outs': null, 'post_state': 5, 'pre_state': 20, 'runs': null},
 {'outs': null, 'post_state': 6, 'pre_state': 20, 'runs': null},
 {'outs': null, 'post_state': 7, 'pre_state': 20, 'runs': null},
 {'outs': null, 'post_state': 8, 'pre_state': 20, 'runs': null},
 {'outs': null, 'post_state': 9, 'pre_state': 20, 'runs': null},
 {'outs': null, 'post_state': 10, 'pre_state': 20, 'runs': null},
 {'outs': null, 'post_state': 11, 'pre_state': 20, 'runs': null},
 {'outs': null, 'post_state': 12, 'pre_state': 20, 'runs': null},
 {'outs': null, 'post_state': 13, 'pre_state': 20, 'runs': null},
 {'outs': null, 'post_state': 14, 'pre_state': 20, 'runs': null},
 {'outs': null, 'post_state': 15, 'pre_state': 20, 'runs': null},
 {'outs': null, 'post_state': 16, 'pre_state': 20, 'runs': null},
 {'outs': 0.0, 'post_state': 17, 'pre_state': 20, 'runs': 2.0},
 {'outs': 0.0, 'post_state': 18, 'pre_state': 20, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 19, 'pre_state': 20, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 20, 'pre_state': 20, 'runs': 1.0},
 {'outs': null, 'post_state': 21, 'pre_state': 20, 'runs': null},
 {'outs': 0.0, 'post_state': 22, 'pre_state': 20, 'runs': 0.0},
 {'outs': 0.0, 'post_state': 23, 'pre_state': 20, 'runs': 0.0},
 {'outs': null, 'post_state': 24, 'pre_state': 20, 'runs': null},
 {'outs': 1.0, 'post_state': 25, 'pre_state': 20, 'runs': 0.0},
 {'outs': 1.0, 'post_state': 26, 'pre_state': 20, 'runs': 1.0},
 {'outs': null, 'post_state': 27, 'pre_state': 20, 'runs': null},
 {'outs': null, 'post_state': 28, 'pre_state': 20, 'runs': null},
 {'outs': null, 'post_state': 1, 'pre_state': 21, 'runs': null},
 {'outs': null, 'post_state': 2, 'pre_state': 21, 'runs': null},
 {'outs': null, 'post_state': 3, 'pre_state': 21, 'runs': null},
 {'outs': null, 'post_state': 4, 'pre_state': 21, 'runs': null},
 {'outs': null, 'post_state': 5, 'pre_state': 21, 'runs': null},
 {'outs': null, 'post_state': 6, 'pre_state': 21, 'runs': null},
 {'outs': null, 'post_state': 7, 'pre_state': 21, 'runs': null},
 {'outs': null, 'post_state': 8, 'pre_state': 21, 'runs': null},
 {'outs': null, 'post_state': 9, 'pre_state': 21, 'runs': null},
 {'outs': null, 'post_state': 10, 'pre_state': 21, 'runs': null},
 {'outs': null, 'post_state': 11, 'pre_state': 21, 'runs': null},
 {'outs': null, 'post_state': 12, 'pre_state': 21, 'runs': null},
 {'outs': null, 'post_state': 13, 'pre_state': 21, 'runs': null},
 {'outs': null, 'post_state': 14, 'pre_state': 21, 'runs': null},
 {'outs': null, 'post_state': 15, 'pre_state': 21, 'runs': null},
 {'outs': null, 'post_state': 16, 'pre_state': 21, 'runs': null},
 {'outs': 0.0, 'post_state': 17, 'pre_state': 21, 'runs': 3.0},
 {'outs': 0.0, 'post_state': 18, 'pre_state': 21, 'runs': 2.0},
 {'outs': 0.0, 'post_state': 19, 'pre_state': 21, 'runs': 2.0},
 {'outs': 0.0, 'post_state': 20, 'pre_state': 21, 'runs': 2.0},
 {'outs': 0.0, 'post_state': 21, 'pre_state': 21, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 22, 'pre_state': 21, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 23, 'pre_state': 21, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 24, 'pre_state': 21, 'runs': 0.0},
 {'outs': 1.0, 'post_state': 25, 'pre_state': 21, 'runs': 0.0},
 {'outs': 1.0, 'post_state': 26, 'pre_state': 21, 'runs': 1.0},
 {'outs': 1.0, 'post_state': 27, 'pre_state': 21, 'runs': 2.0},
 {'outs': null, 'post_state': 28, 'pre_state': 21, 'runs': null},
 {'outs': null, 'post_state': 1, 'pre_state': 22, 'runs': null},
 {'outs': null, 'post_state': 2, 'pre_state': 22, 'runs': null},
 {'outs': null, 'post_state': 3, 'pre_state': 22, 'runs': null},
 {'outs': null, 'post_state': 4, 'pre_state': 22, 'runs': null},
 {'outs': null, 'post_state': 5, 'pre_state': 22, 'runs': null},
 {'outs': null, 'post_state': 6, 'pre_state': 22, 'runs': null},
 {'outs': null, 'post_state': 7, 'pre_state': 22, 'runs': null},
 {'outs': null, 'post_state': 8, 'pre_state': 22, 'runs': null},
 {'outs': null, 'post_state': 9, 'pre_state': 22, 'runs': null},
 {'outs': null, 'post_state': 10, 'pre_state': 22, 'runs': null},
 {'outs': null, 'post_state': 11, 'pre_state': 22, 'runs': null},
 {'outs': null, 'post_state': 12, 'pre_state': 22, 'runs': null},
 {'outs': null, 'post_state': 13, 'pre_state': 22, 'runs': null},
 {'outs': null, 'post_state': 14, 'pre_state': 22, 'runs': null},
 {'outs': null, 'post_state': 15, 'pre_state': 22, 'runs': null},
 {'outs': null, 'post_state': 16, 'pre_state': 22, 'runs': null},
 {'outs': 0.0, 'post_state': 17, 'pre_state': 22, 'runs': 3.0},
 {'outs': 0.0, 'post_state': 18, 'pre_state': 22, 'runs': 2.0},
 {'outs': 0.0, 'post_state': 19, 'pre_state': 22, 'runs': 2.0},
 {'outs': 0.0, 'post_state': 20, 'pre_state': 22, 'runs': 2.0},
 {'outs': 0.0, 'post_state': 21, 'pre_state': 22, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 22, 'pre_state': 22, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 23, 'pre_state': 22, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 24, 'pre_state': 22, 'runs': 0.0},
 {'outs': 1.0, 'post_state': 25, 'pre_state': 22, 'runs': 0.0},
 {'outs': 1.0, 'post_state': 26, 'pre_state': 22, 'runs': 1.0},
 {'outs': 1.0, 'post_state': 27, 'pre_state': 22, 'runs': 2.0},
 {'outs': null, 'post_state': 28, 'pre_state': 22, 'runs': null},
 {'outs': null, 'post_state': 1, 'pre_state': 23, 'runs': null},
 {'outs': null, 'post_state': 2, 'pre_state': 23, 'runs': null},
 {'outs': null, 'post_state': 3, 'pre_state': 23, 'runs': null},
 {'outs': null, 'post_state': 4, 'pre_state': 23, 'runs': null},
 {'outs': null, 'post_state': 5, 'pre_state': 23, 'runs': null},
 {'outs': null, 'post_state': 6, 'pre_state': 23, 'runs': null},
 {'outs': null, 'post_state': 7, 'pre_state': 23, 'runs': null},
 {'outs': null, 'post_state': 8, 'pre_state': 23, 'runs': null},
 {'outs': null, 'post_state': 9, 'pre_state': 23, 'runs': null},
 {'outs': null, 'post_state': 10, 'pre_state': 23, 'runs': null},
 {'outs': null, 'post_state': 11, 'pre_state': 23, 'runs': null},
 {'outs': null, 'post_state': 12, 'pre_state': 23, 'runs': null},
 {'outs': null, 'post_state': 13, 'pre_state': 23, 'runs': null},
 {'outs': null, 'post_state': 14, 'pre_state': 23, 'runs': null},
 {'outs': null, 'post_state': 15, 'pre_state': 23, 'runs': null},
 {'outs': null, 'post_state': 16, 'pre_state': 23, 'runs': null},
 {'outs': 0.0, 'post_state': 17, 'pre_state': 23, 'runs': 3.0},
 {'outs': 0.0, 'post_state': 18, 'pre_state': 23, 'runs': 2.0},
 {'outs': 0.0, 'post_state': 19, 'pre_state': 23, 'runs': 2.0},
 {'outs': 0.0, 'post_state': 20, 'pre_state': 23, 'runs': 2.0},
 {'outs': 0.0, 'post_state': 21, 'pre_state': 23, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 22, 'pre_state': 23, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 23, 'pre_state': 23, 'runs': 1.0},
 {'outs': 0.0, 'post_state': 24, 'pre_state': 23, 'runs': 0.0},
 {'outs': 1.0, 'post_state': 25, 'pre_state': 23, 'runs': 0.0},
 {'outs': 1.0, 'post_state': 26, 'pre_state': 23, 'runs': 1.0},
 {'outs': 1.0, 'post_state': 27, 'pre_state': 23, 'runs': 2.0},
 {'outs': null, 'post_state': 28, 'pre_state': 23, 'runs': null},
 {'outs': null, 'post_state': 1, 'pre_state': 24, 'runs': null},
 {'outs': null, 'post_state': 2, 'pre_state': 24, 'runs': null},
 {'outs': null, 'post_state': 3, 'pre_state': 24, 'runs': null},
 {'outs': null, 'post_state': 4, 'pre_state': 24, 'runs': null},
 {'outs': null, 'post_state': 5, 'pre_state': 24, 'runs': null},
 {'outs': null, 'post_state': 6, 'pre_state': 24, 'runs': null},
 {'outs': null, 'post_state': 7, 'pre_state': 24, 'runs': null},
 {'outs': null, 'post_state': 8, 'pre_state': 24, 'runs': null},
 {'outs': null, 'post_state': 9, 'pre_state': 24, 'runs': null},
 {'outs': null, 'post_state': 10, 'pre_state': 24, 'runs': null},
 {'outs': null, 'post_state': 11, 'pre_state': 24, 'runs': null},
 {'outs': null, 'post_state': 12, 'pre_state': 24, 'runs': null},
 {'outs': null, 'post_state': 13, 'pre_state': 24, 'runs': null},
 {'outs': null, 'post_state': 14, 'pre_state': 24, 'runs': null},
 {'outs': null, 'post_state': 15, 'pre_state': 24, 'runs': null},
 {'outs': null, 'post_state': 16, 'pre_state': 24, 'runs': null},
 {'outs': 0.0, 'post_state': 17, 'pre_state': 24, 'runs': 4.0},
 {'outs': 0.0, 'post_state': 18, 'pre_state': 24, 'runs': 3.0},
 {'outs': 0.0, 'post_state': 19, 'pre_state': 24, 'runs': 3.0},
 {'outs': 0.0, 'post_state': 20, 'pre_state': 24, 'runs': 3.0},
 {'outs': 0.0, 'post_state': 21, 'pre_state': 24, 'runs': 2.0},
 {'outs': 0.0, 'post_state': 22, 'pre_state': 24, 'runs': 2.0},
 {'outs': 0.0, 'post_state': 23, 'pre_state': 24, 'runs': 2.0},
 {'outs': 0.0, 'post_state': 24, 'pre_state': 24, 'runs': 1.0},
 {'outs': 1.0, 'post_state': 25, 'pre_state': 24, 'runs': 0.0},
 {'outs': 1.0, 'post_state': 26, 'pre_state': 24, 'runs': 1.0},
 {'outs': 1.0, 'post_state': 27, 'pre_state': 24, 'runs': 2.0},
 {'outs': 1.0, 'post_state': 28, 'pre_state': 24, 'runs': 3.0}]
;

var dimensions = {'columns':28, 'rows': 24};
var hgrid3 = Math.floor(width3 / dimensions.columns)
var vgrid3 = Math.floor(height3 / dimensions.rows)

var colores3 = d3.scaleLinear().domain([0,4])
      .interpolate(d3.interpolateHcl)
      .range([d3.rgb(241,91,36,1), d3.rgb('#363e4f')]);

var colores4 = ['#52c2b8', '#42bae1', '#f15b24','#000']

g3.selectAll('rect')
  .data(Tmatrix)
  .enter().append('rect')
  //.transition()
  //.attr("delay", function(d,i){return 10*i;})
  //.attr("duration", function(d,i){return 10*(i+1)})
  .attr('x', function(d, i){return (d.post_state-1) * hgrid3;})
  .attr('y', function(d, i){return (d.pre_state-1) *vgrid3;})
  .attr('width', hgrid3-padding)
  .attr('height', vgrid3-padding)
  .attr('fill', function(d, i){
    if (d.runs == null){
      return '#eae3dc'
    }
    return colores4[d.outs]//colores3(d.runs)
  })
  //.attr('rx', padding)
  //.attr('ry', padding)
  .attr('class', 'bordered');

  g3.selectAll('.inner').data(Tmatrix).enter().append('text')
    .text(function (d, i){return d.outs;}) //d.runs
    .attr('x',  function(d){return (d.post_state-1) * hgrid3;} )
    .attr('y', function(d){return (d.pre_state-1) *vgrid3+padding;})
    .attr("transform", "translate(" + (hgrid3 - padding) / 2 + ","+(vgrid3)/1.8+")")
    .style("text-anchor", "middle")
    .style('fill', 'white')
    .attr('font-family', 'Helvetica')
    .attr('font-size', 10)

var ylabel = new Array(24);//create an empty array with length 45
var xlabel = new Array(28);

  g3.selectAll('.ylabel')
    .data(ylabel).enter().append('text')
    .text(function (d, i){return i+1;})
    .attr('x', 0)
    .attr('y', function(d, i){return (i)*vgrid3;} )
    .attr("transform", "translate(-5," + vgrid3 / 2 + ")")
    .style("text-anchor", "end")
    .attr('font-family', 'Helvetica')
        .attr('font-size', 11)

  g3.selectAll('.xlabel')
    .data(xlabel).enter().append('text')
    .text(function (d, i){return i+1;})
    .attr('x', function(d, i){return (i)*hgrid3-padding/2;} )
    .attr('y', 0)
    .attr("transform", "translate(" + hgrid3 / 2 + ",-4)")
    .style("text-anchor", "middle")
  .attr('font-family', 'Helvetica')
      .attr('font-size', 11)

svg3.append('text')
  .text('From')
  .attr('x',  34)
  .attr('y', 25)
  .style("text-anchor", "end")
  .style('fill', '#000')
  .attr('font-family', 'Helvetica')
  .attr('font-size', 10)

svg3.append('text')
  .text('To')
  .attr('x', 34)
  .attr('y', 15)
  .style("text-anchor", "start")
  .style('fill', '#000')
  .attr('font-family', 'Helvetica')
  .attr('font-size', 10)

//console.log(null+1)

//Josh Donaldson
//[[ 0.04  0.22  0.28  0.5   0.04  0.81  1.39  0.95]
 //[ 0.05  0.11  0.21  0.54  0.49  0.42  0.45  1.29]
 //[ 0.05  0.11  0.22  0.1   0.33  0.37  0.53  0.74]]

//Nelson Cruz
 [[ 0.06  0.13  0.22  0.5   0.36  0.64  0.68  0.62]
  [ 0.06  0.15  0.2   0.39  0.27  0.68  0.82  1.02]
  [ 0.06  0.1   0.22  0.16  0.34  0.31  0.48  1.01]]

*/

var states5 = [
  {'x': 1, 'y': 0, 'color': '#52c2b8', 'runprob': 0.06},
  {'x': 2, 'y': 0, 'color': '#52c2b8', 'runprob': 0.13},
  {'x': 3, 'y': 0, 'color': '#52c2b8', 'runprob': 0.22},
  {'x': 4, 'y': 0, 'color': '#52c2b8', 'runprob': 0.5 },
  {'x': 5, 'y': 0, 'color': '#52c2b8', 'runprob': 0.36},
  {'x': 6, 'y': 0, 'color': '#52c2b8', 'runprob': 0.64},
  {'x': 7, 'y': 0, 'color': '#52c2b8', 'runprob': 0.68},
  {'x': 8, 'y': 0, 'color': '#52c2b8', 'runprob': 0.62},
  {'x': 1, 'y': 1, 'color': '#42bae1', 'runprob': 0.06},
  {'x': 2, 'y': 1, 'color': '#42bae1', 'runprob': 0.15},
  {'x': 3, 'y': 1, 'color': '#42bae1', 'runprob': 0.2 },
  {'x': 4, 'y': 1, 'color': '#42bae1', 'runprob': 0.39},
  {'x': 5, 'y': 1, 'color': '#42bae1', 'runprob': 0.27},
  {'x': 6, 'y': 1, 'color': '#42bae1', 'runprob': 0.68},
  {'x': 7, 'y': 1, 'color': '#42bae1', 'runprob': 0.82},
  {'x': 8, 'y': 1, 'color': '#42bae1', 'runprob': 1.02},
  {'x': 1, 'y': 2, 'color': '#f15b24', 'runprob': 0.06},
  {'x': 2, 'y': 2, 'color': '#f15b24', 'runprob': 0.1 },
  {'x': 3, 'y': 2, 'color': '#f15b24', 'runprob': 0.22},
  {'x': 4, 'y': 2, 'color': '#f15b24', 'runprob': 0.16},
  {'x': 5, 'y': 2, 'color': '#f15b24', 'runprob': 0.34},
  {'x': 6, 'y': 2, 'color': '#f15b24', 'runprob': 0.31},
  {'x': 7, 'y': 2, 'color': '#f15b24', 'runprob': 0.48},
  {'x': 8, 'y': 2, 'color': '#f15b24', 'runprob': 1.01},
]



var svg4 = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + 5)

var g4 = svg4.append("g")
            .attr("transform","translate(" + margin.left + "," + 20 + ")");

g4.selectAll('rect')
  .data(states5)
  .enter().append('rect')
  //.transition()
  //.attr("delay", function(d,i){return 10*i;})
  //.attr("duration", function(d,i){return 10*(i+1)})
  .attr('x', function(d){return (d.x-1)*hgrid;})
  .attr('y', function(d){return (d.y)*vgrid;})
  .attr('width', hgrid-padding)
  .attr('height', vgrid-padding)
  .attr('fill', function(d, i){return colores4(d.runprob)})
  .attr('rx', padding)
  .attr('ry', padding)
  .attr('class', 'bordered');


for(var i=0;i<colorgrid.length;i++){
  colorgrid[i] = i*(1.5/space);
};

  g4.selectAll('.inner').data(states5).enter().append('text')
    .text(function (d, i){return Math.round(d.runprob * 100) / 100;})
    .attr('x',  function(d){return (d.x-1)*hgrid;} )
    .attr('y', function(d){return (d.y)*vgrid;})
    .attr("transform", "translate(" + (hgrid - padding) / 2 + ","+(vgrid+padding) / 2+")")
    .style("text-anchor", "middle")
    .style('fill', 'white')
    .attr('font-family', 'Helvetica')
    .attr('font-size', 14)


  g4.selectAll('.ylabel')
    .data(ylabels).enter().append('text')
    .text(function (d){return d;})
    .attr('x', 0)
    .attr('y', function(d, i){return (i)*vgrid;} )
    .attr("transform", "translate(-5," + vgrid / 2 + ")")
    .style("text-anchor", "end")
    .attr('font-family', 'Helvetica')
        .attr('font-size', 12)

  g4.selectAll('.xlabel').data(xlabels).enter().append('text')
    .text(function (d){return d;})
    .attr('x', function(d, i){return (i)*hgrid-padding/2;} )
    .attr('y', 0)
    .attr("transform", "translate(" + hgrid / 2 + ",-4)")
    .style("text-anchor", "middle")
  .attr('font-family', 'Helvetica')
      .attr('font-size', 12)


  svg4.selectAll('.scale')
    .data(colorgrid)
    .enter().append('rect')
    .attr('x', function(d, i){return (width/space)*i + (width/space)-padding + margin.left ;})
    .attr('y', height+20)
    .attr('width', 20)
    .attr('height', 10)
    .attr('fill', function(d, i){return colores4(d)})
    .attr('rx', 4)
    .attr('ry', 4)
    .attr('class', 'bordered');


  g4.append('text')
    .text('Bases:')
    .attr('x', 0 )
    .attr('y', -4)
    .style("text-anchor", "end")
    .attr('font-family', 'Helvetica')
    .attr('font-size', 12)

  svg4.append('text')
    .text('0')
    .attr('x', 20-10 +margin.left)
    .attr('y', height+20+8)
    .style("text-anchor", "end")
    .style('fill', 'f15b24')
    .attr('font-family', 'Helvetica')
    .attr('font-size', 10)

  svg4.append('text')
    .text('1.5')
    .attr('x', width-20+margin.left)
    .attr('y', height+20+8)
    .style("text-anchor", "start")
    .style('fill', 'bl#363e4fe')
    .attr('font-family', 'Helvetica')
    .attr('font-size', 10)
