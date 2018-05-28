export class Node implements Node{

  public next: Node | null;
  public previous: Node | null;
  public data: any;

  constructor (data:any){
    this.data = data;
  }

}
