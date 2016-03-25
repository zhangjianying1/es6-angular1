import {DirectiveModule} from '../module';
import DialogService from '../services/DialogService';
import AjaxService from '../services/AjaxService';
let weak = new WeakMap(),
    weak2 = new WeakMap(),
    weak3 = new WeakMap(),
    tempObj = {},
    tempObj2= {},
    tempObj3 = {};

class UserInformation{
    constructor(DialogService , AjaxService , $document){
        this.restrice = 'AE';
        this.replace = true;
        this.transclude = true;
        this.scope = {
            realName: '=realname'
        }
        this.template = '<div ng-transclude></div>';

        weak.set(tempObj , DialogService);
        weak.set(tempObj2 , AjaxService);
        weak.set(tempObj3 , $document);

    }
    link(scope , elem , attrs){

        scope.errorT = '';

        let Dialog = weak.get(tempObj),
            AjaxService = weak.get(tempObj2),
            $document = weak.get(tempObj3);

        elem.bind('click' , setRealName)
        // 设置实名信息
        function setRealName(){

            Dialog.confirm({
                key: 'SETREALNAMECONFRiM',
                data: {
                    title: '身份信息',
                    msg: '<dl class="modify-user"><dt><h3>请绑定<span class="c-red">实名信息</span></h3></dt>' +
                        '<dd class="input-box"><input class="small-input" ng-model="arg1" type="text" placeholder="姓名"/></dd>' +
                        '<dd class="input-box"><input class="small-input" type="text" ng-model="arg2" placeholder="身份证号码"/><span class="error c-red"></span></dd></dl>',

                },
                accept: (fn , arg1 , arg2) => {
                    let chainRE = /^[\u4e00-\u9fa5]{2,8}$/g,
                         idRE = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/g;

                    if (!chainRE.test(arg1)) {
                        document.querySelector('.error').innerHTML = '姓名填写不正确';
                    } else if (!idRE.test(arg2)) {
                        document.querySelector('.error').innerHTML = '身份证填写不正确';
                    } else {

                        AjaxService.ajax('get' , '/' , {a:1}).then((data) => {
                            console.log(data)
                            fn();
                            Dialog.alert({
                                key: 'SETREALNAME',
                                data: {
                                    title: '添加成功',
                                    msg: '您已成功绑定身份信息',
                                    btnT: '我知道了'
                                }
                            })
                        })

                    }
                }
            })

        }
    }
    static userinformation(DialogService , AjaxService , $document){
        return new UserInformation(DialogService , AjaxService , $document);
    }
}
UserInformation.userinformation.$inject = ['DialogService' , 'AjaxService' , '$document'];


export default DirectiveModule.directive('userinformation' , UserInformation.userinformation)
