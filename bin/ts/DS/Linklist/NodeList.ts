import { Node } from  'DS/Linklist/Node';
import { DoubleNodal } from  'DS/Linklist/Validated/DoubleNodal';

export class NodeList implements NodeList{

  protected _pointer: Node | null = null;
  protected _first: Node | null = null;
  protected _last: Node | null = null;
  protected _len      = 0;

  public constructor(data?:any){

    //if data construct and insert first Node
    if(data){
      this.firstNode(new Node(data));
      this._len++;
    }
  }

  /** General Accessors not bothering to comment these at this point **/

  /** √
   * Get First Node in list
   * @return {Node}
   */
  public getFirst = () => {
    return this._first;
  }

  public getLast = () => {
    return this._last;
  }

  /** √
   * Provides current ListPointers of NodeList
   * @return {Object}
   */
  public currentData = () => {
    return {
      size: this._len,
      current: this._pointer.data,
      first: this._first ? this._first.data : null,
      last:  this._last ? this._last.data : null,
    }
  }

  /** √
   * Provides current ListPointers of NodeList
   * @return {Object}
   */
  public current = () => {
    return {
      size: this._len,
      current: this._pointer,
      first: this._first,
      last:  this._last,
    }
  }

  /** Pointer manipulations **/
  /** √
   * Provides displayable information
   * @param  this.currentData
   * @return Array(Object)
   * not advisable in production as it sets pointer
   * which could result in unexpected results for other pointer
   * based interactions
   */
  public display = ():Array<any> => {
    let current = this._first;
    let result = [];
    do{
      this._pointer = current;
      result.push(this.currentData().current);
      current = current.next;
    }
    while(current);
    return result;
  }

  public length = () => {
    return this._len;
  }


  /** √
   * Provide safe steps from _last to steps back | startOfList
   * @return {Void}
   * @REVIEW consider form of this that does not reset pointer
   * this method sets the internal _pointer for retrievals &| transforms
   */
  public  stepBackTo = (index:number) => {
    let current = this._last;
    let steps = index > this._len -1 ? this._len : index -1;
    while(current && steps){
      current = current.previous;
      steps--;
    }
    return current;
  }

  /** √
   * Provide safe steps from _first to steps forward | endOfList from start
   * @return {Void}
   * @REVIEW consider form of this that does not reset pointer
   * this method sets the internal _pointer for retrievals &| transforms
   */
  public  stepForwardTo = (index:number) => {
    let current = this.getFirst();
    let steps = index > this._len -1 ? this._len : index -1;
    while(current && steps){
      current = current.next;
      steps--;
    }
    return current;
  }
  /** additions to list **/
  /**
   * Simple as it gets append to end or start list with first entry
   * @param  {number} this._len===0
   * @return {Node} this._pointer
   */
  public appendData = (data:any) => {
    if(this._len === 0){
       this.firstNode(new Node(data));
    }
    this.lastNode(new Node(data));

    this._len++;
    return this._pointer;
  }

  /**
   * nodal acts as protocal for changes on List
   * nodal.forward:boolen, nodal.current:Node nodal.new: null | Node
   * @NOTE me thinks this ambitious and needing a very well thought out unit test
   * @param {nodal} follows validation pattern
   * @return {Void} sets base NodeList params
   * @TODO this is too complex replace with::
   *  ** append, insertNewAfter, insertNewBefore, prepend
   */
  public insert = (st:nodal) => {
    let selectNode : null | Node = st.current;
    let newNode    : Node = st.new;
    let insert  = selectNode && newNode;
    let isNew   = selectNode === null && newNode ? true : false;
    let isFirst = isNew && this._len === 0;
    let prev    = selectNode ? selectNode.previous : null;

    // first node in chain
    if(insert){
      if(st.forward){
         this.insertNewAfter( newNode, selectNode);
      }else{ //backward
        this.insertNewBefore( newNode, selectNode);
      }
    }else{
      if( isFirst ){
        this.firstNode(newNode);
      }else {
        this.lastNode(newNode);
      }
    }

    this._len ++;
    return this._pointer;

  }

  /** √
   * Provides a transform on the List
   *
   * @param  current.getNext
   * @return NodeList
   */
  public apply = (transform: any) => {

    //@REVIEW is typeof primative function best usage or instanceof?
    let typed   = typeof transform;
    let current = this._first;

    while (current){

      if( /(number|boolean|string|null|0bject)/.test(typed)){
        current.data = transform;
      }

      if( typed === 'function') {
        transform(current);
      }

      current = current.next;
    }

    return this;
  }

  /**
   * Insert before the right node
   * @param {Node} node
   * @param {Node} left
   * @return {Node} _pointer
   */
  public insertNewBefore = (node:Node, right:Node) =>{


    let left = right.previous;
    left.next = node;
    right.previous = node;

    node.previous = left;
    node.next = right;

    this._pointer = node;
    return this._pointer;

  }

  /** √
   * Insert after left
   * @param {Node} node
   * @param {Node} left
   * @return {Node} _pointer
   * @TODO add redirect to firstNode if _len === 0
   */
  public insertNewAfter(node:Node, left:Node){

    let right = left.next
    left.next = node;
    right.previous = node;

    node.previous = left;
    node.next = right;

    this._pointer = node;
    return this._pointer;
  }
  /** √
   * First node on the chain
   * @param {Node} node
   * @return {Node}
   */
  private firstNode(node:Node){
    this._first   = node;
    this._last    = node;
    this._pointer = node;
    return this._pointer;
  }

  /** √
   * Last node on the chain
   * @param {Node} node
   * @return {Node}
   */
  private lastNode(node:Node){
    this._last.next = node;
    node.previous = this._last;
    this._last = node;
    this._pointer = node;
    return this._pointer;
  }

  /**
   * compare and swap
   * @param {Node} left
   * @param {Node} right
   * @param {Node} current
   * @return if contents of
   */
  private cas(targetNode:Node, oldNode:Node, newNode: Node){

  }




}
