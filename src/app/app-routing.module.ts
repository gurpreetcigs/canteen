import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { AccountingComponent } from './accounting/accounting.component';
import { TransactionComponent } from './transaction/transaction.component';
import { DashboardComponent } from './dashboard/dashboard.component';
const routes: Routes  = [
  { path:'', redirectTo:'/dashboard', pathMatch:'full'},
  { path:'account', component: AccountingComponent},
  { path:'transaction', component: TransactionComponent},
  { path:'dashboard', component: DashboardComponent},
];

@NgModule({
  exports : [ RouterModule ],
  imports : [ RouterModule.forRoot(routes)]
})
export class AppRoutingModule{

}
