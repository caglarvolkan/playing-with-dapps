import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import Web3 from 'web3';

@Injectable({
    providedIn: 'root'
})
export class Web3Service {

    private _web3: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private _url: string = 'http://127.0.0.1:7545';


    constructor() {
    }

    web3$(): Observable<boolean> {
        return this._web3.asObservable();
    }

    initWeb3(): Observable<boolean> {
        return new Observable<boolean>((subscriber) => {
            const web3 = new Web3(new Web3.providers.HttpProvider(this._url));
            web3.eth.getTransactionCount('0xc20297223c888Bb2F862a346362141861Bd9dAC8').then(console.log);
            subscriber.next(true);
            subscriber.complete();
        });
    }

}
