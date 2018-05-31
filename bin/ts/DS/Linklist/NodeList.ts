///<reference path="./interface.d.ts" />

import { Node } from  'DS/Linklist/Node';
import { DoubleNodal } from  'DS/Linklist/Validated/DoubleNodal';

export class NodeList implements NodeList{

  protected _pointer: Node | null = null;
  protected _first: Node | null = null;
  protected _last: Node | null = null;
  protected _len:number = 0;

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
  public current = ():DSNode.listState => {
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
    let i= 0;
    while(current){
      result.push(current.data);
      current = current.next;
      i++;
    }
    return result;
  }

  /**
   * get current length of the list
   * @param  current&&steps [description]
   * @return                [description]
   */
  public length = () => {
    return this._len;
  }

  /**
   * Seek list by Name... indexing or hashing would make this
   * faster ... but should most like called as a bandwidth Provides
   *
   * @param  current&&steps [description]
   * @return {Node | null}
   * returns first instance of
   */
  public seekByValue = (value) =>{
    let current = this._first;
    let dv = /(string|number|boolean)/.test(typeof value);

    while(current){
      if(dv && current.data === value){
        return current;
      }else if(!dv){
        throw Error('Na, we are not doing that yet');
      }
      current = current.next;
    }

    return null;
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

  /** additions to list **/
  /**
   * Simple as it gets append to end or start list with first entry
   * @param  {number} this._len===0
   * @return {Node} this._pointer
   */
  public appendData = (data:any) => {
    let method:Function;
    if(this._len === 0){
      // method = this.firstNode;
      this.firstNode(new Node(data));
    }else{
      this.lastNode(new Node(data));
    }
    this._len++;
    return this._pointer;
  }

  /**
   * nodal acts as protocal for changes on List
   * @NOTE optionally method for controlled ingesting of data
   * ->>see @append where data can be passed in directly
   * nodal.forward:boolen, nodal.newNode:Node nodal.selectNode: null | Node
   * data is passed and the internals stay internal
   * @param {nodal} follows validation pattern
   * @return {Void} sets base NodeList params
   *  ** append, insertNewAfter, insertNewBefore, prepend
   */
  public insert = (st:DSNode.nodal) => {
    let selectNode : null | Node = st.current;
    let newNode    : Node = st.new;
    let insert  = selectNode && newNode;
    let isNew   =  ! selectNode && newNode ? true : false;
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

  /**
   * Simple unlink and node
   * @param {Node} node
   * @return {any} value
   * provides the unlink % plucking of data
   * from this many convience method may come
   * s@ pop, pluck, popTop, popBottom
   */
  public unlink(node:Node){
    //is at top
    if(!node) return null;
    let value = node.data;
    let prev = node.previous;
    let next = node.next;

    //is at top
    if(node === this._first){
      // console.log(`TOP of LIST first now is ${this._first.data}`);
      this._first = node.next;
      node.next = null;
    //is at bottom
    }else if( !node.next ){
      prev.next = null;
      this._last = node.previous;
    //somewhere in the middle
    }else{
      //both the next and previous node links need to be broken
      node.next = null;
      node.previous.next= null;
      prev.next = next;
      next.previous = prev;
    }

    this._len--;
    return value;
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
}
