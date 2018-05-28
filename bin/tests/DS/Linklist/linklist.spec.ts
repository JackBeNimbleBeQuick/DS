import {Node} from 'DS/Linklist/Node';
import {NodeList} from 'DS/Linklist/NodeList';
import {DoubleNodal} from 'DS/Linklist/Validated/DoubleNodal';
import {Fibonacci} from 'DS/Librarian/Transforms/Linklist/Fibonacci';

const predict = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765];

/*
@TODO Tests
  Quick todo ticks before adding converage packages
  .valid NodeList constructions
    √.empty has all null node pointers
    .fastForward inserts first node with data

    .valid insertions
      √.insert after
      .insert before

    .accessors
      √.first node on chain
      .last node on chain

    .Transforms
      √.apply function
      √.apply literals

    going backward tests
      ... add checks
    chain breaking tests
      ... add checks

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
'\n     NodeList.stepForwardTo(number)'+
'\n     NodeList.stepBackTo(number)'+
'\n     NodeList.currentData()', () => {

  let runit  = new runner();

  //create list and then Let Fibonacci teach it some math
  let startList = runit.createIntNodesList(1,1,20);
  let list = startList.apply(Fibonacci.Transformer);
  let pinpoint:Node;

  //we will go five nodes forward from start and predict outcome

  pinpoint = list.stepForwardTo(5);
  expect(pinpoint.data).toEqual(5);

  pinpoint = list.stepForwardTo(9);
  expect(pinpoint.data).toEqual(34);

  pinpoint = list.stepForwardTo(15);
  expect(pinpoint.data).toEqual(610);

  pinpoint = list.stepBackTo(5);
  expect(pinpoint.data).toEqual(987);

  pinpoint = list.stepBackTo(9);
  expect(pinpoint.data).toEqual(144);

  pinpoint = list.stepBackTo(15);
  expect(pinpoint.data).toEqual(8);

});

// @NOTE Node midway references
it('test of  '+
'\n     NodeList.insertAfter(Node)'+
'\n     NodeList.insertBefore(Node)'+
'\n     NodeList.current()', () => {

  //create list and then Let Fibonacci teach it some math
  let transformer = new transforms();
  let list = transformer.fibonacciFromIntNodes();

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
    let current =list.stepForwardTo(15);
    //resets pointer to new node

    let nn:Node = new Node('random insert');
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
  let list = runit.appentIntsToList(0,1,20);
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

  list = transform.fibonacciFromIntNodes();
  let ipoint = list.stepBackTo(15);

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

  let ip = list.appendData('second');
  expect(ip.data).toEqual('second');
  expect(ip.previous.data).toEqual('first');
  expect(list.current().current.data).toEqual('second');
  expect(list.currentData().current).toEqual('second');
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

  expect(list.currentData().first).toEqual('first');
  expect(list.currentData().last).toEqual('fourth');
  expect(list.currentData().current).toEqual('fourth');
  console.log(list.display().join(', '));
  // console.log(list.current().first.data);
  // console.log(list.current().last.data);
  // console.log(list.current().current.data);
});

export class transforms{

  public fibonacciFromIntNodes = () => {

    let transformer = Fibonacci.Transformer;
    let runit   = new runner();
    let list    = runit.createIntNodesList(1,1,20)
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
