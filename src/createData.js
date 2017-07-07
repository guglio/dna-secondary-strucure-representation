/*
Function to create the nodes and links that are pushed inside the D3 force layout to build the 2D representation of the molecule.
To create the "secondary" links between the bases, I had a backup array with the node id of the open bracket, and when the first close bracket is found, I get the last item saved in the backup array, and remove it.
I grouped the bases, so it's easier to handle the style changes and manipulations in general
*/

export const createData = (dna,dbn,color) => {
  let openBrackets = [], links = [], nodes = [];
  let dnaArray = dna.split('');
  let dbnArray = dbn.split('');
  let last = dnaArray.length - 1;
  dnaArray.forEach(function(currBase, i){
    let group = currBase === 'A' ? color.A : currBase === 'C' ? color.C : currBase === 'T' ? color.T : currBase === 'G' ? color.G : 0;
    nodes.push({"id":i,"base":currBase,"group":group});
    let source,target;
    if(i === last){
      if(dbnArray[i] === ')'){
        source = openBrackets.pop();
        target = i;
        links.push({"source":source,"target":target});
      }
    }
    else{
      if(dbnArray[i] === ')'){
        source = openBrackets.pop();
        target = i;
        links.push({"source":source,"target":target});
      } else if(dbnArray[i] === '('){
        openBrackets.push(i);
      }
      links.push({"source":i,"target":i+1});
    }
  });
  return {"nodes":nodes,"links":links};
}
