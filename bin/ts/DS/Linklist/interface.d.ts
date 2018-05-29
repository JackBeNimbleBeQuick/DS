interface NodeList {
  //pointers
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
  // length():number, //TS does not like this one

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

  //transforns on data see Librarian/Transform
  apply(Function): void,
}

interface Node{
  previous: Node | null,
  next: Node | null,
  data: any,
}

interface ValidNodal{
  isValid():boolean,
  getMessage(): string,
  get(): nodal,
}

interface NodeTransformer{
  Function(Node): Node
}


/** @NOTE playing with the small talk idiom for protocal / messaging
* where with Typescript we can provide well defined communication objects
* using lower method casing
   -- protocal for communication between Linklist methods
   -- @REVIEW having issues with use of Node typing within interface for this def
   --- could be an issue with namespace | or some internal referencing issue not sure
*/
interface nodal{
  current: any | null,
  new: any | null,
  forward: boolean,

  // @TODO introduce valid nodal method | validator doubleNodal ??
    // if tail then next can be null, if head then previous can be null, else previous && next most be nodes
    //( (isFirst()) && (nodal.next && ! nodal.previous) || isLast() || nodal.next && nodal.previous)
  valid: boolean
}
