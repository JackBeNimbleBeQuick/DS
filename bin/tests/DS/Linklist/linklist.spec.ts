import {Node} from 'DS/Linklist/Node';
import {NodeList} from 'DS/Linklist/NodeList';
import {DoubleNodal} from 'DS/Linklist/Validated/DoubleNodal';
import {Fibonacci} from 'DS/Librarian/Transforms/Linklist/Fibonacci';

const words =["retire","drab","wool","dime","alleged","possessive","complete","well-groomed","preserve","curve","moaning","quilt","tasteful","incompetent","match","guarantee","coil","hospitable","cave","spectacular","own","whip","ring","imagine","milk","disgusted","wriggle","freezing","tire","rose","produce","empty","unwritten","regret","whistle","yard","dispensable","practise","acid","insidious","hellish","forgetful","rob","magical","lucky","money","frantic","lush","cent","condemned","bump","announce","tendency","amuse","obscene","threatening","light","obtain","event","squealing","save","loving","burst","stone","meek","scared","stamp","meeting","need","fit","vague","gamy","chase","arrest","capricious","plant","exultant","cultured","warm","reflect","likeable","relation","efficient","frogs","bewildered","rule","road","pass","like","hobbies","premium","day","fine","wax","low","prevent","hook","fork","satisfying","waiting"]

/*
[outside source](https://www.browserling.com/tools/fibonacci-numbers)
 */
const predict = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, 17711, 28657, 46368, 75025, 121393, 196418, 317811, 514229, 832040, 1346269, 2178309, 3524578, 5702887, 9227465, 14930352, 24157817, 39088169, 63245986, 102334155, 165580141, 267914296, 433494437, 701408733, 1134903170, 1836311903, 2971215073, 4807526976, 7778742049, 12586269025, 20365011074, 32951280099, 53316291173, 86267571272, 139583862445, 225851433717, 365435296162, 591286729879,956722026041, 1548008755920, 2504730781961, 4052739537881, 6557470319842, 10610209857723, 17167680177565, 27777890035288, 44945570212853, 72723460248141, 117669030460994, 190392490709135, 308061521170129, 498454011879264, 806515533049393, 1304969544928657, 2111485077978050, 3416454622906707, 5527939700884757, 8944394323791464, 14472334024676220, 23416728348467684, 37889062373143900, 61305790721611580, 99194853094755490, 160500643816367070, 259695496911122560, 420196140727489660, 679891637638612200,1100087778366101900, 1779979416004714000, 2880067194370816000, 4660046610375530000, 7540113804746346000, 12200160415121877000, 19740274219868226000, 31940434634990100000, 51680708854858330000, 83621143489848430000, 135301852344706760000, 218922995834555200000, 354224848179262000000];

//@NOTE total limit is 100 Fibonacci number in predict.
//@NOTE using other transforms would require other externally generated predit Objects
const run_length = 100;

/*
@TESTS snap shot 2018.26.05
✓ test of moving up and down a NodeList by number of steps
   NodeList.advance(number)
   NodeList.rewind(number)
   NodeList.currentData() (1ms)
✓ test of
   NodeList.insertAfter(Node)
   NodeList.insertBefore(Node)
   NodeList.current() (1ms)
✓ test of
   NodeList.append(data)
   NodeList.length()
   NodeList.insert(nodal.backwards)()
   NodeList.insert(nodal.insertAfter)()
   NodeList.insert(nodal.insertBefore)()
✓ test of
   DoubleNodal.(not_valid_tests)
   NodeList.insert(insert.forward)
   NodeList.insert(insert.backward)
   NodeList.current() (7ms)
✓ test of
   Games with nodal deletion
   NodeList.unlink(named_nodes)
   NodeList.seekByValue(value:any) (33ms)
Node Assemblies
  ✓ constructing valid nodal w/ small talk and inserting to front (6ms)
  ✓ test using Fibonacci series
   [Externally Transformed] series proof of:
   NodeList.getFirst()
   NodeList.insert()
(8ms)
  ✓ test using Fibonacci series
   [Internally Transformed with NodeList.apply(Function)]
   NodeList.apply()  (2ms)
  ✓ test of simple initalizing all nodes with a values
   [Internally Transformed with NodeList.apply( number | boolen | string | object )]
(4ms)
*/

