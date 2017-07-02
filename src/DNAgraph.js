import React,{Component} from 'react';
import GraphStyle from './GraphStyle.js';

class DNAgraph extends Component{
  constructor(props) {
    super(props);
    let currUrl = this.props.location.pathname.split('/');
    this.state = {
      dna:currUrl[1],
      dbn:currUrl[2]
    };
  }

  render(){
    return(
      <div>
        DNA: <code>{this.state.dna}</code><br />DBN: <code>{this.state.dbn}</code>
        <GraphStyle />
      </div>
    )
  }
}

export default DNAgraph;
