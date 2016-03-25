import {ServiceModule} from '../module';
import AjaxService from './ajaxService';
class AjaxApiService
{
    constructor($q, AjaxService)
    {
        this.$q = $q;
        this.AjaxService = AjaxService;
    }
    ExchangeLottery(param)
    {
        var deferred = this.$q.defer();
        this.AjaxService.ajax('get', '/', param).then(function (data) {
            data = {code: '0000'}
            if (data.code === '0000') {
                deferred.resolve(data);
            } else {
                deferred.reject();
            }

        })
        return deferred.promise;
    }
}
AjaxApiService.$inject = ['$q' , 'AjaxService']
export default ServiceModule.service('AjaxApiService', AjaxApiService);