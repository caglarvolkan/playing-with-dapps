import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Web3Service} from '../../core/web3/web3.service';
import {Subject, takeUntil} from 'rxjs';
import Web3 from 'web3';
import {FuseAlertType} from '../../../@fuse/components/alert';
import {fuseAnimations} from '../../../@fuse/animations';
import {AbiItem} from 'web3-utils';

@Component({
    selector: 'test-sc-write-ganache',
    templateUrl: './test-sc-write-ganache.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class TestScWriteGanacheComponent implements OnInit, OnDestroy {
    loading: boolean = true;
    fromAddress: string;
    contractAddress: string;
    messageToBeWritten: string;
    receiptJSON: any;
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

    async setMessageCharlieFromUI(): Promise<void> {
        if (!this.contractAddress || !this.messageToBeWritten || !this.fromAddress) {
            this.alert = {
                type: 'error',
                message: 'Please enter all the information including from address, contract address and message!!!'
            };
            this.showAlert = true;
            return;
        }

        this.loading = true;
        const abi: AbiItem[] = [
            {
                'constant': false,
                'inputs': [
                    {
                        'name': 'x',
                        'type': 'string'
                    }
                ],
                'name': 'setMessageCharlie',
                'outputs': [],
                'payable': false,
                'stateMutability': 'nonpayable',
                'type': 'function'
            },
            {
                'constant': true,
                'inputs': [],
                'name': 'getMessageCharlie',
                'outputs': [
                    {
                        'name': '',
                        'type': 'string'
                    }
                ],
                'payable': false,
                'stateMutability': 'view',
                'type': 'function'
            }
        ];
        try {
            const contract = new this._web3.eth.Contract(abi, this.contractAddress);
            contract.methods.setMessageCharlie(this.messageToBeWritten).send({from: this.fromAddress})
                .on('receipt', (receipt) => {
                    console.log(receipt);
                    this.alert = {
                        type: 'info',
                        message: 'Success '
                    };
                    this.receiptJSON = receipt;
                    this.loading = false;
                    this.showAlert = true;
                })
                .on('error', (error, receipt) => {
                    console.log('error');
                    console.error(error);
                    console.error(receipt);
                    this.alert = {
                        type: 'error',
                        message: error
                    };
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

    async getMessageCharlieFromUI(): Promise<void> {
        if (!this.contractAddress || !this.fromAddress) {
            this.alert = {
                type: 'error',
                message: 'Please enter all the information including from address and contract address!!!'
            };
            this.showAlert = true;
            return;
        }

        this.loading = true;
        const abi: AbiItem[] = [
            {
                'constant': false,
                'inputs': [
                    {
                        'name': 'x',
                        'type': 'string'
                    }
                ],
                'name': 'setMessageCharlie',
                'outputs': [],
                'payable': false,
                'stateMutability': 'nonpayable',
                'type': 'function'
            },
            {
                'constant': true,
                'inputs': [],
                'name': 'getMessageCharlie',
                'outputs': [
                    {
                        'name': '',
                        'type': 'string'
                    }
                ],
                'payable': false,
                'stateMutability': 'view',
                'type': 'function'
            }
        ];
        try {
            const contract = new this._web3.eth.Contract(abi, this.contractAddress);
            contract.methods.getMessageCharlie().call({from: this.fromAddress})
                .then((result) => {
                    console.log(result);
                    this.alert = {
                        type: 'info',
                        message: 'Success '
                    };
                    this.receiptJSON = result;
                    this.loading = false;
                    this.showAlert = true;
                })
                .error((error) => {
                    console.log('error');
                    console.error(error);
                    this.alert = {
                        type: 'error',
                        message: error
                    };
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
}
