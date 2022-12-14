import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import Web3 from 'web3';

declare let window: any;

@Injectable({
    providedIn: 'root'
})
export class Web3Service {

    private _web3: BehaviorSubject<Web3> = new BehaviorSubject<Web3>(null);
    private _provider: BehaviorSubject<'localGanache' | 'Metamask'> = new BehaviorSubject(null);
    private _ganacheUIURL: string = 'http://127.0.0.1:7545';

    constructor() {
    }

    web3$(): Observable<Web3> {
        return this._web3.asObservable();
    }


    provider$(): Observable<'localGanache' | 'Metamask'> {
        return this._provider.asObservable();
    }

    initWeb3(): Observable<boolean> {
        return new Observable<boolean>((subscriber) => {
            if (typeof window.ethereum !== 'undefined') {
                window.ethereum.request({method: 'eth_requestAccounts'});
                console.log('METAMASK activated');
                const web3 = new Web3(window.ethereum);
                this._web3.next(web3);
                this._provider.next('Metamask');
            } else {
                console.log('GANACHE activated');
                const web3 = new Web3(new Web3.providers.HttpProvider(this._ganacheUIURL));
                this._web3.next(web3);
                this._provider.next('localGanache');
            }
            subscriber.next(true);
            subscriber.complete();
        });
    }

}
