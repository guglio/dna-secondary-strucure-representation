import React,{Component} from 'react';
import GraphStyle from './GraphStyle.js';

class DNAgraph extends Component{
  constructor(props) {
    super(props);
    let currUrl = this.props.location.pathname.split('/');
    console.log(currUrl);
    this.state = {
      dna:currUrl[1],
      dbn:currUrl[2]
    };
  }

  render(){
    return(
      <div>
        <GraphStyle />
        <code>{this.state.dna}</code><br /><code>{this.state.dbn}</code>

      </div>
    )
  }
}

export default DNAgraph;
