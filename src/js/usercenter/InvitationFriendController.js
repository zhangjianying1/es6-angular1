import {ControllerModule} from '../module';
require('./invitationfriend.controller.scss');
class InvitationFriendController {
    constructor($scope){
        document.body.className = 'white';
        console.log($scope)
        $scope.$on('$destroy' , function(){
            document.body.className = '';
        })
    }
}
InvitationFriendController.$inject = ['$scope'];
export default ControllerModule.controller('InvitationFriendController', InvitationFriendController);