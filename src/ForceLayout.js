import React, {Component} from 'react'
import * as d3 from "d3";
import './ForceLayout.css';

class ForceLayout extends Component{

  componentDidUpdate() {
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
          };

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
                      .on("mouseover", mapMouseOver)
                      .on("mouseout", mapMouseOut)
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
                      .on("mouseover", mapMouseOver)
                      .on("mouseout", mapMouseOut)
                      .text(d => d.base || '')
                      .attr("fill", "#000");


    node.append("title").text(d => d.id);

    simulation.nodes(graph.nodes)
              .on("tick", ticked)
              .force("link")
              .links(graph.links);

    function bounderisBox(bounds,coor){
      let newCoor;
      (coor >= bounds.start && coor <= bounds.end) ? newCoor = coor : (coor < bounds.start) ? newCoor = bounds.start : newCoor = bounds.end;

      return newCoor;
    }

    function mapMouseOver(d){
      let base = document.getElementsByClassName("idBase"+d.id);

      base[0].classList.add('baseActive');
      base[1].classList.add('baseActive');
      base[0].style.backgroundColor = d.group;
      base[1].style.backgroundColor = d.group;
    }
    function mapMouseOut(d){
      let base = document.getElementsByClassName("idBase"+d.id);

      base[0].classList.remove('baseActive');
      base[1].classList.remove('baseActive');
      base[0].style.backgroundColor = "inherit";
      base[1].style.backgroundColor = "inherit";
    }


    function ticked() {

        link
            .attr('x1', d => bounderisBox(svgBounds.x,d.source.x) || 0)
            .attr('y1', d => bounderisBox(svgBounds.y,d.source.y) || 0)
            .attr('x2', d => bounderisBox(svgBounds.x,d.target.x) || 0)
            .attr('y2', d => bounderisBox(svgBounds.y,d.target.y) || 0);

        node
            .attr("cx", d => bounderisBox(svgBounds.x,d.x) || 0)
            .attr("cy", d => bounderisBox(svgBounds.y,d.y )|| 0);
        text
            .attr("x", d => bounderisBox(svgBounds.x,(d.x-offsetText)) || 0)
            .attr("y", d => bounderisBox(svgBounds.y,(d.y+offsetText)) || 0)
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

function mouseEnterHandle(event){
  const target = event.target;
  const className = target.className;
  const targetBase = document.querySelectorAll('circle.'+className)[0];

  targetBase.setAttribute("fill","red");
}

function mouseLeaveHandle(event){
  const target = event.target;
  const className = target.className;
  const targetBase = document.querySelectorAll('circle.'+className)[0];

  targetBase.setAttribute("fill",targetBase.getAttribute("data-color"));
}


export default ForceLayout;
