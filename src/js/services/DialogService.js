import {ServiceModule} from '../module';

class DialogService{
    constructor($document , $rootScope , $compile){
        this.$document = $document;
        this.$rootScope = $rootScope;
        this.$compile = $compile;
        this.dialogMap = {}
    }
    alert(params , data){
        let alertData = params.data,
            html = '<div class="dialog" ng-click="close()"><div class="dialog-alert"> <header>' + alertData.title + '</header><section>' +
            '<p class="msg">' + alertData.msg + '</p></section><footer> <a href="javascript:;" ng-click="close()" class="react">' + alertData.btnT   + '</a></footer></div></div>',
            layer = angular.element(html),
            newScope = this.$rootScope.$new();

        angular.extend(newScope , {
            close: () => {
                this.closeHandler(params.key);
            }
        });
        this.dialogMap[params.key] = params;
        this.dialogMap[params.key].layer = layer;

        this.$document.find('body').append(layer)
        this.$compile(layer)(newScope);

    }
    confirm(params, data) {
        let confirmData = params.data,
            html = '<div class="dialog"><div class="dialog-confirm"><header>身份信息</header><section >' + confirmData.msg + '</section>'
                +'<footer><a href="javascript:;" ng-click="close()" class="react">取消</a><a href="javascript:;" ng-click="appect(arg1 , arg2, arg3)" class="react">确定</a></footer></div></div>',
            layer = angular.element(html),
            newScope = this.$rootScope.$new();

        angular.extend(newScope , {
            close: () => {
                this.closeHandler(params.key);
            },
            appect: (arg1 , arg2 , arg3) => {
                this.appectHandler(params.key , arg1 , arg2 , arg3);
            }
        } , data);
        this.dialogMap[params.key] = params;
        this.dialogMap[params.key].layer = layer;

        this.$document.find('body').append(layer)
        this.$compile(layer)(newScope);
    }
    closeHandler(key) {
        if (this.dialogMap[key])
        this.dialogMap[key].layer.remove();
    }
    appectHandler(key , arg1 , arg2 , arg3) {
        if (this.dialogMap[key].accept) {
            this.dialogMap[key].accept(() => this.closeHandler(key) , arg1 , arg2 , arg3);
        } else {
            this.closeHandler(key);
        }
    }

}
DialogService.$inject = ['$document' , '$rootScope' , '$compile'];

export default ServiceModule.service('DialogService' , DialogService);