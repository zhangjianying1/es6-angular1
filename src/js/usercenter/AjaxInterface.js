import {ServiceModule} from '../module';
import AjaxService from '../services/ajaxService';
class AjaxInterface
{
    constructor($q, AjaxService)
    {
        this.$q = $q;
        this.AjaxService = AjaxService;
    }
    remindHanlder(param , callback)
    {

        this.AjaxService.ajax('get', '/', param).then(function (data) {
            data = {code: '0000'}
            callback && callback(data);
        })
    }
    getUserInformation(param , callback)
    {

        this.AjaxService.ajax('get', '/', param).then(function (data) {
            data = {code: '0000'}
            callback && callback(data);
        })
    }
}
AjaxInterface.$inject = ['$q' , 'AjaxService']
export default ServiceModule.service('AjaxInterface', AjaxInterface);