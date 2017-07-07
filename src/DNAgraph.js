import React,{Component} from 'react';
import {Col,Grid,Row,ControlLabel,FormControl} from 'react-bootstrap';
import ForceLayout from './ForceLayout.js';
import * as DataHandle from './createData.js';
import './GraphStyle.css';
const boobleSizes = [],lineSizes=[];
for(let i=14;i<50;i++)
  boobleSizes.push(i);
for(let i=1;i<10;i+=1)
  lineSizes.push(i);
const fonts =['Arial','Helvetica','Times New Roman'];

const boobleColors = ['#2276b6','#adc6e9','#f17d30','#f7bb71','#4da225','#96e086','#d93f2a','#f29593','#9564bf','#c5afd6','#8d5649','#c59c93','#e574c3','#f4b4d2','#7f7f7f','#c7c7c7','#bcbf24','#dbdc88','#4fbfd0','#9cdae6'];


class DNAgraph extends Component{
  constructor(props) {
    super(props);
    let currUrl = this.props.location.pathname.split('/');
    this.state = {
      dna:currUrl[1],
      dbn:currUrl[2],
      font: fonts[0],
      booble: boobleSizes[0],
      line: lineSizes[0],
      colorA: boobleColors[0],
      colorC: boobleColors[1],
      colorT: boobleColors[2],
      colorG: boobleColors[3]
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
componentWillMount(){
  const colorGroup = {
    A: this.state.colorA,
    C: this.state.colorC,
    T: this.state.colorT,
    G: this.state.colorG
  };
  this.setState(DataHandle.createData(this.state.dna,this.state.dbn,colorGroup));
}
  render(){
    return(
      <div>
        <Grid>
          <Row>
            <h2>Default Style</h2>
            <Col md={6} className="palettePreview">
              <h3>Colors</h3>
              <Row>
                <Col md={1}>
                  <ControlLabel>A</ControlLabel>
                </Col>
                <Col md={1} className="colorPreview" style={{backgroundColor:this.state.colorA}} />
                <Col md={3}>
                  <FormControl componentClass="select" value={this.state.colorA} onChange={this.handleStyleChange} name="colorA">
                    {boobleColors.map(function(item,index) {
                      return <option value={item} key={index}>{item}</option>;
                    })}
                  </FormControl>
                </Col>
              </Row>
              <Row>
                <Col md={1}>
                  <ControlLabel>C</ControlLabel>
                </Col>
                <Col md={1} className="colorPreview" style={{backgroundColor:this.state.colorC}} />
                <Col md={3}>
                  <FormControl componentClass="select" value={this.state.colorC} onChange={this.handleStyleChange} name="colorC">
                    {boobleColors.map(function(item,index) {
                      return <option value={item} key={index}>{item}</option>;
                    })}
                  </FormControl>
                </Col>
              </Row>
              <Row>
                <Col md={1}>
                  <ControlLabel>T</ControlLabel>
                </Col>
                <Col md={1} className="colorPreview" style={{backgroundColor:this.state.colorT}} />
                <Col md={3}>
                  <FormControl componentClass="select" value={this.state.colorT} onChange={this.handleStyleChange} name="colorT">
                    {boobleColors.map(function(item,index) {
                      return <option value={item} key={index}>{item}</option>;
                    })}
                  </FormControl>
                </Col>
              </Row>
              <Row>
                <Col md={1}>
                  <ControlLabel>G</ControlLabel>
                </Col>
                <Col md={1} className="colorPreview" style={{backgroundColor:this.state.colorG}} />
                <Col md={3}>
                  <FormControl componentClass="select" value={this.state.colorG} onChange={this.handleStyleChange} name="colorG">
                    {boobleColors.map(function(item,index) {
                      return <option value={item} key={index}>{item}</option>;
                    })}
                  </FormControl>
                </Col>
              </Row>
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
          {/* <Row>
            <Col md={12}>
              <h3>Style Preview</h3>
                <Row>
                  <Col md={4}>
                    <p><span className="baseBubble" style={{fontSize:this.state.booble+'px',backgroundColor:this.state.colorA}}><span className="innerText">A</span></span><span className="baseline" style={{fontSize:this.state.line+'px'}}>-</span><span className="baseBubble" style={{fontSize:this.state.booble+'px',backgroundColor:this.state.colorT}}><span className="innerText">T</span></span></p>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <p><span className="baseBubble" style={{fontSize:this.state.booble+'px',backgroundColor:this.state.colorC}}><span className="innerText">C</span></span><span className="baseline" style={{fontSize:this.state.line+'px'}}>-</span><span className="baseBubble" style={{fontSize:this.state.booble+'px',backgroundColor:this.state.colorG}}><span className="innerText">G</span></span></p>
                  </Col>
                </Row>
              </Col>
          </Row> */}
        <Row>
          <Col md={12} id="forceLayout">
            <ForceLayout width={1200} height={720} links={this.state.links} nodes={this.state.nodes} fonts={this.state.fonts} booble={this.state.booble} line={this.state.line} colorA={this.state.colorA} colorC={this.state.colorC} colorT={this.state.colorT} colorG={this.state.colorG} dna={this.state.dna.split('')} dbn={this.state.dbn.split('')}/>
          </Col>
        </Row>
        </Grid>
      </div>
    )
  }
}

export default DNAgraph;
