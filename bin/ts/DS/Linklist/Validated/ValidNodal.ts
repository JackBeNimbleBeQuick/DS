import {Node} from 'DS/Linklist/Node';

export class ValidNodal implements ValidNodal{

  protected valid = false;
  protected nodal: DSNode.nodal;
  protected message: string | null;

  //options assignable
  protected forward:boolean;
  protected current:null | Node;
  protected new:null | Node;

  /**
   * @REVIEW constructor may not be necessary
   * @TODO generalize more and move into general Validated | Validator class
   *  :. this should extend from the more general validator class YTBB (yet to be built)
   *
   * GP Validator of this type
   * @param options Objet of keyed properties of the class
   */
  constructor(options:Object){
    for(let prop in options){
      if(/(valid|current|new|forward)/.test(prop)){
        this[prop] = options[prop];
      }
    }
  }

  /**
   * Requires construtor usage
   * @REVIEW error_handling
   * @TODO create error_handling protocol
   * @return {boolean}
   */
  public isValid = () => {
    return this.valid;
  }

  /**
   * returns the error handling message
   * @return {string | null}
   */
  public getMessage = () => {
    return this.message;
  }

  /**
   * get a valid nodal after following validated pattern
   */
  public get = () => {
    return this.nodal;
  }

}
