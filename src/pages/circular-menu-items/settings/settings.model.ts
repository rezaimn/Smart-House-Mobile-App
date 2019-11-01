/**
 * User profile Model
 */
export class UserProfile {
    public username:string;
    public firstName:string;
    public lastName:string;
    public ssn: string;
    public mobileNumber:string;
    public email: string;
    edges: Edge[];
    constructor(data:any={}){
        this.username=data.username||'';
        this.firstName=data.firstName||'';
        this.lastName=data.lastName||'';
        this.ssn=data.ssn||'';
        this.mobileNumber=data.mobileNumber||'';
        this.email=data.email||'';
        this.edges=data.edges||new Edge({});
    }
}
/**
 * Edge Model
 */
export class Edge {
    public id:number;
    public ip:string;
    public name:string;
    public serialNumber:string;
    constructor(data:any={}){
        this.id=data.id||0;
        this.ip=data.ip||'';
        this.name=data.name||'';
        this.serialNumber=this.serialNumber||'';
    }
}