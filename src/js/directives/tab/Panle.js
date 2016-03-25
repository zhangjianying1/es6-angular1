import {DirectiveModule} from '../../module';

class Panle {
    constructor(){
        this.restrict = 'AE';
        this.replace = true;
        this.template = ' <div class="tab"><div class="t-header"><span>正在邀请</span><span class="active">邀请成功</span></div><div class="t-body"></div></div>'
    }
    link(scope , elem , attrs){

    }
    static panle(){
        return new Panle();
    }
}

export default DirectiveModule.directive('panle' , Panle.panle)