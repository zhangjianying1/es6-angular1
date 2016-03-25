import {ControllerModule} from '../module';
import AjaxService from '../services/AjaxService';
import {tab , panle} from '../directives/tab/Tab';
import dorpdown from '../directives/dorpdown/DorpDown';

require('./invitationrecord.controller.scss');

class InvitationRecordController{
    constructor(AjaxService , $scope){

        this.activeDefault = 1;
        // 邀请中
        this.invitationingData = [{price:1}, {price:3}];

        // 邀请完成
        this.invitationedData = [{price:1}, {price:3}];

        this.urls1 = {
            "scrollLoad": {
                "url": "/#1",
                "label": "invitationingData"
            }
        }
        this.urls2 = {
            "scrollLoad": {
                "url": "/#21",
                "label": "invitationedData"
            }
        }

        $scope.$on('push' , (scope , val) => {
            let label = val.label,
                data = val.data,
                flag = val.flag;

            data = [{price:1}, {price:3}]
                console.log(this[label])
            if (flag) {
                this[label] = this[label].concat(data)
            } else {
                this[label] = data;
            }
        })


}
}
InvitationRecordController.$inject = ['AjaxService' , '$scope'];
export default ControllerModule.controller('InvitationRecordController' , InvitationRecordController);