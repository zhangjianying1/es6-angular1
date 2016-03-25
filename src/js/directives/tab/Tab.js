import {DirectiveModule} from '../../module';
require('./tab.scss');
let weak = new WeakMap(),
    temp = {},
    weak2 = new WeakMap(),
    temp2 = {};

class Tab {
    constructor($window , $document ){
        this.restrict = 'AE';
        this.replace = true;
        this.controller = ['$scope' , function($scope){
            let panles = $scope.panles = [];

            this.push = function(scope){

                if (panles.length == ($scope.activeDefault || 0)) {
                    scope.active = true;
                }
                panles.push(scope);
            }
            $scope.selectHandler = function(scope){
                angular.forEach(panles , function(panle){
                    panle.active = false;
                })
                scope.active = true;
            }
        }];
        this.scope = {
            activeDefault: '=activedefault'
        };
        this.transclude = true;
        this.template = ' <div class="tab"><div class="t-header"><span ng-repeat="panle in panles" ng-class="{active: panle.active}"' +
            ' ng-click="selectHandler(panle)">{{panle.title}}</span></div><div class="t-body" ng-transclude></div></div>'
        weak.set(temp , $window);
        weak2.set(temp2 , $document);

    }

    link(scope , elem , attrs){
        console.log(scope)
        let $window = weak.get(temp),
            $document = weak2.get(temp2),
            scrollHandler = function(){
                let tabHead = elem.find('div')[0],
                    tabHeadOffsetT = tabHead.getBoundingClientRect().top;
                console.log($document[0].body.scrollTop)
                if ($document[0].body.scrollTop > 0) {
                    tabHead.style.position = 'fixed';
                } else {
                    tabHead.style.position = 'relative';
                }
            };

        $window.addEventListener('scroll' ,  scrollHandler , false);
        // 移除绑定事件
        scope.$on('$destroy' , function() {
            $window.removeEventListener('scroll' ,  scrollHandler , false);
        })

    }
    static tab($window , $document){
        return new Tab($window , $document);
    }
}
Tab.tab.$inject = ['$window' , '$document' ];
export let tab = DirectiveModule.directive('tab' , Tab.tab);

class Panle {
    constructor(){
        this.restrict = 'AE';
        this.replace = true;
        this.require = '^tab';
        this.scope = {
            title: '@title'
        }
        this.transclude = true;
        this.template = ' <div ng-show="active"><div  ng-transclude  ng-if="active"></div></div>'
    }
    link(scope , elem , attrs , tabController){
        tabController.push(scope);
    }
    static panle(){
        return new Panle();
    }
}

export let panle = DirectiveModule.directive('panle' , Panle.panle);