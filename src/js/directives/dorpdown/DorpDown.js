/**
 * 下拉刷新加载最新数据
 */
import {DirectiveModule} from '../../module';

import scrollload from './ScrollLoad';
require('./dorpdown.scss');


class Dorpdown
{
    constructor()
    {

        this.restrict  =  'AE',
        this.transclude = true;
        this.replace = true;
        this.controller = ['$scope' , function($scope){

            // 向下广播事件（里面的指令已经预装载了事件）
            $scope.load = function(fn) {
                $scope.$broadcast('load' , fn);
            }
        }];
        this.scope = {
            urls: '@urls'
        };

        this.template =  '<div class="dorp-down"><div class="up-load"><span class="{loading: isload}"></span></div>' +
            '<div ng-transclude class="dorpcont" ></div><scrollload urls="{{urls}}"></scrollload></div>';

    }

    link(scope, ele, attrs) {

        let options = {
            element: ele[0],
            pull: ele.find('div').eq(0).find('span')[0],
            scrollH: 80,
            scrollCritical: 68,
            speed: 300,
            deltaY: 0,
            start: 0,
            bBtn: false
        }

        // 触摸屏幕开始
        options.element.addEventListener('touchstart', function (event) {

            // 获取触摸点的位置（只获取Y轴）
            options.start = event.touches && event.touches[0].pageY;
            // 禁用动画
            options.element.style.webkitTransitionDuration = '0ms';
            // 当页面滚动大于0时禁用下拉加载
            if (document.body.scrollTop > 0) {
                options.bBtn = true;
            }

            event.stopPropagation();
        });
        // 触摸并滑动屏幕
        options.element.addEventListener('touchmove', function (event) {

            // 如果可以滑动
            if (!options.bBtn) {
                // 获取滑动的距离
                options.deltaY = event.touches && event.touches[0].pageY - options.start;

                // 如果滑动向上变成负数 则不执行里面的代码
                if (options.deltaY > 0) {
                    moveTo();
                    // 阻止默认行为（会滚动屏幕，但是滚动已经在最顶端了，但还是阻止吧）
                    event.preventDefault();
                }
            }

        })
        // 触摸并离开屏幕
        options.element.addEventListener('touchend', function () {
            options.deltaY > 0 && scrollOver();

        })
        /**
         * 触摸移动
         */
        function moveTo() {
            // 计算触摸距离（大于向下滑动的最高值时进行阻挠滑动）
            options.deltaY = options.deltaY > options.scrollH ? options.deltaY / (options.deltaY / window.innerHeight + 1) : options.deltaY;

            // 滑动的距离大于 可以松手刷新的时候
            if (options.deltaY > options.scrollCritical) {
                // 提示松手刷新
                options.pull.style.webkitTransform = 'rotate(0deg)';
            } else {
                options.pull.style.webkitTransform = 'rotate(180deg)';
            }

            // 滑动

            options.element.style.webkitTransform = 'translate3d(0, ' + options.deltaY + 'px , 0)';

        }

        /**
         * 停止滑动并松手离开
         *
         */
        function scrollOver() {
            // 滑动的距离大于可以松手加载的最大值时
            if (options.deltaY > options.scrollCritical) {
                scrollTo(68);
                scope.load(scrollTo);
            } else {
                // 滚动到 0
                scrollTo(0)
            }

        }

        /**
         * 滚动到
         * @param distance {Number} 滚动到的距离
         * @param speed { Number } 动画时间
         */
        function scrollTo(distance, speed) {
            // 没传时间就用默认时间
            if (!speed) {
                speed = options.speed;
            }
            // 传入的距离
            switch (distance) {
                // 滚动到 0 时
                case 0:
                    setTimeout(function () {
                        // 可以进行下次下拉加载
                        options.bBtn = false;
                        options.pull.className = '';
                        options.deltaY = 0;
                        options.element.removeEventListener('touchmove', preventDefault, false);
                    }, 100)
                    break;
                case 68:
                    // 绑定的touchmove 里面不执行 shez options.bBtn = true;
                    options.pull.className = 'loading';
                    break;
                //default:
            }

            options.element.addEventListener('touchmove', preventDefault, false);

            options.element.style.webkitTransitionDuration = speed + 'ms';
            options.element.style.webkitTransform = 'translate3d(0, ' + distance + 'px , 0)';
        }

        // 阻止默认行为（在加载数据的时候禁止用户滑动屏幕）
        function preventDefault(e) {
            e.preventDefault();
            e.stopPropagation();
        }
    }

    static dorpdown(){
        return new Dorpdown();
    }
}

export default DirectiveModule.directive('dorpdown', Dorpdown.dorpdown)