import { FormControl} from "@angular/forms";
/**
 * login model
 */
export class Login {
    public username:FormControl;
    public password:FormControl;
    public rememberMe:FormControl;
    constructor(data: any = {}) {
        this.username = data.username || new FormControl();
        this.password = data.password || new FormControl();
        this.rememberMe = data.rememberMe || new FormControl();
    }
}
/**
 * Reset Password model
 */
export class ResetPassword{
    public newPassword:FormControl;
    public confirmPassword:FormControl;
    public otpToken:string;
    constructor(data:any={}){
        this.newPassword=data.newPassword||new FormControl();
        this.confirmPassword=data.confirmPassword||new FormControl();
        this.otpToken=data.otpToken||'';
    }
}

