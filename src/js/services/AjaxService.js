import {ServiceModule} from '../module';


class AjaxService{
    constructor($http , $q , $rootScope) {
        this.$http = $http;
        this.$q = $q;
        this.$rootScope = $rootScope;
        this.bBtn = true;
    }
    ajax(method , url , params){
        let deferred = this.$q.defer(),
            loading =  document.querySelector('.global-loading');

        if (this.bBtn) {
            this.bBtn = false;

            loading.style.display = 'block';
            setTimeout(() => {
                this.$http[method](url , {params: params}).success((result) => {
                            deferred.resolve(result);
                        this.bBtn = true;
                        loading.style.display = 'none';
                    }).error((reason) => {
                        deferred.reject(reason)
                    this.bBtn = true;
                    loading.style.display = 'none';

                })

            } , 1000)

        }
        return deferred.promise;

    }

}

AjaxService.$inject = ['$http' , '$q' , '$rootScope'];

export default ServiceModule.service('AjaxService', AjaxService);