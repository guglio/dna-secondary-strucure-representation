# DNA Secondary Structure Representation

Web application that generates an interactive 2D representation of the molecule, given a DNA sequence and its 2D structure in dot-bracket
notation (DBN).
The DNA Sequence will contain standard A, C, T, G bases, possibly N (any base), in the 5'-to-3' direction.
The 2D notation will contain only dots and parentheses (e.g. no pseudo knots).

You can see a running version of this web application here:   
    [dna.guglielmo-turco.com](dna.guglielmo-turco.com)

## Features

**Here the list of the features**
- [x] each base of the sequence is colored
- [x] the DNA and DBN sequences are visible (above the graph)
- [x] every base has a label, and each one of them has a different color (as the style selected)
- [x] the 2D representation has the possibility to change the style of:
  - [x] colors of each base
  - [x] size of the base representation
  - [x] font for the label
  - [x] line width
- [ ] graph close to a planar layout
- [x] bases are draggable by the user to modify the layout
- [x] hovering a base on the graph, highlight the corresponding base (DNA and BDN) on the sequence
- [ ] hovering a base (DNA and BDN) on the sequence highlight the corresponding base on the graph
- [ ] it's possible to create new connection, connecting two unpaired and complementary bases (e.g. C and G, or A and T). When making a connection, the DBN should update
- [x] it's possible to share a the view with other users, just copy and paste the URL

## Structure of the web app

This web app is completely build with React + React Router + D3 + React-Bootstrap + Bootstrap.

Project folder content:

```ANSI
.
├── public
│   ├── .htaccess
│   ├── favicon.png
│   ├── index.html
│   └── manifest.json
├── src
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── DNAgraph.js
│   ├── ForceLayout.js
│   ├── GraphStyle.css
│   ├── Header.js
│   ├── Home.js
│   ├── createData.js
│   ├── icons
│   │   ├── dna.gif
│   │   ├── dna.png
│   │   ├── image1.jpg
│   │   └── mrDNA.png
│   ├── index.css
│   ├── index.js
│   └── registerServiceWorker.js
├── package.json
└── README.md
```
Structure of the web app

```ANSI
index.js
  └── App.js
        ├── Header.js
        └── Home.js
              └── DNAgraph.js      
                     └── ForceLayout.js
```

- **index.js**: render the App to the document
- **App.js**: handle the routes of the web app, display the top navbar (**Header.js**) and the first (and default) component (**Home.js**)
- **Home.js**: default component, where the user insert the DNA and DBN notation required to show a 2D representation of the molecule. On submit, it validate the data, and send to **DNAgraph.js**
- **DNAgraph.js**: This component hase the following tasks:
    - convert the DNA and DBN data to D3 nodes and links (**createData.js**)
    - display the default style of the graph
    - give the user the possibility to change the default style
    - display the 2D representation of the molecule (updating the style) (**ForceLayout.js**)
- **ForceLayout.js**: get as props the nodes, links and styles, to display the 2D representation of the molecule.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You need a local machine with [Node.js](https://nodejs.org/en/) installed and [npm](https://www.npmjs.com/) to install the required packages

### Installing

To install this project, you need to clone or download the repository (more info [here](https://help.github.com/articles/cloning-a-repository/) on how to clone with different platforms):

**MacOS**

Open terminal and type:
```shell
git clone https://github.com/guglio/dna-secondary-strucure-representation
```

## Running the tests

To start the development environment, open terminal and type:
```shell
npm start
```

## Create a production version

When you're ready to deploy to production, open terminal and type:
```shell
npm run build
```
will create an optimized build of your app in the build folder.

####NOTE
I've included in the public folder a custom `.htaccess` to handle the routes, if you share the link.

More details [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#deployment) on how to deployment.

## Built With

* [React](https://facebook.github.io/react/) - The heart of the web application
* [npm](https://www.npmjs.com/) - Package manager
* [D3](https://d3js.org/) - Used to generates the interactive 2D representation of the molecule
* [Bootstrap](http://getbootstrap.com/) (styles) +  [React-Bootstrap](https://react-bootstrap.github.io/) (components) - Used this combination to create a beautiful and responsive UI
* [Atom](https://atom.io/) - text editor

## Versioning

I use git for versioning.

## Author

[Guglielmo Turco](https://github.com/guglio)
