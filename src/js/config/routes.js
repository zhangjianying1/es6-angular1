import TaskController from '../task/TaskController';
import UserCenterController from '../usercenter/UserCenterController';
import InvitationFriendController from '../usercenter/InvitationFriendController';
import VerificationPhoneController from '../usercenter/VerificationPhoneController';
import TaskRecordController from '../usercenter/TaskRecordController';
import InvitationRecordController from '../usercenter/InvitationRecordController';

import IncomeQueryController from '../incomequery/IncomeQueryController';
import ApplyExchangeController from '../incomequery/ApplyExchangeController';

function Route($stateProvider , $urlRouterProvider){
    $urlRouterProvider.otherwise('/')

    $stateProvider
        .state('task' , {
            url: '/task',
            templateUrl: './templates/task/task.controller.html',
            controller: 'TaskController as vm',
        })
        .state('usercenter' , {
            url: '/usercenter',
            templateUrl: './templates/usercenter/usercenter.controller.html',
            controller: 'UserCenterController as vm',
        })
        .state('invitationfriend' , {
            url: '/invitationfriend',
            templateUrl: './templates/usercenter/invitationfriend.controller.html',
            controller: 'InvitationFriendController as vm',
        })
        .state('verificationphone' , {
            url: '/verificationphone/:phone',
            templateUrl: './templates/usercenter/verificationphone.controller.html',
            controller: 'VerificationPhoneController as vm'
        })
        .state('taskrecord' , {
            url: '/taskrecord',
            templateUrl: './templates/usercenter/taskrecord.controller.html',
            controller: 'TaskRecordController as vm'
        })
        .state('invitationrecord' , {
            url: '/invitationrecord',
            templateUrl: './templates/usercenter/invitationrecord.controller.html',
            controller: 'InvitationRecordController as vm'
        })
        .state('exchangerecord' , {
            url: '/exchangerecord',
            templateUrl: './templates/usercenter/exchangerecord.controller.html',
            controller: 'TaskRecordController as vm'
        })
        .state('incomequery' , {
            url: '/incomequery',
            templateUrl: './templates/incomequery/incomequery.controller.html',
            controller: 'IncomeQueryController as vm'
        })
        .state('applyexchange' , {
            url: '/applyexchange',
            templateUrl: './templates/incomequery/applyexchange.controller.html',
            controller: 'ApplyExchangeController as vm'
        })
}

Route.$inject = ['$stateProvider', '$urlRouterProvider'];

export default Route;