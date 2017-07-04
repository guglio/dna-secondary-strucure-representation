import React,{Component} from 'react';

class Graph extends Component{
  constructor(props) {
    super(props);
    this.createData = this.createData.bind(this);
    this.state = {
      nodes:[],
      links:[]
    }
  }
  createData(dna,dbn){
    let openBrackets = [], links = [], nodes = [];
    let dnaArray = dna.split('');
    let dbnArray = dbn.split('');
    let last = dnaArray.length - 1;
    dnaArray.forEach(function(currBase, i){
      nodes.push({"id":i,"base":currBase});
      let source,target;
      if(i === last){
        if(dbnArray[i] === ')'){
          source = openBrackets.pop();
          target = i;
          links.push({"surce":source,"target":target});
        }
      }
      else{
        if(dbnArray[i] === ')'){
          source = openBrackets.pop();
          target = i;
          links.push({"surce":source,"target":target});
        } else if(dbnArray[i] === '('){
          openBrackets.push(i);
        }
        links.push({"surce":i,"target":i+1});
      }
    });
    return {"nodes":nodes,"links":links};
  }

  componentDidMount(){
    this.setState(this.createData(this.props.dna,this.props.dbn));
  }

  render(){
    return(
      <div>
        DNA: <code>{this.props.dna}</code><br />DBN: <code>{this.props.dbn}</code><br /><br /><br /><code>{JSON.stringify(this.state.nodes)}</code><br /><br /><br /><code>{JSON.stringify(this.state.links)}</code>
      </div>
    )
  }
}

export default Graph;
