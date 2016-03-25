import {ControllerModule} from '../module';
require('./usercenter.controller.scss')
import switchbtn from '../directives/switch/SwitchBtn';

import verificationphone from '../directives/verificationphone/VerificationPhoneDirective';
import AjaxInterface from './AjaxInterface';

// 真实姓名设置
import userinformation from './UserInformationDirective'
let weak = new WeakMap();

class UserCenterController{
    constructor(AjaxInterface ){

        weak.set(this , AjaxInterface);

        // 获取用户信息
        AjaxInterface.getUserInformation({usercode: 3333} , (data) => {
            this.id = 3;
            this.bBtn = false;
            this.realName = 'fdf'
            this.mobile = '333';
        })
    }
    remind(){

        weak.get(this).remindHanlder({b:2} , function(data){
            console.log(33)
        });
    }
    subFN(name){
        console.log(name)
    }

}

UserCenterController.$inject = ['AjaxInterface'];
export default ControllerModule.controller('UserCenterController', UserCenterController);