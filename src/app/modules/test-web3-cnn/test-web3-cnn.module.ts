import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {SharedModule} from 'app/shared/shared.module';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {TestWeb3CnnComponent} from './test-web3-cnn.component';
import {testWeb3CnnRoutes} from './test-web3-cnn.routing';
import {MatInputModule} from '@angular/material/input';
import {FuseAlertModule} from '../../../@fuse/components/alert';

@NgModule({
    declarations: [
        TestWeb3CnnComponent
    ],
    imports: [
        RouterModule.forChild(testWeb3CnnRoutes),
        MatButtonModule,
        MatIconModule,
        SharedModule,
        MatProgressBarModule,
        MatInputModule,
        FuseAlertModule
    ]
})
export class TestWeb3CnnModule {
}
