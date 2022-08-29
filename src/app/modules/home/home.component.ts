import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Web3Service} from '../../core/web3/web3.service';
import {Subject, takeUntil} from 'rxjs';
import Web3 from 'web3';

@Component({
    selector: 'landing-home',
    templateUrl: './home.component.html',
    encapsulation: ViewEncapsulation.None
})
export class LandingHomeComponent implements OnInit, OnDestroy {
    loading: boolean = true;
    web3Connection: boolean = false;

    private _web3: Web3;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(private _web3Service: Web3Service) {
    }

    ngOnInit(): void {
        this._web3Service.web3$()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((web3) => {
                this._web3 = web3;
                this.loading = false;
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    async testWeb3Connection(): Promise<void> {
        const transactionCount = await this._web3.eth.getTransactionCount('0xBdcB143D2AF4B8bFBCc9E78C9f39E2C500235A4d');
        console.log(transactionCount);
    }
}
