import angular from 'angular';
import uiRouter from 'ui-router'
import ngSanitize from 'angular-sanitize';
import Route from './config/routes';
import {ControllerModule , ServiceModule , DirectiveModule} from './module';

var app = angular.module('myApp', [ngSanitize , uiRouter , ControllerModule.name , DirectiveModule.name , ServiceModule.name ]);
app.run(['$rootScope' , function($rootScope){
    console.log($rootScope)

}])
app.config(['$httpProvider', function($httpProvider){
    console.log($httpProvider)
}]);
app.config(Route);
