import React, { Component } from 'react';
import {Col,Grid,Row} from 'react-bootstrap';

class GraphStyle extends Component{

  render(){
    return(
      <Grid>
        <Row>
          <Col md={6}>
            <h3>Colors</h3>
            <p>A</p>
            <p>C</p>
            <p>T</p>
            <p>G</p>
          </Col>
          <Col md={6}>
            
          </Col>
        </Row>
      </Grid>
    )
  }

}

export default GraphStyle;
