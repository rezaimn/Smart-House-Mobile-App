import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    Renderer,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import {IonicPage, Tabs} from 'ionic-angular';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {EventsHandlerService} from "../../utils/services/events-handler.service";
import {Router} from "@angular/router";
import {LocalDataService} from "../../utils/services/local-data.service";

@IonicPage()
@Component({
    selector: 'circular-tabs',
    templateUrl: 'circular-tabs.html',
    host: {
        '(document:click)': 'onClick($event)',
    },
    animations: [
        trigger('menu', [
            state('open', style({
                transform: 'scale(1)',
                opacity: '1'
            })),
            state('close', style({
                transform: 'scale(0.3)',
                opacity: '0'
            })),
            transition('close => open', animate('3800ms ease-in')),
            transition('open => close', animate('3800ms ease-out'))
        ])
    ]
})

export class CircularTabs implements OnChanges, AfterViewInit, OnInit {
    /**
     * @ignore
     */
    @ViewChild('list') listRef: ElementRef;
    /**
     * @ignore
     */
    @ViewChild('menuButton') menuButtonRef: ElementRef;
    /**
     * @ignore
     */
    @Input() tabRef: Tabs;
    /**
     * @ignore
     */
    @Input() totalAngle: number = 180;
    /**
     * @ignore
     */
    @Input() gapAngle: number = 2;
    /**
     * @ignore
     */
    @Input() startAngle: number = -1;
    /**
     * @ignore
     */
    @Input() closeOnTabSelection: boolean = true;
    /**
     * @ignore
     */
    @Input() closeOnBlur: boolean = true;
    /**
     * @ignore
     */
    @Input() closedBtnText: string = "";
    /**
     * @ignore
     */
    @Input() openedBtnText: string = "";
    /**
     * @ignore
     */
    @Input() closedBtnIconName: string = "";
    /**
     * @ignore
     */
    @Input() openedBtnIconName: string = "";
    /**
     * @ignore
     */
    isNavOpened: boolean = true;
    /**
     * @ignore
     */
    positionXLock: boolean = false;
    /**
     * @ignore
     */
    positionYLock: boolean = false;
    /**
     * @ignore
     */
    homeIsSelected = true;

    constructor(
        public elemRef: ElementRef,
        public renderer: Renderer,
        private eventsHandlerService: EventsHandlerService,
        private router: Router,
        public localData: LocalDataService,
    ) {

    }
    /**
     * deselect all tabs
     */
    ngOnInit() {

        for (let tab of this.tabRef._tabs) {
            tab._isEnabled = false;
        }
    }
    /**
     * @ignore
     */
    ngOnChanges(changes: SimpleChanges) {
        // if (changes['positionLock'].currentValue != changes['positionLock'].previousValue) { }
        this.styleMenu();

        this.logSettings();

    }
    /**
     * @ignore
     */
    ngAfterViewInit() {
        this.tabRef._tabbar.nativeElement.hidden = true;
        setTimeout(() => {
            if (this.positionXLock) {
                this.lockElemPositionX();
            }
            if (this.positionYLock) {
                this.lockElemPositionY();
            }
        }, 2000);

        this.styleMenu();
    }
    /**
     * @ignore
     */
    lockElemPositionY() {
        let top = window.getComputedStyle(this.elemRef.nativeElement, null).getPropertyValue("top");
        this.renderer.setElementStyle(this.elemRef.nativeElement, 'top', top);
    }
    /**
     * @ignore
     */
    lockElemPositionX() {
        let left = window.getComputedStyle(this.elemRef.nativeElement, null).getPropertyValue("left");
        this.renderer.setElementStyle(this.elemRef.nativeElement, 'left', left)

    }
    /**
     * if home button selected
     */
    homeSelected() {

        this.homeIsSelected = true;
        for (let tab of this.tabRef._tabs) {
            tab.setSelected(false);
        }
        this.closeNav();
        this.router.navigateByUrl('home');

    }
    /**
     * change the selected tab
     */
    selectTab(tabIndex, tab) {
        this.homeIsSelected = false;
        this.tabRef.selectedIndex = tabIndex;
        this.changeTab();
        if (this.closeOnTabSelection) {
            this.toggleNav();
        }
        this.closeNav();
        this.router.navigateByUrl(tab.tabIcon);

    }
    /**
     * @ignore
     */
    changeTab() {
        // this.tabRef.select(this.tabRef.selectedIndex);

    }
    /**
     * toggle the tab menu
     */
    toggleNav() {
        this.isNavOpened ? this.closeNav() : this.openNav();
    }
    /**
     * close the circular tab
     */
    closeNav() {
        this.eventsHandlerService.circularTabsHide.emit(true);
        console.log('navclosed');

    }
    /**
     * set circular tab as opened
     */
    openNav() {
        this.isNavOpened = true;
        console.log('navopened');

    }
    /**
     * set styles for the circular menu
     */
    styleMenu() {

        let numofTabs = this.tabRef._tabs.length;
        let centralAngel = (this.totalAngle / numofTabs) - (((numofTabs) * this.gapAngle) / numofTabs);
        let startAngle = this.startAngle >= 0 ? this.startAngle : ((180 - this.totalAngle) / 2);
        for (var i = 0; i < this.tabRef._tabs.length; i++) {
            if (typeof (this.listRef.nativeElement.children[i]) != 'undefined' && this.listRef.nativeElement.children[i] != null) {
                //li
                //   this.renderer2.removeClass(this.listRef.nativeElement.children[i].children[0],'selected');
                this.renderer.setElementStyle(this.listRef.nativeElement.children[i], "transform", "rotate(" + ((i * centralAngel) + startAngle + (i * this.gapAngle)) + "deg) skew(" + (90 - centralAngel) + "deg)");
                //a
                this.renderer.setElementStyle(this.listRef.nativeElement.children[i].children[0], 'color', 'rgba(255,255,255,1)');
                this.renderer.setElementStyle(this.listRef.nativeElement.children[i].children[0], 'background', "radial-gradient(transparent 35%, " + "rgba(255,255,255,0.4)" + " 35%)");
                this.renderer.setElementStyle(this.listRef.nativeElement.children[i].children[0], 'transform', "skew(" + ((90 - centralAngel) * -1) + "deg) rotate(" + ((centralAngel / 2) - 90) + "deg)");
            }
        }

        // button
        // this.renderer.setElementStyle(this.menuButtonRef.nativeElement, 'background-color', tabbar_bgColor);
    }
    /**
     * reroute the app to selected tab
     */
    onClick(event) {
        if (this.closeOnBlur) {
            // check if clicked outside this element
            if (!this.elemRef.nativeElement.contains(event.target)) {
                //this.closeNav();
            }
        }
    }
    /**
     * @ignore
     */
    logSettings() {
        console.log('CircularTab Settings:');
        console.log('totalAngle: ' + this.totalAngle);
        console.log('gapAngle: ' + this.gapAngle);
        console.log('startAngle: ' + this.startAngle);
        console.log('closeOnTabSelection: ' + this.closeOnTabSelection);
        console.log('closeOnBlur: ' + this.closeOnBlur);
        console.log('closedBtnText: ' + this.closedBtnText);
        console.log('openedBtnText: ' + this.openedBtnText);
        console.log('closedBtnIconName: ' + this.closedBtnIconName);
        console.log('openedBtnIconName: ' + this.openedBtnIconName);
    }

}