describe('Node Assemblies', () => {


  it('constructing valid nodal w/ small talk and inserting to front', () => {
    let runit       = new runner();
    expect( runit.createSingleStaticNode() ).toEqual('new node for insertion');
  });

  it('test using Fibonacci series'+
  '\n     [Externally Transformed] series proof of: '+
  '\n     NodeList.getFirst() '+
  '\n     NodeList.insert() \n ', ()=>{

    let transformer = new transforms();
    let list = transformer.fibonacciFromIntNodes();
    // console.log(list.display().join(','));

    //@NOTE Foward
    let current = list.getFirst();
    let pi = 0;
    while(current){
      let dp = current.data;
      let predicted = predict[pi];
      // console.log(`result: ${dp} predicted: ${predicted}`);
      expect(dp).toEqual(predicted);

      current = current.next;
      pi++;
    }

    //@NOTE baskward
    current = list.getLast();
    //one more Fabonacci than was need in initiation
    // @NOTE may need to fix the internal pointer for _len
    pi = list.length() - 1;
    while(current){
      let dp = current.data;
      let predicted = predict[pi];
      // console.log(`result: ${dp} predicted: ${predicted}`);
      expect(dp).toEqual(predicted);

      current = current.previous;
      pi--;
    }
;
  });

  it('test using Fibonacci series'+
  '\n     [Internally Transformed with NodeList.apply(Function)] '+
  '\n     NodeList.apply() ', ()=>{
    let transformer = new transforms();
    let runit       = new runner();

    // next provide internal transform by passing a transformer
    let startList = runit.createIntNodesList(1,1,20);
    let list = startList.apply(Fibonacci.Transformer);

    // forward
    let current = list.getFirst();
    let pi = 0;
    while(current){

      let dp = current.data;
      let predicted = predict[pi];
      // console.log(`result: ${dp} predicted: ${predicted}`);
      expect(dp).toEqual(predicted);
      current = current.next;
      pi++;
    }

    // backward
    current = list.getLast();
    //one more Fabonacci than was need in initiation
    pi = list.length()-1;
    while(current){

      let dp = current.data;
      let predicted = predict[pi];
      // console.log(`result: ${dp} predicted: ${predicted}`);
      expect(dp).toEqual(predicted);

      current = current.next;
      pi--;
    }
  });

  //@NOTE Transforms
  it('test of simple initalizing all nodes with a values '+
  '\n     [Internally Transformed with NodeList.apply( number | boolen | string | object )] '+
  '\n', () => {

    let runit= new runner();
    let list = runit.createIntNodesList(0,1,20);

    let current = list.getFirst();
    let pi = 0;

    while(current){
      let dp = current.data;

      // console.log(`Data: ${typeof dp} ${dp} Interator: ${typeof pi} ${pi}`);

      expect(dp).toEqual(pi);
      pi++;
      current = current.next;
    }

    let types:Object = {
      null: null,
      number: 25,
      string: 'initializer',
      boolean: true,
      object: {key: 'value', number: 25}
    }

    let keys = Object.keys(types);

    while(keys.length > 0){
      let key = keys.pop();
      let value = types[key];

      // console.log(`key: ${key} value: ${types[key]}`);
      // console.log(`NodeList.apply ( ${types[key]}: ${key})`);

      current = list.getFirst();
      list.apply(types[key]);
      delete keys[key];
    }

    //forward
    while(current){
      let dp = current.data;
      let key = typeof dp;
      let value = types[key];

      if(/(object|null)/.test(key)){
        expect(dp).toEqual(null);
      }else if(/(object|null)/.test(key)){
        expect(dp.number).toEqual(25);
      }else{
        expect(dp).toEqual(value);
      }
      current = current.next;
    }

    //backward
    current = list.getLast();
    while(current){
      let dp = current.data;
      let key = typeof dp;
      let value = types[key];

      //@lazy I know... but on thing at a time
      if(/(object|null)/.test(key)){
        expect(dp).toEqual(null);
      }else if(/(object|null)/.test(key)){
        expect(dp.number).toEqual(25);
      }else{
        expect(dp).toEqual(value);
      }
      current = current.previous;
    }

  });

});

//@NOTE Node midway references
it('test of moving up and down a NodeList by number of steps '+
'\n     NodeList.advance(number)'+
'\n     NodeList.rewind(number)'+
'\n     NodeList.currentData()', () => {

  let runit  = new runner();

  //create list and then Let Fibonacci teach it some math
  let startList = runit.createIntNodesList(1,1,20);
  let list = startList.apply(Fibonacci.Transformer);
  let pinpoint:Node;

  list = new NodeList();
  let wordlist = words.forEach((word) => {
    list.appendData(word);
  });

  let report = null;
  let iterate = run_length;

  while(iterate > 0){
    //randmom from remaining keys
    let pick = Math.floor(Math.random()*words.length);
    //key of named to remove from NodeList
    let select = words[pick];
    let word = words[pick]
    let line = `pick: ${pick} key: ${ select ? select : 'null select'} \n`;
    report += line;

    pinpoint = list.advance(pick+1);
    expect(pinpoint.data).toEqual(word);
    pinpoint = list.rewind(pick+1);

    let backtick =  words.length - pick;
    word = words[backtick-1];
    expect(pinpoint.data).toEqual(word);

    // if(pinpoint)
    // console.log(`${backtick}: ${word} ?= ${pinpoint.data} `);

    iterate--;
  }
  // console.log(report);

});

