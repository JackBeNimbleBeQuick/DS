import {ValidNodal} from 'DS/Linklist/Validated/ValidNodal';
import {Node} from 'DS/Linklist/Node';

export class DoubleNodal extends ValidNodal{

  public static direction = {
    forward: true,
    backward: false,
  }

  /**
   * Follew a validator chain pattern where validators can ne arbitraryly sequenced
   * Use cases: Forms, DataEntry, Post, Requests....
   . this Class could be the start of something like validated protocols
   . where the contructor is the missing abstract method instead of the isValid in validator
   . ** just playing around with this idea here 8^)

   * Constructor of Validated nodal i.e. this not a validator in the pure sense
   * versus a Validator which only concerns itself with the isValid method and custom messaging
   * this constructs the Object:protocol and determines if is valid at the same time

   * @param newNode Node | null
   * @param currentNode Node | null
   * @param forward  Node | null
   * Double nodals are what are used for the DLL ( Double Linked List)
   *  .provides validation where newNode or currentNode must not be null
   *  ..newNodes used for appending | prepending
   *  ..currentNodes used for midpoint insertions
   *  :. newNode only append | prepending
   *  :. currentNode && newNode for midlist insertions
   *  => NodeList.insert(nodal:DoubleNodal) mitigates these outcomes
   *
   * A more general use case would be to have optional options base construtor / invokable or factory
   *  where the extensiont would most times for the isValid method only
   */
  public constructor(newNode:Node | null, currentNode?:Node | null, forward?:boolean | null ){

    //@REVIEW this may not be necessary...
    super({
      new: newNode,
      current: currentNode,
      forward: forward !== null ? forward : true
    });

    let noda: DSNode.nodal;

    if( (currentNode instanceof Node || newNode instanceof Node)){
      this.valid = true;
      this.nodal = {
        current: currentNode,
        new: newNode,
        valid: this.valid,
        forward: forward !== null ? forward : true
      }
    }else{
      this.message = 'nodal protocol missing at least one valid Node';
    }
  }
}
