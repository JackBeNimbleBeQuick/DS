# DS Typescript Data Structures

## A Kickstarter Kit for typescript test driven patterns with no js frameworks

### A series of Data Structure
- with the intent to use as part of the TUC pattern 8^)
  - test driven design
  - validated protocol interfaces
  - typescript with unit Tests
  - use of jest and ts-jest

### Get started

- may I suggest Node Version Management [npm nvm](https://github.com/creationix/nvm) | [npm nvm-windows](https://github.com/coreybutler/nvm-windows) if you have not done so yet
  - this package assembled with npm v8.9.4
- install and setup typescript [ts](https://www.npmjs.com/package/typescript)
- run all tasks within bin/ this is meant as distribution point for all parts of a fully working implementation

...

- git clone DS
- mkdir MyDSLib
- cd MyDSLib
- npm install

### Command lines
- npm test
- tsc (when you have typescript installed global)
  - tsc builds to js directory there is no clean up
  - adjust CompilerOptions to meet your needs a) outDir b) target

### Known issues
- library is still in development and not ready for production
- Still working to get that perfect score all lines tested but not yet showing in the coverage reports... ~<|8^]

### Interface

```
interface NodeList {
  //pointers private
  _pointer: Node,
  _first: Node,
  _last: Node,
  _len: number,

  //accessors
  getFirst(): Node,
  getLast(): Node,
  currentData: Object, //Node.data for each pointer
  current(): Object,
  seekByValue(any): Node | null,
  length():number,

  //diagnostic
  display():Array<Object>,

  stepBackTo(number): Node,
  stepForwardTo(number): Node,
  appendData(any): Node,

  //controlled input
  insert(nodal): Node,
  //takes form method(left:Node, new:Node );
  insertNewBefore(Node): Node,
  insertNewAfter(Node): Node ,

  //unlinks a node and returns its data | null
  unlink(node:Node): any | null,

  //transforms on data see Librarian/Transform
  apply(Function): void,
}
```

### Usage

#### instantiate a list
```
  let list = new NodeList();
  let named = {};

  let make = () => {['first','second','third','fourth','fifth','sixth','seventh','eigth', 'ninth','tenth'].forEach((item)=>{
      named[item] = list.appendData(item);
  });
```
#### cycle a list
```
  let transformer = Fibonacci.Transformer;
  let current = list.getFirst();

  while(current){
    transformer(current);
    // ...or what ever
    current = current.next;
  }

```
### build and use transformers

```
  let end = 19
  let i = 0;
  do{
    list.appendData(i);
  }
  while((i++ < end))

  //transformed list
  list.apply(Fibonacci.Transformer);

  console.log(list.display().join(','))

```



#### Thanks for coming to the show, come on back when the full band is here
