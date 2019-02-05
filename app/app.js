//Module is  a java script file in which functionality of the app is defined

class MyNinja
{
    constructor()
    {
      this.MyNinjaApp=angular.module('AppMyNinja',['ngRoute','ngAnimate']);//.'AppMyNinja' is name of the module
      //['ngRoute'] ngRoute  is the dependency and the dependency file is 'app\lib\angular-route.min.js'
      //ngAnimate is the dependency and the dependency file is 'app\lib\angular-animate.min.js'
      self=this;

      this.MyNinjaApp.config(['$routeProvider',function($routeProvider) {self.config($routeProvider);}]);
      //route is like urls all link(urls , along with their controllers  and  temples should be  declared within route


      this.MyNinjaApp.directive('randomNinja',[function() {return self.randomNinja();}]);
      //Declare a customer directive with name “randomNinja” (random-ninja ) in html with
      //and a call back function  randomNinja Which  return   a json object containing restriction , scope for detective its template and  controller function

      this.MyNinjaApp.controller('Ninjacontroler',['$scope','$http' ,function($scope,$http) {self.controller($scope,$http);}]);
      //self/this.controller is like constructor of angular and  $scope is like “this” of angular app  all  function and variable of app should be declares here
      //$scope.removeNinja=this.removeNinja()
      //this.AppObject.controller('Ninjacontroler',this.Message) //Gives error this.loger is not defined

    }

    controller($scope,$http)
    {
      /*
      this function is like constructor of angular and  $scope is like “this” of angular app  all  function and variable of app shod be declares here
      */
      self=this;
      this.scope=$scope; //always create a this.scope so the scope has not to be explicitly passed  to every function that is associated with angular app
      this.http=$http
      this.getNinjas($http);

      this.scope.removeNinja=function(ninja) {self.removeNinja(ninja);};
      this.scope.AddNinja=function() {self.AddNinja();};

      this.scope.removeAll=function() {self.removeAll();};

      this.scope.message='hey you all ';
      /*
      this.scope.Ninjas=[{name:'yoshi', belt:'Green', rate:50,available: true,thumb:'content/img/yoshi.jpg' },
      {name:'crystal', belt:'Yellow', rate:30,available: true,thumb:'content/img/crystal.jpg'},
      {name:'ryu', belt:'Orange', rate:10,available: false,thumb:'content/img/ryu.png'},
      {name:'shaun', belt:'Black', rate:1000,available: true,thumb:'content/img/shaun.png'}];//$scope is like this/ self of an angular app
      //*/
      //this.logger('controller()');
      //*


    }

    getNinjas($http)
    {

      var NinjasRequest=$http.get('data/ninjas.json');//Make http request  to get date
      NinjasRequest.then(SuccessCallback)//,ErrorCallback);
      $http.get('data/ninjas.json').then(SuccessCallback);

      function SuccessCallback (response) { //response http responses received by request
        self.scope.Ninjas=response.data;
      }

      function ErrorCallback (error) {
          console.log(error);
      }

      this.logger('controller(with http)');

    }

    config($routeProvider)
    {
      /*
      this function is like is like urls all link(urls , along with their controllers  and  temples should be  declared within route
      */
      this.routeProvider=$routeProvider; //always create a this.routeProvider so the routeProvider has not to be explicitly passed  to every function that is associated with angular app

      //this.routeProvider.when('/home',{templateUrl:'views/home.html'}).otherwise({redirectTo:'/home'})

      this.routeProvider.when('/home',{templateUrl:'views/home.html',controller:'Ninjacontroler'});
      this.routeProvider.when('/directory',{templateUrl:'views/directory.html',controller:'Ninjacontroler'});
      //everything within views/directory.html  is controlled by Ninjacontroler

      this.routeProvider.otherwise({redirectTo:'/home'});

    }

    randomNinja()
    {
      /*call back function  randomNinja  for  Which  return   a json object containing restriction , scope for detective its template and  controller function
      customer directive with name “randomNinja”*/

      var ControlerObj={};
      ControlerObj['restrict']='EA';
      ControlerObj['scope' ]={title:'=', ninjas:'='};
      ControlerObj['templateUrl']='views/random.html';
      ControlerObj['transclude']=true; //do not replace every thin nested under customer directive 'randomNinja' with html  from template
      //fro transclude to work <ng-transclude> directive have to be used in  templateUrl
      ControlerObj['replace']=true; //'randomNinja' tag (directive tag ) is replace by html from templateUrl
      ControlerObj['controller']=random; //function ($scope) {};


      function random ($scope) { //response http responses received by request
        var random=Math.random();

        //var length=$scope.ninjas.length;
        var length=4;
        random=random*length;
        console.log($scope);
        $scope.random=Math.floor(random);
      }

      return ControlerObj;
    }

    logger(name)
    {
      console.log(name);
     }

    removeNinja(ninja)
    {
      var NinjaIndex=this.scope.Ninjas.indexOf(ninja);
      this.scope.Ninjas.splice(NinjaIndex,1);
      this.logger('removeNinja()');
    }
    removeAll()
    {
      this.scope.Ninjas=[];
      this.logger('removeAll');
    }

    AddNinja()
    {
      var NinjaObj={};

      NinjaObj['name']=this.scope.newninja.name;
      NinjaObj['belt']=this.scope.newninja.belt;
      NinjaObj['rate']=this.scope.newninja.rate;
      NinjaObj['available']=true;

      this.scope.Ninjas.push(NinjaObj)


      this.scope.newninja.name='';
      this.scope.newninja.belt='';
      this.scope.newninja.rate='';

    }


}

function main()
{
    var MyNinjaObj= new MyNinja();
}


main()
