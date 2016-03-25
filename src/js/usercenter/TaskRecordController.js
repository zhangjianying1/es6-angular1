/**
 * 公用的控制器（兑换记录页和任务记录）
 */

import {ControllerModule} from '../module';

import dorpdown from '../directives/dorpdown/DorpDown';
require('./taskrecord.controller.scss');
require('./exchangerecord.controller.scss');
class TaskRecordController{
    constructor($scope){
        this.datas = [];

        $scope.$on('push' , (scope , val) => {
            let label = val.label,
                data = val.data,
                flag = val.flag;

            data = [{price:1}, {price:3}]
            if (flag) {
                this.datas = this.datas.concat(data)
            } else {
                this.datas = data;
            }
        })
    }
}
TaskRecordController.$inject = ['$scope'];
export default ControllerModule.controller('TaskRecordController' , TaskRecordController);