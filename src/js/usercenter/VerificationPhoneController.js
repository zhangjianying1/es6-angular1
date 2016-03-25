import {ControllerModule} from '../module';
import verificationphone from '../directives/verificationphone/VerificationPhoneDirective';
import AjaxService from '../services/AjaxService';
let weak = new WeakMap(),
    weak2 = new WeakMap();

class VerificationPhoneController{
    constructor(AjaxService , $state){
        weak.set(this , AjaxService);
        weak2.set(this , $state);

    }
    subFN(mobile , code){
        let ajaxService = weak.get(this),
            $state = weak2.get(this);

        ajaxService.ajax('get' , '/' , {mobile: mobile , code: code}).then((data) => {
            // 返回个人中心
            $state.go('usercenter');
        })
    }

}

VerificationPhoneController.$inject = ['AjaxService' , '$state'];

export default ControllerModule.controller('VerificationPhoneController' , VerificationPhoneController);