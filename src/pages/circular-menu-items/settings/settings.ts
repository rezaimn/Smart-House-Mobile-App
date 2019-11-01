import {Component, OnInit} from '@angular/core';
import {IonicPage} from "ionic-angular";
import {CommonFunctionsService} from "../../../utils/services/commonFunctions.service";
import {LocalDataService} from "../../../utils/services/local-data.service";
import {AuthorizationService} from "../../../utils/services/authorization.service";
import {NativeStorage} from "@ionic-native/native-storage";

@IonicPage()
@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html',
})
export class Settings implements OnInit{
    /**
     * @ignore
     */
    selectedCard = 'language';
    /**
     * @ignore
     */
    selectedCardClosed = false;
    /**
     * @ignore
     */
    profileEditMode=false;
    /**
     * @ignore
     */
    userProfileTemp;
    /**
     * @ignore
     */
    sendEmail=false;
    /**
     * @ignore
     */
    sendSMS=false;
    /**
     * @ignore
     */
    constructor(
        public commonFunctions: CommonFunctionsService,
        public localData: LocalDataService,
        private authService:AuthorizationService,
        private nativeStorage:NativeStorage
    ) {
        this.userProfileTemp={...this.localData.accountData};
    }
    /**
     * @ignore
     */
    ngOnInit(){
        this.nativeStorage.getItem("sendEmail").then(
            (data)=>{
                this.sendEmail=data;
            },
            (error)=>{

            }
        );
        this.nativeStorage.getItem("sendSMS").then(
            (data)=>{
                this.sendSMS=data;
            },
        );

    }
    /**
     * change Current Edge
     */
    changeCurrentEdge(event){

        for(let edge of this.localData.accountData.edges){
            if(edge.serialNumber==event){
                this.localData.selectedEdge=edge;
            }
        }
    }
    /**
     * card Selection
     */
    cardSelection(card) {
        if (card != this.selectedCard) {
            this.selectedCardClosed = false;
        } else {
            this.selectedCardClosed = !this.selectedCardClosed;
        }
        this.selectedCard = card;
    }
    /**
     * toggle Card
     */
    toggleCard(card) {
        if (card == this.selectedCard) {
            return this.commonFunctions.toggleCardBody(this.selectedCardClosed);
        } else {
            return this.commonFunctions.toggleCardBody(true);
        }
    }
    /**
     * update User Profile
     */
    updateUserProfile(){
        let tempProfile={...this.localData.accountData};
        delete tempProfile.edges;
        this.authService.post('/aaa/user/save/json',tempProfile).subscribe(
            (res:any)=>{
                this.profileEditMode=false;
            }
        )
    }
    /**
     * cancel Update User
     */
    cancelUpdateUser(){
        this.localData.accountData={...this.userProfileTemp};
        this.profileEditMode=false;
    }
    /**
     * change Profile Edit Mode
     */
    changeProfileEditMode(mode){
        this.profileEditMode=mode;
    }
    /**
     * set Send Email for device status changes in local storage
     */
    setSendEmail(sendEmail){
        this.nativeStorage.setItem("sendEmail",!sendEmail);
    }
    /**
     * set Send SMS for device status changes in local storage
     */
    setSendSMS(sendSMS){
        this.nativeStorage.setItem("sendSMS",!sendSMS);
    }
}
