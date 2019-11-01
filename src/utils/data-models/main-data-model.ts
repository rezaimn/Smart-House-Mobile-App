
/**
 * Main Data Model
 */
export class MainDataModel {

    full:number;
    version:string;
    model:string;
    zwave_heal:number;
    temperature:string;
    skin:string;
    serial_number:string;
    fwd1:string;
    fwd2:string;
    mode:number;
    sections:any[];
    rooms:any[];
    scenes:any[];
    devices:any[];
    categories:any[];
    ir:number;
    irtx:string;
    loadtime:number;
    dataversion:number;
    state:number;
    comment:string;

  constructor(data:any={}){
    this.full=data.full||0;
    this.version=data.version||'';
    this.version=data.version||';'
    this.zwave_heal=data.zwave_heal||0;
    this.temperature=data.temperature||'';
    this.skin=data.skin||'';
    this.serial_number=data.serial_number||'';
    this.fwd1=data.fwd1||'';
    this.fwd2=data.fwd2||'';
    this.mode=data.mode||0;
    this.sections=data.sections||[];
    this.rooms=data.rooms||[];
    this.scenes=data.scenes||[];
    this.devices=data.devices||[];
    this.categories=data.categories||[];
    this.ir=data.ir||0;
    this.irtx=data.irtx||'';
    this.loadtime=data.loadtime||0;
    this.dataversion=data.dataversion||0;
    this.state=data.state||0;
    this.comment=data.comment||'';
  }
}
