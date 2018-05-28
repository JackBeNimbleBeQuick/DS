


export class ObjectSizeEstimate{

/**
 * Returns length of the NodeList
 * @NOTE it may be more semantic to actually run a size of memory
 * for all nodes in this list and make new method for getLength
 * ref for code: http://code.iamkate.com/javascript/finding-the-memory-usage-of-objects/
 * ref https://gist.github.com/zensh/4975495
 * @TODO move the sizer into the Librarian.Utility path
 * @return [description]
 */
public size = (current) => {
  let byten = 0;
  let sizer = this.sizer;
  while(current){
    let byten = sizer(current);
    console.log(byten);
    current = current.next;
  }


  let format = (bytes) => {
    if(bytes < 1024) return bytes + " bytes";
    else if(bytes < 1048576) return(bytes / 1024).toFixed(3) + " KiB";
    else if(bytes < 1073741824) return(bytes / 1048576).toFixed(3) + " MiB";
    else return(bytes / 1073741824).toFixed(3) + " GiB";

  }

  return format(byten);


}

/**
 * provides Sizing Estimate
 * @param  item||{}
 * @return
 */
private sizer = (value:any ) => {

  let typeSizes = {
    "undefined": () => 0,
    "boolean": () => 4,
    "number": () => 8,
    "string": item => 2 * item.length,
    "object": item => Object
      .keys(item || {})
      .reduce((total, key) => sizeOf(key) + sizeOf(item[key]) + total, 0)
  };

  let sizeOf = value => typeSizes[typeof value](value);

  return sizeOf;

}
}
