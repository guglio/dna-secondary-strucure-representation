import React, { Component } from 'react';
import {Form,Col,FormGroup,FormControl,Button,Grid,Row} from 'react-bootstrap';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dna:'',
      dbn:'',
      warning:''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let dna = this.state.dna;
    let dbn = this.state.dbn;
    let errState = '';

    if(dna.length <= 0)
      errState += 'DNA sequence must be > 0 ';
    if(dbn.length <= 0)
      errState += "DBN sequence must be > 0 ";
    if(!dna.match(/^[ACTGactg]+$/))
      errState += "DNA sequence not accepted (only C,G,A,T base) ";
    if(!dbn.match(/^[.()]+$/))
      errState += "DBN notation not accepted (only dots and parentheses) ";
    if(errState === ''){
      let path = this.state.dna+"/"+this.state.dbn;
      this.props.history.push(path);
    }
    else{
      this.setState({warning:errState});
    }

  }

  render() {
    return (
      <Grid>
        <Row>
          <Col md={12}>
            <p>This tool create an interactive 2D representation of a molecule, given its DNA sequence and 2D structure in dot-bracket notation (DBN).</p>
          </Col>
          <Col md={12}>
            <Form horizontal id="test" onSubmit={this.handleSubmit}>
              <FormGroup controlId="formHorizontalEmail">
                <Col  sm={2}>
                  DNA
                </Col>
                <Col sm={10}>
                  <FormControl type="text" name="dna" value={this.state.dna} onChange={this.handleInputChange} placeholder="DNA Sequence with standard A, C, T, G bases"/>
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalPassword">
                <Col  sm={2}>
                  DBN
                </Col>
                <Col sm={10}>
                  <FormControl type="text" name="dbn" value={this.state.dbn} onChange={this.handleInputChange} placeholder="2D notation with only dots and parentheses (e.g. no pseudo knots)"/>
                </Col>
              </FormGroup>

              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <Button type="submit">
                    Draw
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </Col>
        </Row>
        <Row>
          <p className="bg-danger">{this.state.warning}</p>
        </Row>
      </Grid>
    );
  }
}

export default Home;
