import {DirectiveModule} from '../../module';
import AjaxService from '../../services/AjaxService';
let weak = new WeakMap(),
    temp = {};

class ScrollLoad{
    constructor($window , AjaxService){
        this.restrict = 'AE';
        this.replace = true;
        this.controller = ['$scope' , function($scope){

            let urls = JSON.parse($scope.urls),
                bBtn = true;

            $scope.loadingText = '加载中...';
            $scope.page = 0;


            /**
             * 加载数据
             * @ params fn {Function} 下拉后回滚
             */
            $scope.load = (fn ) => {

                if (bBtn) {
                    bBtn = false;
                    $scope.page += 1;

                    if (fn) {
                        $scope.page = 1;
                        $scope.loadingText = '加载中...'
                    }

                    AjaxService.ajax('get' , urls.scrollLoad.url , {page: $scope.page}).then((data) => {

                        $scope.$emit('push' , {
                            label: urls.scrollLoad.label,
                            data: data,
                            flag:  $scope.page == 1 ? false : true
                        });

                        if ($scope.page == 4) {
                            $scope.page = 'not';
                            $scope.loadingText = '全部加载完'
                        }
                        bBtn = true;
                        fn && fn(0);
                    })
                }


            }
            // 第一次加载
            $scope.load();

            $scope.$on('load' , function(scope , fn) {
                $scope.load(fn);
            })
            $scope.$on('$destory' , function(){
                $window.onscroll = null;
            })
        }];
        this.scope = {
            urls: '@urls'
        }
        this.template = '<div style="lien-height: .3rem; text-align:center">{{loadingText}}</div>'
        weak.set(temp , $window);
    }

    link(scope , elem , attrs) {
        let $window = weak.get(temp),
            elemOffsetT;

        $window.onscroll = function(){
            elemOffsetT = elem[0].getBoundingClientRect().top;
            setTimeout(() => {

                if (scope.page != 'not' && elemOffsetT < this.innerHeight ) {
                    scope.load();
                }
            }, 40)
        };
    }
    static scrollload($window , AjaxService){
        return new ScrollLoad($window , AjaxService);
    }
}

ScrollLoad.scrollload.$inject = ['$window' , 'AjaxService'];

export default DirectiveModule.directive('scrollload' , ScrollLoad.scrollload);