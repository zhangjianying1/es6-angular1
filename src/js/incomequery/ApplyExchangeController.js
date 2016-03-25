import {ControllerModule} from '../module';

import exchange from './ExchangeDirective';

class ApplyExchangeController{
    constructor(){
        this.couponPrice = [{className: false, price: 200} , {className: false , price: 1000} , {className: false , price: 5000}];
        this.couponCount = '';
    }
}
export default ControllerModule.controller('ApplyExchangeController' , ApplyExchangeController);