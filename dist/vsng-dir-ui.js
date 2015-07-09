angular.module('vs.ng.ui', [])
.config(function() {
   Number.prototype.pad = function(size) {
      var s = String(this);
      while (s.length < (size || 2)) {s = "0" + s;}
      return s;
   };
})

/*** Date ***/
.directive('vsNgDate', function () {
   return {
    restrict : 'AE', 
    template: [
        '<div class="{{ ngGrpCls }}">',
        '<a href="" class="{{ ngLabelCls  }}"> {{ ngLabel }} </a>',
        '<a href="" class="{{ ngVCls  }}" ng-click="dirClicked()"> {{ dirChr }} </a>',
        '<a href="" class="{{ ngVCls  }}" ng-click="yearClicked()"> {{ intlObj.y | numberFixedLen: 4}} </a>',
        '<a href="" class="{{ ngVCls  }}" ng-click="monthClicked()"> {{ month[intlObj.m - 1] }} </a>',
        '<a href="" class="{{ ngVCls  }}" ng-click="dayClicked()"> {{ intlObj.d | numberFixedLen: 2}} ( {{ dow[intlObj.dow] }} ) </a>',
        '</div>'
    ].join(''),
    scope: {
            ngModel: "=",
            ngLabel: "@",
            ngCls: "@",
            ngGrpCls: "@",
            ngLabelCls: "@",
            ngVCls: "@",
        },
    controller:['$scope',function($scope) {
        $scope.dirClicked = function() {
            $scope.dir = ( $scope.dir === 1 ) ? -1 : 1;
            $scope.dirChr = ($scope.dir === -1)? "<":">";
        };
        $scope.yearClicked = function(){
            $scope.dCLick = $scope.mCLick = 0;  
            $scope.intlObj.y = $scope.intlObj.y + $scope.dir;
            $scope.recalcDate();
            $scope.formatResult();
        };
        $scope.monthClicked = function() {
            $scope.mCLick = $scope.dir;    
            $scope.dCLick = 0;    
            $scope.mBefore = $scope.ngModel.m;
            $scope.intlObj.m= $scope.intlObj.m + $scope.dir;
            if ($scope.intlObj.m > 12) {
                $scope.intlObj.m= 1;
            } else if ($scope.intlObj.m < 1) {
                $scope.intlObj.m= 12;
            }
            $scope.recalcDate();
            $scope.mBefore = $scope.intlObj.m;
            $scope.formatResult();
       };
        $scope.dayClicked = function() {
            $scope.dCLick = $scope.dir; 
            $scope.mCLick = 0;  
            $scope.dBefore = $scope.intlObj.d;
            $scope.intlObj.d = $scope.intlObj.d + $scope.dir;
            $scope.recalcDate();
            $scope.dBefore = $scope.intlObj.d;
            $scope.formatResult();
        };
    }],
    link: function(scope, element, attrs) {
        scope.month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        scope.dow = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
        scope.dir = 1;
        scope.dirChr = ">";
        /* setting up default or specific css styles */
        if (scope.ngCls === undefined) {
            scope.ngGrpCls="";
            scope.ngVCls ="";
            scope.ngLabelCls ="";
        } else if (scope.ngCls === "bootstrap.default") {
            scope.ngGrpCls="btn-group btn-group-justified";
            scope.ngLabelCls ="btn btn-default btn-sm";
            scope.ngVCls ="btn btn-success btn-sm";
        } else {
            var classes = scope.ngCls.split('$$');
            scope.ngGrpCls= classes[0];
            scope.ngLabelCls = classes[1];
            scope.ngVCls = classes[2];
        }
        /* was month just cliecked ? */
        scope.mCLick = false;
        /* -""- day -""- */
        scope.dCLick = false;
        /* interlan obj for storing date attrs */
        scope.intlObj = {};
        /* internal date */
        scope.intlDate = new Date();
        /* format date back into ng-model */
        scope.formatResult = function() {
            scope.ngModel = (scope.intlObj.y).pad(4) + "-" + (scope.intlObj.m).pad() + "-" + (scope.intlObj.d).pad();
        };
        /* set date bases on input string YYYY-MM-DD format */
        scope.setDate = function(strings) {
            scope.intlObj.y = parseInt(strings[0]);
            scope.intlObj.m = parseInt(strings[1]);
            scope.intlObj.d = parseInt(strings[2]);
        };
        /* set default date */
        scope.setDefaultDate = function() {
            if (scope.intlObj.y === undefined) {
                scope.intlObj.y = scope.intlDate.getYear() + 1900;
            }
            if (scope.intlObj.m === undefined) {
                scope.intlObj.m = scope.intlDate.getMonth() + 1;
            }
            if (scope.intlObj.d === undefined) {
                scope.intlObj.d = scope.intlDate.getDate();
                scope.intlObj.dow = scope.intlDate.getDay();
            }
            scope.formatResult();
        };
        scope.onModelUpdated = function() {
            /* parse initial date passed in */
            if (scope.ngModel === undefined || 
                scope.ngModel === null ||
                !angular.isString(scope.ngModel)) {
                scope.ngModel = "";
                scope.setDefaultDate();
            } else {
                var strToken = scope.ngModel.split("-");
                if (strToken.length === 3) {
                    scope.setDate(strToken);
                }
            }
            /* day and m before the click on corrresp. button */
            scope.dBefore = scope.intlObj.d;
            scope.mBefore = scope.intlObj.m;
        };
        /* do some optional date recalcs for more natural 
         * sequential date traversals  
         */
        scope.recalcDate = function() {
            scope.intlDate.setYear(scope.intlObj.y /*- 1900*/);
            if (scope.dCLick !== 0) {
                scope.intlDate.setDate(scope.intlObj.d);
            }
            if (scope.mCLick !== 0) {
                scope.intlDate.setMonth(scope.intlObj.m - 1);
            }
            scope.intlObj.y = scope.intlDate.getYear() + 1900;
            scope.intlObj.m = scope.intlDate.getMonth() + 1;
            scope.intlObj.d = scope.intlDate.getDate();
            scope.intlObj.dow = scope.intlDate.getDay();
            if (scope.mCLick !== 0 &&
                scope.intlObj.m === scope.mBefore && 
                scope.intlObj.d === scope.dBefore) {
                if (scope.intlObj.d > 28) {
                    scope.intlObj.d--;
                    scope.intlObj.m += scope.mCLick;
                    scope.dBefore = scope.intlObj.d;
                    scope.mBefore = scope.intlObj.m;
                    scope.recalcDate();
                }
            }
        };
        scope.onModelUpdated();
        scope.recalcDate();
        scope.formatResult();
        scope.$watch('ngModel', function (value) {
            scope.onModelUpdated();
            scope.recalcDate();
            scope.formatResult();
        }, true);
    },
  };


/*** Time ***/

}).directive('vsNgTime', function () {
   return {
    restrict : 'AE',  
    template : [
        '<div class="{{ ngGrpCls }}">',
        '<a href="" class="{{ ngLabelCls  }}"> {{ ngLabel }} </a>',
        '<a href="" class="{{ ngVCls  }}" ng-click="dirClicked()"> {{ dirChr }} </a>',
        '<a href="" class="{{ ngVCls  }}" ng-click="hourClicked()"> {{ intlObj.h | numberFixedLen: 2}} </a>',
        '<a href="" class="{{ ngVCls  }}" ng-click="minuteClicked()"> {{ intlObj.m | numberFixedLen: 2 }} </a>',
        '<a href="" class="{{ ngVCls  }}" ng-click="amPmClicked()"> {{ intlObj.amPm }} </a>',
        '</div>'
    ].join('\n'),
    scope: {
            ngModel: "=",
            ngLabel: "@",
            ngCls: "@",
            ngGrpCls: "@",
            ngLabelCls: "@",
            ngVCls: "@",
            ngStep: "@"
        },
    controller:['$scope',function($scope){
        $scope.dirClicked = function() {
            $scope.dir = ( $scope.dir === 1 ) ? -1 : 1;
            $scope.dirChr = ($scope.dir === -1)? "<":">";
        }; 
        $scope.hourClicked = function(){
            $scope.intlObj.h= $scope.intlObj.h + $scope.dir;
            if ($scope.intlObj.h > 12) {
                $scope.intlObj.h= 0;
            } else if ($scope.intlObj.h < 0) {
                $scope.intlObj.h= 12;
            }
            $scope.formatTime();
        };
        $scope.minuteClicked = function(){
            $scope.intlObj.m= $scope.intlObj.m +($scope.ngStep*$scope.dir);
            if ($scope.intlObj.m > 60- $scope.ngStep) {
                $scope.intlObj.m= 0;
            } else if ($scope.intlObj.m < 0) {
                $scope.intlObj.m= 60 - $scope.ngStep;
            }
            $scope.formatTime();
        };
        $scope.amPmClicked = function(){
            var m = $scope.intlObj.amPm;
            $scope.intlObj.amPm = m === "AM"? "PM":"AM";
            $scope.formatTime();
        };
        $scope.formatTime = function() {
            $scope.ngModel = ($scope.intlObj.h).pad() + ":" + ($scope.intlObj.m).pad() + " " + $scope.intlObj.amPm;
        };
    }],
    link: function(scope, element, attrs) {
        scope.dir = 1;
        scope.dirChr = ">";
        scope.intlObj = {};
        if (scope.ngStep === undefined) {
            scope.ngStep = 5;
        }
        if (scope.ngCls === undefined) {
            scope.ngGrpCls="";
            scope.ngVCls ="";
            scope.ngLabelCls ="";
        } else if (scope.ngCls === "bootstrap.default") {
            scope.ngGrpCls="btn-group btn-group-justified";
            scope.ngLabelCls ="btn btn-default btn-sm";
            scope.ngVCls ="btn btn-success btn-sm";
        } else {
            var classes = scope.ngCls.split('$$');
            scope.ngGrpCls=classes[0];
            scope.ngLabelCls =classes[1];
            scope.ngVCls =classes[2];
        }
        scope.setTime = function(strings) {
            scope.intlObj.h = parseInt(strings[0]);
            scope.intlObj.m = parseInt(strings[1]);
            scope.intlObj.amPm = strings[2];
        };
        scope.setDefaultTime = function() {
            if (scope.intlObj.h === undefined) {
                scope.intlObj.h = 6;
            }
            if (scope.intlObj.m === undefined) {
                scope.intlObj.m = 0;
            }
            if (scope.intlObj.amPm === undefined) {
                scope.intlObj.amPm = "AM";
            }
        };
        if (scope.ngLabel === undefined) {
            scope.ngLabel = 'Time';
        }
        scope.onModelUpdated = function() {
            if (scope.ngModel === undefined || scope.ngModel === null) {
                scope.ngModel = "";
                scope.setDefaultTime();
            } else {
                var strs = [];
                var strToken1 = scope.ngModel.split(":");
                strs[0] = strToken1[0];
                var strs2 = strToken1[1].split(" ");
                strs[1] = strs2[0];
                strs[2] = strs2[1];
                scope.setTime(strs);
            }
        };
        scope.onModelUpdated();
        scope.formatTime();
        scope.$watch('ngModel', function (value) {
            scope.onModelUpdated();
            scope.formatTime();
        }, true);
    }
  };
})
.directive('vsNgToggleButton', function () {
   return {
    restrict : 'AE',
    template: [
            ' <a href=""',
                'class="{{ ngCls }}"',
                'ng-click="onClick()"',
                '>',
                '{{ngXtraElem}}',
                '<span class="{{ngSpanClass}}"></span>',
                '{{ngLabel}}',
              '</a>'
    ].join('\n'),
    scope: {
            ngModel: "=",
            ngClasses: "@",
            ngLabels: "@",
            ngKeys: "@",
            ngSpanClass: "@"
        },
    controller:['$scope', '$injector',function($scope, $injector) {
        $scope.onClick = function() {
            $scope.idx++;
            if ($scope.idx >= $scope.labels.length) {
                $scope.idx = 0;
            }
            $scope.updateView();
        };
    }],
    link: function(scope, element, attrs) {
        if (scope.ngLabels === undefined) {
            scope.labels = ['Off', 'On'];
        } else {
            scope.labels = scope.ngLabels.split('$$');
        }
        if (scope.ngClasses === undefined) {
            scope.styles = [];
            for (var i = 0; i < scope.labels.length; i++) {
                scope.styles[i] = '';
            }
        } else if (scope.ngClasses.indexOf('$$') > 0) {
            scope.styles = scope.ngClasses.split('$$');
        } else {
            scope.styles = [];
            for (var i = 0; i < scope.labels.length; i++) {
                scope.styles[i] = scope.ngClasses;
            }
        }
        if (scope.ngKeys === undefined) {
            scope.ids = [];
            for (var i = 0; i < scope.labels.length; i++) {
                scope.ids[i] = i;
            }
        } else {
            scope.ids = scope.ngKeys.split('$$');
        }
        scope.onModelChange = function() {
            if(scope.ngModel === undefined) {
                scope.ngModel = scope.ids[0];
                scope.idx = 0;
            } else {
                for (var i = 0; i < scope.labels.length; i++) {
                    if (scope.ngModel == scope.ids[i]) {
                        scope.idx = i;
                        break;
                    }
                }
            }
        };
        scope.updateView = function() {
            scope.ngModel = scope.ids[scope.idx];
            scope.ngCls = scope.styles[scope.idx];
            scope.ngLabel = scope.labels[scope.idx];
        };
        scope.onModelChange();
        scope.updateView();
        scope.$watch('ngModel', function (value) {
            scope.onModelChange();
            scope.updateView();
        }, true);
    }
   };
})
.filter('numberFixedLen', function () {
    return function(a,b){
        return(1e4+a+"").slice(-b);
    };
});
