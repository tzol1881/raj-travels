import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private data = [
    {"Framework": "Vue", "Stars": "166443", "Released": "2014"},
    {"Framework": "React", "Stars": "150793", "Released": "2013"},
    {"Framework": "Angular", "Stars": "62342", "Released": "2016"},
    {"Framework": "Java", "Stars": "27647", "Released": "2010"},
    {"Framework": "Ember", "Stars": "21471", "Released": "2011"},
  ];
  private bar_svg: any;
  private bar1_svg: any;
  private pai_svg: any;
  private scatter_svg: any;
  private svg_donut: any;
  private margin = 40;
  private width = 500 - (this.margin * 2);
  private height = 250 - (this.margin * 2);
  private margin_pie = 15;
  private width_pie = 500 - (this.margin_pie * 2);
  private height_pie = 250 - (this.margin_pie * 2);
  private radius = Math.min(this.width_pie, this.height_pie) / 2 - this.margin_pie;
  private colors: any;
  dashboardData: any;
  dashboardDataKeys: any;
  displayedColumns: string[] = ['Reg number', 'Start date', 'End date'];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    // this.createBarSvg();
    // this.drawBars(this.data);
    // this.createBarSvg1();
    // this.drawBars1(this.data);
    // this.createPaiSvg();
    // this.createColors();
    // this.drawPai();
    // this.createScatterSvg();
    // this.drawPlot();
    // this.drawDonut();
    this.dashboardService.getDashboard().then(res => res.json())
    .then(json => {
      this.dashboardData = json.data
      this.dashboardDataKeys = Object.keys(this.dashboardData)
    })
  }

  private createBarSvg(): void {
    this.bar_svg = d3.select("div#bar")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
}

