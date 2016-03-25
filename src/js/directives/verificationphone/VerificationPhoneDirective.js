import {DirectiveModule} from '../../module';
require('./verificationphone.directive.scss')
import AjaxService from '../../services/AjaxService';

let weak1 = new WeakMap(),
    temp1 = {},
    weak2 = new WeakMap(),
    temp2 = {};

class VerificationPhoneDirective{
    constructor(AjaxService , $timeout){
        this.restrict = 'AE';
        this.transclude = true;
        this.replace = true;
        this.controller = ['$scope' , function($scope){
            let AjaxService = weak1.get(temp1),
                $timeout = weak2.get(temp2),
                timer = null,
                mobileRE = /^1[23456789]\d{9}$/,
                codeRE = /^\d{6}$/;

            $scope.sendBtnT = '发送验证码';
            $scope.errorT = '';
            // 获取验证码
            $scope.getCode = function(mobile){

                $scope.errorT = '';

                if ($scope.sendBtnT != '发送验证码') return;

                if (!mobileRE.test(mobile)) {
                    $scope.errorT = '手机号不正确';
                    return;
                }
                AjaxService.ajax('get' , '/#code' , {mobile: mobile}).then((data) => {
                    $scope.sendBtnT = 10;
                    downCount();
                })
            }

            // 提交
            $scope.submitFN = function(mobile , code){
                $scope.errorT = '';

                if (!mobileRE.test(mobile)) {
                    $scope.errorT = '手机号不正确';
                } else if (!codeRE.test(code)) {
                    $scope.errorT = '验证码不正确';
                } else {

                    $scope.vm.subFN(mobile , code);
                }
            }
            // 倒计时
            function downCount(){

                $scope.sendBtnT -= 1;

                timer = $timeout(function(){

                    if ($scope.sendBtnT == 1) {
                        $scope.sendBtnT = '发送验证码';

                    } else {
                        downCount();
                    }
                } , 1000)
            }

            $scope.$on('$destroy',function() {
                $timeout.cancel(timer);
            })
        }];
        this.templateUrl = './templates/directives/verificationphone/verificationphone.directive.html';
        weak1.set(temp1 , AjaxService);
        weak2.set(temp2 , $timeout);
    }


    static verificationphone(AjaxService , $timeout){
        return new VerificationPhoneDirective(AjaxService , $timeout);
    }
}
VerificationPhoneDirective.verificationphone.$inject = ['AjaxService' , '$timeout'];

export default DirectiveModule.directive('verificationphone' , VerificationPhoneDirective.verificationphone);