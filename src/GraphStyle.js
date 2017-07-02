import React, { Component } from 'react';
import {Col,Grid,Row,ControlLabel,FormControl} from 'react-bootstrap';
import './GraphStyle.css';


const fonts =['Arial','Helvetica','Times New Roman'];
const boobleSizes = [10,11,12,13,14,15,16,17,18,19];
const lineSizes = [0.25,0.5,1,1.25,1.5,1.75,2];

class GraphStyle extends Component{
  constructor(props) {
      super(props);
      this.state = {
        font: fonts[0],
        booble: boobleSizes[0],
        line: lineSizes[0]
      };

      this.handleStyleChange = this.handleStyleChange.bind(this);
  }

  handleStyleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  }

  render(){
    return(
      <Grid>
        <Row>
          <h2>Default Style</h2>
          <Col md={6}>
            <h3>Colors</h3>
            <p>A</p>
            <p>C</p>
            <p>T</p>
            <p>G</p>
          </Col>
          <Col md={6} className="fontStyleCols">
            <h3>Font Style</h3>
            <Row>
              <Col md={4}>
                <ControlLabel>Base booble size:</ControlLabel>
              </Col>
              <Col md={5}>
                <FormControl componentClass="select" value={this.state.value} onChange={this.handleStyleChange} name="booble">
                  {boobleSizes.map(function(item,index) {
                    return <option value={item} key={index}>{item} {typeof(item) === 'number' ? 'px':''}</option>;
                  })}
                </FormControl>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <ControlLabel>Font label:</ControlLabel>
              </Col>
              <Col md={5}>
                <FormControl componentClass="select" value={this.state.value} onChange={this.handleStyleChange} name="font">
                  {fonts.map(function(item,index) {
                    return <option value={item} key={index}>{item} {typeof(item) === 'number' ? 'px':''}</option>;
                  })}
                </FormControl>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <ControlLabel>Line width:</ControlLabel>
              </Col>
              <Col md={5}>
                <FormControl componentClass="select" value={this.state.value} onChange={this.handleStyleChange} name="line">
                  {lineSizes.map(function(item,index) {
                    return <option value={item} key={index}>{item} {typeof(item) === 'number' ? 'px':''}</option>;
                  })}
                </FormControl>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h3>Style Preview</h3>
            <Row>
              <code>{this.state.font}</code><br/>
              <code>{this.state.booble}</code><br/>
              <code>{this.state.line}</code><br/>
            </Row><br/><br/><br/><br/><br/>
            <Row>
              <Col md={12}>
                <p><span className="baseBubble" style={{'font-size':this.state.booble+'px'}}>A</span><span className="baseline">-</span><span className="baseBubble">T</span></p>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <p><span className="baseBubble">C</span><span className="baseline">-</span><span className="baseBubble">G</span><span className="baseline">-</span><span className="baseLabel">Label</span></p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    )
  }

}

export default GraphStyle;
