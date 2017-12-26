
var Yike = angular.module('Yike',['ngRoute','Controllers','Directives']);

Yike.config(['$routeProvider',function($routeProvider) {

    $routeProvider.when('/today',{
        templateUrl: './views/today.html',
        controller: 'TodayController'
    }).when('/older', {
        templateUrl: './views/older.html',
        controller: 'OlderController'
    }).when('/author',{
        templateUrl: './views/author.html',
        controller: 'AuthorController'
    }).otherwise({
        redirectTo: '/today'
    })
}])

Yike.run(['$rootScope', function ($rootScope) {
    // 设置类名初始值
    $rootScope.collapsed = false;

    // 全局方法
    $rootScope.toggle = function () {
        // console.log(1);
        // 改变类名初始值
        $rootScope.collapsed = !$rootScope.collapsed;

        // 获取所有导航
        var navs = document.querySelectorAll('.navs dd');

        if($rootScope.collapsed) {
            // console.log('打开');
            for(var i=0; i<navs.length; i++) {

        /* translate:(水平位移，垂直位移)；
           正值：向右向下
           负值：向左向上
           note:如果只写一个值 表示水平移动，垂直位移为0
           百分比 ：相对于自身移动
        */

                navs[i].style.transform = 'translate(0)';
                //完成过渡的延迟时间
                navs[i].style.transitionDelay = '0.2s';
                //规定完成过渡需要的时间
                navs[i].style.transitionDuration = (i + 1) * 0.15 + 's';
            }
        } else {
            // console.log('关闭');
            // 6
            // 6 - 1
            var len = navs.length - 1;
            for(var j=len; j>0; j--) {
                // console.log(navs.length - j + 1);
                navs[j].style.transform = 'translate(-100%)';
                navs[j].style.transitionDelay = '';
                navs[j].style.transitionDuration = (len - j) * 0.15 + 's';
            }
        }
    }
}]);