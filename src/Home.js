import React, { Component } from 'react';
import {Form,Col,FormGroup,FormControl,Button,Grid,Row} from 'react-bootstrap';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dna:'',
      dbn:''
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
    const path = '/'+this.state.dna+'/'+this.state.dbn;
    this.props.history.push(path);
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col md={12}>
            <Form horizontal id="test" onSubmit={this.handleSubmit}>
              <FormGroup controlId="formHorizontalEmail">
                <Col  sm={2}>
                  DNA
                </Col>
                <Col sm={10}>
                  <FormControl type="text" name="dna" value={this.state.dna} onChange={this.handleInputChange} />
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalPassword">
                <Col  sm={2}>
                  DBN
                </Col>
                <Col sm={10}>
                  <FormControl type="text" name="dbn" value={this.state.dbn} onChange={this.handleInputChange}
                  />
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
          <code>{this.state.dna}</code><br />
          <code>{this.state.dbn}</code>
        </Row>
      </Grid>
    );
  }
}

export default Home;
