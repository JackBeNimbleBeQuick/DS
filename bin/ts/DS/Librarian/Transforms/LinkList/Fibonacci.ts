
import {Node} from 'DS/Linklist/Node';

export interface LinkListTransform{

}
export class Fibonacci{

  /**
   * Example of class for performing transforms on the Node.data
   * @return Node: to support chained transfors
   * the idea is to perform a change on each node of a linked list within
   * the NodeList.apply(transform:Function) :: context
   */
  public static Transformer = (current:Node) => {
    let prev = current.previous;
    let next = current.next;

    let f0 = prev ? prev.data : 0;
    let f1 = current.data;

    next ? next.data = f0+f1 : null;

    return current;
  }

}
