// This component show the graph, and handle the style changes
// I used D3 force layout V4

import React, {Component} from 'react'
import * as d3 from "d3";
import './ForceLayout.css';

class ForceLayout extends Component{

  componentDidUpdate() {
    // When the component get new props from the parent, it updates the nodes with the new colors, new sizes, new fonts and bigger (or smaller) links

    let newNodes = this.props.nodes;

    newNodes.map((item,index) => {
      return item.group = item.base === 'A' ? this.props.colorA : item.base === 'C' ? this.props.colorC : item.base === 'T' ? this.props.colorT : item.base === 'G' ? this.props.colorG : 0
    });

    d3.selectAll("circle")
      .data(newNodes)
      .attr("fill", d => d.group)
      .attr("r",this.props.booble);

    d3.selectAll("text")
      .attr("font-family", d => this.props.fonts)
      .attr("font-size",this.props.booble);

    d3.selectAll("line")
      .attr("stroke-width", this.props.line);
  }
  componentDidMount(){
    // As soon as the component is mounted, I feed the simulation with the nodes and links to create the graph

    const width = this.props.width,
          height = this.props.height,
          graph = {
            nodes:this.props.nodes,
            links:this.props.links
          },
          offsetBooble = this.props.booble * 1.8,
          offsetText  = this.props.booble/3,
          viewbox = "0 0 "+width+" "+height,
          svg = d3.select("#targetSVG")
                  .append("svg")
                  .attr("width",width)
                  .attr("height",height)
                  .attr("viewBox",viewbox)
                  .attr("style","border:1px solid #000"),
          svgBounds = {
            x:{
              start:this.props.booble,
              end:(width - this.props.booble)
            },
            y:{
              start:this.props.booble,
              end:(height - this.props.booble)
            }
          }; // since D3V4 doesn't have the size option, I had to bound the nodes to parent svg, this var is used within the function below (boundariesBox)



          // configuration for the graph. I still have some issues reguarding the positioning of each base, but now is less messy than the beginning

    const simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(d => d.id).strength(1).distance(offsetBooble))
        .force("charge", d3.forceManyBody().distanceMax(offsetBooble).theta(0))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collide", d3.forceCollide().radius(offsetBooble));


    const link = svg.append("g")
                    .attr("class", "links")
                    .selectAll("line")
                    .data(graph.links)
                    .enter().append("line")
                      .attr("stroke", "#000")
                      .attr("stroke-width", this.props.line);

    const node = svg.append("g")
                    .attr("class", "nodes")
                    .selectAll("circle")
                    .data(graph.nodes)
                    .enter()
                      .append("circle")
                      .attr("r", this.props.booble)
                      .attr("class",d => "idBase"+d.id)
                      .attr("fill", d => d.group)
                      .attr("data-color", d => d.group)
                      .on("mouseover", mapMouseOver) // function to handle the manipulation
                      .on("mouseout", mapMouseOut) // function to handle the manipulation
                      .call(d3.drag()
                          .on("start", dragStarted)
                          .on("drag", dragged)
                          .on("end", dragEnded));

    const text = svg.append("g")
                    .attr("class", "text")
                    .selectAll("text")
                      .data(graph.nodes)
                      .enter()
                      .append("text")
                      .on("mouseover", mapMouseOver) // function to handle the manipulation
                      .on("mouseout", mapMouseOut) // function to handle the manipulation
                      .text(d => d.base || '')
                      .attr("fill", "#000");


    node.append("title").text(d => d.id);

    simulation.nodes(graph.nodes)
              .on("tick", ticked)
              .force("link")
              .links(graph.links);

// this function check if the current coordinate is outside the viewbox, and if so, set to the nearest bound
    function boundariesBox(bounds,coor){
      let newCoor;
      (coor >= bounds.start && coor <= bounds.end) ? newCoor = coor : (coor < bounds.start) ? newCoor = bounds.start : newCoor = bounds.end;

      return newCoor;
    }

    // highlight the correspondig base on the dna and dbn sequence
    function mapMouseOver(d){
      let base = document.getElementsByClassName("idBase"+d.id);

      base[0].classList.add('baseActive');
      base[1].classList.add('baseActive');
      base[0].style.backgroundColor = d.group;
      base[1].style.backgroundColor = d.group;
    }
    // remove the highlight the correspondig base on the dna and dbn sequence
    function mapMouseOut(d){
      let base = document.getElementsByClassName("idBase"+d.id);

      base[0].classList.remove('baseActive');
      base[1].classList.remove('baseActive');
      base[0].style.backgroundColor = "inherit";
      base[1].style.backgroundColor = "inherit";
    }

    function ticked() {

        link
            .attr('x1', d => boundariesBox(svgBounds.x,d.source.x) || 0)
            .attr('y1', d => boundariesBox(svgBounds.y,d.source.y) || 0)
            .attr('x2', d => boundariesBox(svgBounds.x,d.target.x) || 0)
            .attr('y2', d => boundariesBox(svgBounds.y,d.target.y) || 0);

        node
            .attr("cx", d => boundariesBox(svgBounds.x,d.x) || 0)
            .attr("cy", d => boundariesBox(svgBounds.y,d.y )|| 0);
        text
            .attr("x", d => boundariesBox(svgBounds.x,(d.x-offsetText)) || 0)
            .attr("y", d => boundariesBox(svgBounds.y,(d.y+offsetText)) || 0)
    }

    function dragStarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();

      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragEnded(d) {
      if (!d3.event.active) simulation.alphaTarget(0);

      d.fx = null;
      d.fy = null;
    }
  }

  render(){
    return(
      <div>
        <h4>DNA</h4>
        <p>
          <code>
            {
              this.props.dna.map(function(base,index) {
                return <span className={"idBase"+index} key={index} onMouseEnter={mouseEnterHandle} onMouseLeave={mouseLeaveHandle}>{base}</span>;
              })
            }
          </code>
        </p>
        <h4>DBN</h4>
        <p>
          <code>
            {
              this.props.dbn.map(function(base,index) {
                return <span className={"idBase"+index} key={index} onMouseEnter={mouseEnterHandle} onMouseLeave={mouseLeaveHandle}>{base}</span>;
              })
            }
          </code>
        </p>
        <div id="targetSVG"></div>
      </div>
    )
  }
}


// highlight the correspondig base on the graph
function mouseEnterHandle(event){
  const target = event.target;
  const className = target.className;
  const targetBase = document.querySelectorAll('circle.'+className)[0];

  targetBase.setAttribute("fill","red");
}
// remove the highlight the correspondig base on the graph
function mouseLeaveHandle(event){
  const target = event.target;
  const className = target.className;
  const targetBase = document.querySelectorAll('circle.'+className)[0];

  targetBase.setAttribute("fill",targetBase.getAttribute("data-color"));
}


export default ForceLayout;