// @NOTE Node midway references
it('test of  '+
'\n     NodeList.insertNewAfter(Node)'+
'\n     NodeList.insertNewBefore(Node)'+
'\n     NodeList.current()', () => {

  //create list and then Let Fibonacci teach it some math
  let transformer = new transforms();
  let list        = transformer.fibonacciFromIntNodes();

  let iterate = [
    {
      method: list.insertNewAfter,
      left: [610,377,233],
      right: [987,1597,2584],
    },
    {
      method: list.insertNewBefore,
      left: [377,233,144],
      right: [610,'random insert',987],
    },
  ];

  for(let step in iterate){

    //resets pointer to start of op
    let current =list.advance(15);
    //resets pointer to new node

    let nn:DSNode.Node = new Node('random insert');
    let inserted = iterate[step].method( nn , current);
    // console.log(inserted);

    // console.log(list.display().join(','));

    //testing current and inserted values where current === inserted
    let select = inserted;
    let left_step = iterate[step].left;
    expect( inserted.data ).toEqual('random insert');
    for(let l_ in left_step){
      select = select.previous;
      // console.log(`node v: ${select.data} test v: ${left_step[l_]}`);
      expect(select.data).toEqual(left_step[l_]);
    }

    select = inserted;
    let right_step = iterate[step].right;
    expect( inserted.data ).toEqual('random insert');
    for(let r_ in right_step){
      select = select.next;
      // console.log(`node v: ${select.data} test v: ${right_step[r_]}`);
      expect(select.data).toEqual(right_step[r_]);
    }
  }


});

it('test of  '+
'\n     NodeList.append(data)'+
'\n     NodeList.length()' +
'\n     NodeList.insert(nodal.backwards)()' +
'\n     NodeList.insert(nodal.insertAfter)()' +
'\n     NodeList.insert(nodal.insertBefore)()', () => {

  let runit = new runner();
  let list = runit.appentIntsToList(0,1,run_length);
  // console.log(list);
  let current = list.getFirst();
  while(current){
    // console.log(current);
    current = current.next;
  }
  let len = list.length();
  // console.log(len);

});


it('test of  '+
'\n     DoubleNodal.(not_valid_tests)'+
'\n     NodeList.insert(insert.forward)'+
'\n     NodeList.insert(insert.backward)'+
'\n     NodeList.current()'+
''
, () => {
  let transform = new transforms();

  let list = new NodeList();
  let noder = new DoubleNodal(null, null, DoubleNodal.direction.backward);
  if(noder.isValid()){
    list.appendData(noder.get());
  }
  // console.log(noder.getMessage());
  expect(noder.getMessage()).toEqual('nodal protocol missing at least one valid Node');

  list = transform.fibonacciFromIntNodes(20);
  let ipoint = list.rewind(15);

  noder = new DoubleNodal(new Node('inserted'), ipoint, DoubleNodal.direction.backward);
  if(noder.isValid()){
    let ip = list.insert( noder.get() );
    expect(ip.next.data).toEqual(8);
    expect(ip.previous.data).toEqual(5);
    expect(list.current().current.data).toEqual('inserted');
  }
  // console.log(list.display().join(', '));

  noder = new DoubleNodal(new Node('inserted'), ipoint, DoubleNodal.direction.forward);
  if(noder.isValid()){
    let ip = list.insert( noder.get() );
    expect(ip.next.data).toEqual(13);
    expect(ip.next.next.data).toEqual(21);
    expect(ip.previous.data).toEqual(8);
    expect(ip.previous.previous.data).toEqual('inserted');
    expect(list.current().current.data).toEqual('inserted');
  }
  // console.log(list.display().join(', '));

  list = new NodeList('first');
  expect(list.getFirst().data).toEqual('first');
  // console.log(list.display().join(', '));
  //@TODO wrap these in while and
  //@TODO use node.next and node.previous for a more robust test
  let ip = list.appendData('second');
  expect(ip.data).toEqual('second');
  expect(ip.previous.data).toEqual('first');
  expect(list.current().current.data).toEqual('second');
  //save ref for latter
  let second = ip;
  // console.log(list.current().current.data);
  // console.log(list.display().join(', '));

  ip = list.appendData('third');
  expect(ip.data).toEqual('third');
  expect(ip.previous.data).toEqual('second');
  // console.log(list.current().current.data);

  ip=list.appendData('fourth');
  expect(ip.data).toEqual('fourth');
  expect(ip.previous.data).toEqual('third');
  // console.log(list.current().current.data);
  // console.log(list.display().join(', '));

  expect(list.current().first.data).toEqual('first');
  expect(list.current().last.data).toEqual('fourth');
  expect(list.current().current.data).toEqual('fourth');

  expect(list.current().current.data).toEqual('fourth');
  expect(list.current().first.data).toEqual('first');
  expect(list.current().last.data).toEqual('fourth');


  //test for some ramdoms that sometimes get missed
  //@NOTE for currentData() and current() calls
  expect(list.current().current.data).toEqual('fourth');
  expect(list.current().first.data).toEqual('first');
  expect(list.current().last.data).toEqual('fourth');

  // console.log(list.display().join(', '));

  // console.log(list.current().first.data);
  // console.log(list.current().last.data);
  // console.log(list.current().current.data);
});


