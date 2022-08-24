import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

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
            subscriber.next(true);
            subscriber.complete();
        });
    }

}
