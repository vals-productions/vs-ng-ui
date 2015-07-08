# vs-ng-ui documentation

## Overview

The collection of UI widgets that are AngularJS directives. The goal was to 
develop components that will not require keyboard usage in order to enter data. 
This might be important if your web site is supporting mobile version.

The main goal of the development was to come up with data and time entry 
widgets that would still be use-able at mobile applications by being reasonably 
user friendly and not taking too much space at the screen at the same time. 
You can use these components to enter date and time, mimic drop down list 
and some other UI elements without getting to the keyboard or using phone's 
native drop down list substitution widget. 

## Demo

Please, note, the following demo runs under self signed SSL certificate, so
you might need to accept that in order to proceed. It's just a demo page.

Check the demo [a link](https://sonet.dynet.com/vs-ng-ui/demo/index.html)

## Usage

You need Angular JS to be included in your html page. Bootstrap is optional. 
You also need to include the actual vsng-dir-ui.js .
Here's the example:

```
<link rel="stylesheet" type="text/css" href="dependencies/angular-csp.css">
<link rel="stylesheet" type="text/css" href="dependencies/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="dependencies/bootstrap-theme.min.css">

<script src="dependencies/jquery.min.js"></script>
<script src="dependencies/bootstrap.min.js"></script>

<script type="text/javascript" src="dependencies/angular.min.js"></script>
<script type="text/javascript" src="dependencies/angular-route.min.js"></script>
<script type="text/javascript" src="../dist/vsng-dir-ui.js"></script>
``` 

As usual, you need to declare AngularJS module and controller. 
Here's the example. Note how vs.ng.ui is mentioned in module dependencies.

```
<script>
    var app = angular.module('vsngDemoApp', ['ngRoute', 'vs.ng.ui']).config([
        '$routeProvider',
        function($routeProvider){
    }]);
    app.controller('vsngDemoCtrl', function($scope, $http) {
    });
</script>
```

Next, you can start using directives. If anything does not work, please check 
working example at the demo page and view demo's source. I'm pretty much using 
snippets from that page in this doc.

### On / Off switch example

#### Minimalistic example

```
<vs-ng-toggle-button
    ng-model="form.cbOnOff">
</vs-ng-toggle-button>
```

The above example gives you a simple On\Off switch that sets ng-model to 0 or 1
correspondingly, that you can use instead of the traditional check box.

#### Bootstrap styled example

```
<vs-ng-toggle-button
    ng-model="form.cbOnOff"
    ng-classes="btn btn-default btn-md$$btn btn-success btn-md"
    ng-span-class="glyphicon glyphicon-retweet"
    ng-labels="Off$$On">
</vs-ng-toggle-button>
```
The above example provides, pretty much, the same functionality as the 
"Minimalistic example", but we would like to show the user No\yes labels
instead of On\Off, so we specified the labels as $$ delimited strings:
```
ng-labels="Off$$On"
```
Also, we wanted to assign a style to each of the values so that the label
looks "disabled" when "Off" and enabled when "On", or, "Yes" in this
instance. We alse added glyphicon from Bootstrap distribution so that 
the "toggle" nature of the button is more apparent:
```
    ng-classes="btn btn-default btn-md$$btn btn-success btn-md"
    ng-span-class="glyphicon glyphicon-retweet"
```

Both examples are attached to the "form.cbOnOff" angular model.

## Installation

I'll work on packaging with bower. For right now you can just include
the content of the dist directory in your project.

### End
