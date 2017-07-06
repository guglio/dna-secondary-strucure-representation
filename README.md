# DNA Secondary Structure Representation

Web application that generates an interactive 2D representation of the molecule, given a DNA sequence and its 2D structure in dot-bracket
notation (DBN).
The DNA Sequence will contain standard A, C, T, G bases, possibly N (any base), in the 5'-to-3' direction.
The 2D notation will contain only dots and parentheses (e.g. no pseudo knots).

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
will create an optimized build of your app in the build folder

## Built With

* [React](https://facebook.github.io/react/) - The web framework used
* [npm](https://www.npmjs.com/) - Package manager
* [D3](https://d3js.org/) - Used to generates the interactive 2D representation of the molecule
* [Atom](https://atom.io/) - text editor

## Versioning

I use git for versioning.

## Author

[Guglielmo Turco](https://github.com/guglio)