it('test of  '+
'\n     Games with nodal deletion'+
'\n     NodeList.unlink(named_nodes)'+
'\n     NodeList.seekByValue(value:any)'+
''
, () => {

  let transformer = new transforms();
  let list = new NodeList();
  let named = {};

  let make = () => {['first','second','third','fourth','fifth','sixth','seventh','eighth', 'ninth','tenth'].forEach((item)=>{
      named[item] = list.appendData(item);
    });
  }
  make();

  let report = '';
  let current = list.getFirst();
  let keys = Object.keys(named);
  while(list.length() > 0){
    //randmom from remaining keys
    let pick = Math.floor(Math.random()*keys.length);
    //key of named to remove from NodeList
    let select = named[keys[pick]];
    let line = `pick: ${pick} key: ${ select ? select.data : 'null select'} \n`;
    report += line;

    //unlink the named[key];
    let value = list.unlink(select);
    line = `${value} removed from list\n ${list.display().join(', ')}\n\n`;
    report += line;

    keys.splice(pick,1);
  }

  console.log(`Delete Report: '
  '\n this is best done with eyeballs'
  '\n no faiures is a good indication that things work'
  '\n ${report}`);

  make();
  console.log(list.display().join(', '));

  current = list.getFirst();
  keys = Object.keys(named);
  named = {};
  while(keys.length > 0){
    //randmom from remaining keys
    let pick = Math.floor(Math.random()*keys.length);
    //key of named to remove from NodeList
    let select = named[keys[pick]];
    let line = `pick: ${pick} key: ${ select ? select.data : 'null select'} \n`;
    report += line;

    //unlink the named[key];
    let node = list.seekByValue(keys[pick]);
    line = `For ${keys[pick]}: ${node.data} found in list ${keys[pick] === node.data}\n \n\n`;

    expect(keys[pick]).toEqual(node.data);

    //seeking by Object | Node will fail at this time
    try{
      node = list.seekByValue(node);
    }catch(e){
      expect('failed').toEqual('failed');
    }

    node = list.seekByValue('something made up');
    expect(node).toEqual(null);

    report += line;

    keys.splice(pick,1);
  }
  console.log(list);
});

export class transforms{

  public fibonacciFromIntNodes = (length?:number) => {
    let runfor = length ? length : run_length;

    let transformer = Fibonacci.Transformer;
    let runit   = new runner();
    let list    = runit.createIntNodesList(1,1,runfor)
    let current = list.getFirst();

    while(current){
      transformer(current);
      current = current.next;
    }

    return list;
  }

}

export class runner{

  protected list: NodeList;

  public createIntNodesList(start:number, step:number, end:number, direction?:boolean){
    this.list = new NodeList();

    direction = direction ? direction : DoubleNodal.direction.forward;

    let i = start;
    do{
      // console.log(i);
      //working out the use cases for nodal validations
      //@TODO refactor .. get validatedNodal to Librarian
      //@TODO and find a better use case for validations of Nodes / Provide Pacakage mechanisms
      let noder = new DoubleNodal(new Node(i), null, direction);
      if(noder.isValid()){
        this.list.insert(noder.get());
      }
      // this.list.append(i);
    }
    while((i++ < end));

    return this.list

  }

  public createSingleStaticNode = () => {
    let newNode = new Node('new node for insertion');
    //@REVIEW since LLs are about speed in writes
    // -cost of mistake versus cost of validation must be weighed out
    // * that said here is the pattern for validated nodals that work
    // * with this LL Lib where nodal can be thought of as a validated protocol
    let nodal = new DoubleNodal(newNode, null, null);
    let nodeList:NodeList;

    if(nodal.isValid()){
      nodeList = new NodeList();
      nodeList.appendData(nodal.get());
    }
    return newNode.data
  }

  public appentIntsToList(start:number, step:number, end:number){
    this.list = new NodeList();
    let i = start;
    do{
      this.list.appendData(i);
    }
    while((i++ < end))
    return this.list

  }
}
