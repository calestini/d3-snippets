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
  height = 250 - margin.top - margin.bottom;

  //Creating svg space

var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform","translate(" + margin.left + "," + margin.top + ")");

var xScale = d3.scaleLinear().range([0, 500]);
var yScale = d3.scaleLinear().range([500, 0]); //inverting scale for y-axis to a normal axis

xScale.domain([0, 100]);
yScale.domain([0, 100]);

var hgrid = Math.floor(width / 8)
var vgrid = Math.floor(height / 3)

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

var ylabels = ['0 out','1 out','2 out'];
var xlabels = ['None','1st','2nd','3rd','1+2', '1+3','2+3','1+2+3'];

var padding = 4;

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


/*****************************************************/

var colores = d3.scaleLinear().domain([0,1])
      .interpolate(d3.interpolateHcl)
      .range([d3.rgb(241,91,36,1), d3.rgb('#363e4f')]);

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

var space = 20;
var colorgrid = new Array(space-2);//create an empty array with length 45

for(var i=0;i<colorgrid.length;i++){
  colorgrid[i] = i*(1/space);
};

var svg3 = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform","translate(" + margin.left + "," + 0 + ")");




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
