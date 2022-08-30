import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {SharedModule} from 'app/shared/shared.module';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {TestScWriteGanacheComponent} from './test-sc-write-ganache.component';
import {testScWriteGanacheRoutes} from './test-sc-write-ganache.routing';
import {MatInputModule} from '@angular/material/input';
import {FuseAlertModule} from '../../../@fuse/components/alert';
import {FuseHighlightModule} from '@fuse/components/highlight';

@NgModule({
    declarations: [
        TestScWriteGanacheComponent
    ],
    imports: [
        RouterModule.forChild(testScWriteGanacheRoutes),
        MatButtonModule,
        MatIconModule,
        SharedModule,
        MatProgressBarModule,
        MatInputModule,
        FuseAlertModule,
        FuseHighlightModule
    ]
})
export class TestScWriteGanacheModule {
}
