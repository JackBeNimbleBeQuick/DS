


export class ObjectSizeEstimate{

/**
 * Returns length of the NodeList
 * ref for code: http://code.iamkate.com/javascript/finding-the-memory-usage-of-objects/
 * ref https://gist.github.com/zensh/4975495
 * @TODO move the sizer into the Librarian.Utility path
 * @return memory object
 * meant as a memory inspector though this will be a truly
 * rough estimate when implemented
 * WARNING this is not implemented at all and just placeholder for now
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