private drawBars(data: any[]): void {
  // Create the X-axis band scale
  const x = d3.scaleBand()
  .range([0, this.width])
  .domain(data.map(d => d.Framework))
  .padding(0.2);

  // Draw the X-axis on the DOM
  this.bar_svg.append("g")
  .attr("transform", "translate(0," + this.height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
  .attr("transform", "translate(-10,0)rotate(-45)")
  .style("text-anchor", "end");

  // Create the Y-axis band scale
  const y = d3.scaleLinear()
  .domain([0, 200000])
  .range([this.height, 0]);

  // Draw the Y-axis on the DOM
  this.bar_svg.append("g")
  .call(d3.axisLeft(y));

  // Create and fill the bars
  this.bar_svg.selectAll("bars")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", (d: any) => x(d.Framework))
  .attr("y", (d: any) => y(d.Stars))
  .attr("width", x.bandwidth())
  .attr("height", (d: any) => this.height - y(d.Stars))
  .attr("fill", "#3f51b5");
}

private createBarSvg1(): void {
  this.bar1_svg = d3.select("div#bar1")
  .append("svg")
  .attr("width", this.width + (this.margin * 2))
  .attr("height", this.height + (this.margin * 2))
  .append("g")
  .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
}

private drawBars1(data: any[]): void {
// Create the X-axis band scale
const x = d3.scaleBand()
.range([0, this.width])
.domain(data.map(d => d.Framework))
.padding(0.2);

// Draw the X-axis on the DOM
this.bar1_svg.append("g")
.attr("transform", "translate(0," + this.height + ")")
.call(d3.axisBottom(x))
.selectAll("text")
.attr("transform", "translate(-10,0)rotate(-45)")
.style("text-anchor", "end");

// Create the Y-axis band scale
const y = d3.scaleLinear()
.domain([0, 200000])
.range([this.height, 0]);

// Draw the Y-axis on the DOM
this.bar1_svg.append("g")
.call(d3.axisLeft(y));

// Create and fill the bars
this.bar1_svg.selectAll("bars")
.data(data)
.enter()
.append("rect")
.attr("x", (d: any) => x(d.Framework))
.attr("y", (d: any) => y(d.Stars))
.attr("width", x.bandwidth())
.attr("height", (d: any) => this.height - y(d.Stars))
.attr("fill", "#3f51b5");
}

private createPaiSvg(): void {
  this.pai_svg = d3.select("div#pie")
  .append("svg")
  .attr("width", this.width_pie)
  .attr("height", this.height_pie)
  .append("g")
  .attr(
    "transform",
    "translate(" + this.width_pie / 2 + "," + this.height_pie / 2 + ")"
  );
}

private createColors(): void {
  this.colors = d3.scaleOrdinal()
  .domain(this.data.map(d => d.Stars.toString()))
  .range(["#c7d3ec", "#a5b8db", "#879cc4", "#677795", "#5a6782"]);
}

private drawPai(): void {
  // Compute the position of each group on the pie:
  const pie = d3.pie<any>().value((d: any) => Number(d.Stars));

  // Build the pie chart
  this.pai_svg
  .selectAll('pieces')
  .data(pie(this.data))
  .enter()
  .append('path')
  .attr('d', d3.arc()
    .innerRadius(0)
    .outerRadius(this.radius)
  )
  .attr('fill', (d: any, i: any) => (this.colors(i)))
  .attr("stroke", "#121926")
  .style("stroke-width", "1px");

  // Add labels
  const labelLocation = d3.arc()
  .innerRadius(100)
  .outerRadius(this.radius);

  this.pai_svg
  .selectAll('pieces')
  .data(pie(this.data))
  .enter()
  .append('text')
  .text((d: any)=> d.data.Framework)
  .attr("transform", (d: any) => "translate(" + labelLocation.centroid(d) + ")")
  .style("text-anchor", "middle")
  .style("font-size", 15);
}

private createScatterSvg(): void {
  this.scatter_svg = d3.select("div#scatter")
  .append("svg")
  .attr("width", this.width + (this.margin * 2))
  .attr("height", this.height + (this.margin * 2))
  .append("g")
  .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
}

private drawPlot(): void {
  // Add X axis
  const x = d3.scaleLinear()
  .domain([2009, 2017])
  .range([ 0, this.width ]);
  this.scatter_svg.append("g")
  .attr("transform", "translate(0," + this.height + ")")
  .call(d3.axisBottom(x).tickFormat(d3.format("d")));

  // Add Y axis
  const y = d3.scaleLinear()
  .domain([0, 200000])
  .range([ this.height, 0]);
  this.scatter_svg.append("g")
  .call(d3.axisLeft(y));

  // Add dots
  const dots = this.scatter_svg.append('g');
  dots.selectAll("dot")
  .data(this.data)
  .enter()
  .append("circle")
  .attr("cx", (d: any) => x(d.Released))
  .attr("cy",  (d: any) => y(d.Stars))
  .attr("r", 7)
  .style("opacity", .5)
  .style("fill", "#69b3a2");

  // Add labels
  dots.selectAll("text")
  .data(this.data)
  .enter()
  .append("text")
  .text( (d: any) => d.Framework)
  .attr("x", (d: any) => x(d.Released))
  .attr("y", (d: any)  => y(d.Stars))
}

drawDonut(){

  let width = 450
  let height = 450
  let margin = 40
  let radius;
  let svg;
  let color: any;
  let pie;
  let data_ready;

  // Create dummy data
  let data = { a: 9, b: 20, c: 30, d: 8, e: 12 }

  radius = Math.min(this.width, this.height) / 2 - this.margin

  this.svg_donut = d3.select("div#donut")
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .append("g")
    .attr("transform", "translate(" + this.width / 2 + "," +
      this.height / 2 + ")");

  // set the color scale
  color = d3.scaleOrdinal()
    .domain(Object.keys(data))
    .range(d3.schemeDark2);

  // Compute the position of each group on the pie:
  pie = d3.pie()
    .value(function (d: any) { return d.value })
  
  data_ready = pie([9,20,30,8,12])

  this.svg_donut
    .selectAll('whatever')
    .data(data_ready)
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(100)         // This is the size of the donut hole
      .outerRadius(this.radius))
    .attr('fill',(d: any) => { return (color(d.data.key)) })
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 0.7)
}
}
