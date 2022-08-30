import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import Web3 from 'web3';

declare let window: any;

@Injectable({
    providedIn: 'root'
})
export class Web3Service {

    private _web3: BehaviorSubject<Web3> = new BehaviorSubject<Web3>(null);
    private _ganacheUIURL: string = 'http://127.0.0.1:7545';

    constructor() {
    }

    web3$(): Observable<Web3> {
        return this._web3.asObservable();
    }

    initWeb3(): Observable<boolean> {
        return new Observable<boolean>((subscriber) => {
            // if (typeof window.ethereum !== 'undefined') {
            //     const web3 = new Web3(window.ethereum);
            //     this._web3.next(web3);
            // } else {
            //     const web3 = new Web3(new Web3.providers.HttpProvider(this._ganacheUIURL));
            //     this._web3.next(web3);
            // }
            const web3 = new Web3(new Web3.providers.HttpProvider(this._ganacheUIURL));
            this._web3.next(web3);
            subscriber.next(true);
            subscriber.complete();
        });
    }

}
