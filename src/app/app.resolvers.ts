import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {forkJoin, Observable} from 'rxjs';
import {Web3Service} from './core/web3/web3.service';

@Injectable({
    providedIn: 'root'
})
export class InitialDataResolver implements Resolve<any> {

    constructor(
        private _web3Service: Web3Service,
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        // Fork join multiple API endpoint calls to wait all of them to finish
        return forkJoin([
            this._web3Service.initWeb3(),
        ]);
    }
}
