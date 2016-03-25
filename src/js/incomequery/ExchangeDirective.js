import {DirectiveModule} from '../module';
import AjaxService from '../services/AjaxService';
import DialogService from '../services/DialogService';
require('./applyexchange.controller.scss');
let weak = new WeakMap(),
    weak2 = new WeakMap(),
    temp = {},
    temp2 = {};

class ExchangeDirective{
    constructor(AjaxService , DialogService){
        this.restrict = 'AE';
        this.replace = true;
        this.transclude = true;
        this.controller = ["$scope" , function($scope){
            let couponCount,
                couponPrice = $scope.couponPrice,
                AjaxService = weak.get(temp),
                DialogService = weak2.get(temp2);


            $scope.activePrice = 0;
            $scope.couponNumber = 1;
            AjaxService.ajax('get' , '/' , {a:1}).then((data) => {
                couponCount = $scope.couponCount = 2020;

                for (let i = couponPrice.length-1; i >= 0; i --) {

                    if (couponPrice[i].price > couponCount) {
                        couponPrice[i].className = 'disabled'
                    } else if (couponPrice[i].price < couponCount) {

                        couponPrice[i].className = 'active';
                        $scope.activePrice = couponPrice[i].price;
                        setCouponNumber();
                        return;
                    }
                }

            })

            /**
             * 选择卡券的面额
             * @param coupon
             */
            $scope.selectHandler = function(coupon){

                couponPrice.map((val) => {

                    if (coupon.className == 'disabled') return;

                    if (coupon.price == val.price) {
                        val.className = 'active';
                        $scope.activePrice = val.price;
                    } else if (val.className == 'active'){
                        val.className = false;
                    }
                })
                setCouponNumber();
            }
            // 减
            $scope.reduce = function(){
                if ($scope.couponNumber == 1) return;
                $scope.couponNumber -= 1;
            }
            // 加
            $scope.plus = function(){
                console.log(setCouponNumber())
                if ($scope.couponNumber == parseInt(couponCount / $scope.activePrice)) return;
                $scope.couponNumber += 1;
            }
            // 输入
            $scope.input = function(){
                if ($scope.couponNumber < 1) $scope.couponNumber = 1;
                if ($scope.couponNumber > parseInt(couponCount / $scope.activePrice)) setCouponNumber();
            }
            // 兑换
            $scope.exchange = function(){
                AjaxService.ajax('get' , '/' , {price: $scope.activePrice , number: $scope.couponNumber}).then((data) => {
                    DialogService.alert({
                        key: 'ALERTSUCCESS',
                        data: {
                            title: '兑换成功',
                            msg: '您可以到微信卡包中查看',
                            btnT: '我知道了'
                        }
                    })
                })
            }
            function setCouponNumber(){
                return $scope.couponNumber = parseInt(couponCount / $scope.activePrice);
            }
        }];
        this.scope = {
            couponCount: '=couponcount',
            couponPrice: '=couponprice'
        }
        this.templateUrl = './templates/incomequery/exchange.directive.html';
        weak.set(temp , AjaxService);
        weak2.set(temp2 , DialogService);
    }

    static exchange(AjaxService , DialogService){
        return new ExchangeDirective(AjaxService , DialogService);
    }
}
ExchangeDirective.exchange.$inject = ['AjaxService' , 'DialogService'];
export default DirectiveModule.directive('exchange' , ExchangeDirective.exchange)