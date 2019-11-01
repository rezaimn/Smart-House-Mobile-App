/**
 * @ignore
 */
export class Scenario {
    name: string;
    room=0;
    triggers_operator = "OR";
    groups: ScenarioGroup []=[];
    triggers: ScenarioTrigger[]=[]
    timers:ScenarioTimer[]=[];
    users:string;//// "2441932,2075611"
    modeStatus="";
    lua="";
    encoded_lua=0;
    active_on_any="0";
    id:number;
    constructor(data:any={}){
        this.name=data.name||'';
        this.groups.push(new ScenarioGroup({}));
        this.triggers=data.triggers||[];
        this.users=data.users||'';
        this.id=data.id||1000001;
    }
}
/**
 * @ignore
 */
export class ScenarioGroup {
    delay: number;
    actions: ScenarioGroupAction[];
    constructor(data:any={}){
        this.delay=data.delay||0;
        this.actions=data.actions||[];
    }
}
/**
 * @ignore
 */
export class ScenarioGroupAction {
    device: number;/////id
    service: string;
    action: string;
    arguments: ScenarioActionArgument[];
    constructor(data:any={}){
        this.device=data.device||-1;
        this.service=data.service||'';
        this.action=data.action||'';
        this.arguments=data.arguments||[];
    }
}
/**
 * @ignore
 */
export class ScenarioActionArgument {
    name: string;
    value: number;
    constructor(data:any={}){
        this.name=data.name||'';
        this.value=data.value||0;
    }
}
/**
 * @ignore
 */
export class ScenarioTrigger {
    name:string;
    enabled: number
    template:number;
    device:string;/////id
    arguments: ScenarioTriggerArgument[];
    constructor(data:any={}){
        this.name=data.name||'';
        this.enabled=data.enabled||0;
        this.template=data.template||0;
        this.device=data.device||'';
        this.arguments=data.arguments||[];
    }
}
/**
 * @ignore
 */
export class ScenarioTriggerArgument {
    id:string;
    value:string;///number
    constructor(data:any={}){
        this.id=data.id||'';
        this.value=data.value||'';
    }
}
/**
 * @ignore
 */
export class ScenarioTimer{
    public id=1;
    public enabled=1
    public type:number;

    public interval:any;////d/h/m/s

    /////////////////////daily

    public days_of_week:string;///'1,2,3'
    public time:string;////'18:15:0'
    ///////////////weekly

    ///////////////////////////monthly
    public days_of_month:string////'4,17,22'
    constructor(data:any={}){
        this.type=data.type||0;
        this.interval=data.interval||0;
        this.days_of_week=data.days_of_week||'';
        this.days_of_month=data.days_of_month||'';
        this.time=data.time||'00:00:00';
    }
}