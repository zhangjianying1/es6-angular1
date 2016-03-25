import {ControllerModule} from '../module';
require('./task.controller.scss')

class TaskController {
    contsuctor(){
        this.defaults = 'fdsf'
    }
}
TaskController.$inject = []

export default ControllerModule.controller('TaskController', TaskController);