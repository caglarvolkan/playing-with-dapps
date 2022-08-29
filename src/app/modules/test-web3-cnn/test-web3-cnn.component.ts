import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Web3Service} from '../../core/web3/web3.service';
import {Subject, takeUntil} from 'rxjs';
import Web3 from 'web3';
import {FuseAlertType} from '../../../@fuse/components/alert';
import {fuseAnimations} from '../../../@fuse/animations';

@Component({
    selector: 'test-web3-cnn',
    templateUrl: './test-web3-cnn.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class TestWeb3CnnComponent implements OnInit, OnDestroy {
    loading: boolean = true;
    checkingAddress: string;
    transactionCount: number;
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    showAlert: boolean = false;

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
        this.loading = true;
        try {
            this._web3.eth.getTransactionCount(this.checkingAddress)
                .then((value) => {
                    this.transactionCount = value;
                    this.alert = {
                        type: 'info',
                        message: `Web3 connection has been successfully achieved. The trxCount : ${this.transactionCount}`
                    };
                })
                .catch((reason) => {
                    this.showAlert = true;
                    this.alert = {
                        type: 'error',
                        message: reason
                    };
                })
                .finally(() => {
                    this.loading = false;
                    this.showAlert = true;
                });
        } catch (error) {
            this.alert = {
                type: 'error',
                message: error
            };
            this.loading = false;
            this.showAlert = true;
        }
    }

    closeAlert(): void {
        this.showAlert = false;
    }
}
