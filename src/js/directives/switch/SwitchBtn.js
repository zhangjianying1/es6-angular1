import {DirectiveModule} from '../../module';

class SwitchBtn{
    constructor(){
        this.restrict = 'AE';
        this.transclude = true;
        this.replace = true;
        this.scope = {
            bBtn: '=bbtn',
            remind: '&remind'
        }
        this.template = '<span class="icon-switch" ng-class="{transOpen: bBtn}"></span>';
    }

    link(scope , elem , attrs) {
        elem.bind('click', function(){
            scope.bBtn=  !scope.bBtn;
            scope.remind();
        })
    }
    static switchbtn(){
        return new SwitchBtn();
    }
}

export default DirectiveModule.directive('switchbtn' , SwitchBtn.switchbtn)