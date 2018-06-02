# DS Typescript Data Structures
<blockquote>
NodeList _Not a linked list_
 The use case for such a thing: this could act as a functional description for dealing with a firehose worth of data, where some rx.js observers are attached to break away segments for store. Or this could be used for introspection and transforms in async activities before store. Not sure really but so far it has been fun to build within a test driven pattern 8^)
</blockquote>


## A Kickstarter Kit for typescript test driven patterns with no js frameworks

### A series of Data Structure libs will be added as we go
- with the intent to use as part of the TUC pattern 8^)
  - test driven design
  - validated protocol interfaces
  - typescript with unit tests
  - use of jest and ts-jest

### Get started

- may I suggest Node Version Management [npm nvm](https://github.com/creationix/nvm) | [npm nvm-windows](https://github.com/coreybutler/nvm-windows) if you have not done so yet
  - this package assembled with npm v8.9.4
- install and setup typescript [ts](https://www.npmjs.com/package/typescript)
- run all tasks within bin/ this is meant as distribution point for all parts of a fully working implementation

...

- git clone [DS](https://github.com/JackBeNimbleBeQuick/DS.git)
- mkdir MyDSLib
- cd MyDSLib/DS/bin
- npm install
-npm test

### Command lines
- npm test
- tsc (when you have typescript installed global)
  - tsc builds to js directory there is no clean up for that yet
  - tsconfig.json: adjust CompilerOptions to meet your needs a) outDir b) target

### Known issues
- ** Not a linked list by pure definition, at this point this is a toy structure I am playing with as part of an exploration of other processing intensive activities.
  - provides linked node structure much like a linked list but breaks the rules
  to provide fast data grabbing that can be broken out for further introspective / processing as part of a stream storage chain
  - it returns pointers
  - it maintains length
  - pointers can be accessed as part of data stream  
  - it does not emulate LinkedList methods
  - with a returned node you can process the chain externally, which offers it as subclass to node processing daemons... maybe 8^) as I said it is a new toy
- library is still in development and not ready for production
- Still working to get that perfect score
  - all lines are tested but not yet showing in the coverage reports... ~<|8^]

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
  current(): Object, //Nodes for each pointer
  seekByValue(any): Node | null,
  length():number,

  //diagnostic
  display():Array<Object>,

  rewind(number): Node,
  advance(number): Node,
  appendData(any): Node,

  //controlled input
  //takes form method(left:Node, new:Node );
  insert(nodal): Node,

  //mid list inserts
  insertNewBefore(Node): Node,
  insertNewAfter(Node): Node ,

  //unlinks a node and returns its data | null
  //this will support
  // .popFromTop let data:any = list.unlink(list.getFirst())
  // .popFromBottom let data:any = list.unlink(list.getLast())
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
  let list = new NodeList();
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
- this result makes me real happy 8^) sanity is coming to the land of js....

```
npm audit

                       === npm audit security report ===                        

found 0 vulnerabilities
 in 23784 scanned packages                                                                                

 ```
``
