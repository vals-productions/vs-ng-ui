# vs-ng-ui documentation

Compact Calendar, Time and data entry widgets based on AngularJS.

## Overview

The collection of UI widgets that are AngularJS directives. The goal was to 
develop components that will not require keyboard usage in order to enter data. 
This might be important if your web site supports mobile version.

The main goal of the development was to come up with data and time entry 
widgets that would still be use-able in mobile applications by being reasonably 
user friendly and not taking too much space at the screen at the same time. 
You can use these components to enter date and time, mimic drop down lists 
and some other UI elements without getting to the keyboard or using phone's 
native drop down list substitution widget.

This doc assumes you know AngularJS to some extent. Some examples are using
Bootstrap which is optional. Widgets are not dependent on bootstrap which is
demonstrated in examples, but I used bootstrap for styling them in my production
environment.

## Dependencies

This project was tested with AngularJS v1.3.15, so should be compatible with
newer versions as well. Bootstrap v3.3.4 was used for styling the widgets.

## Installation

```
bower install vs-ng-ui
```

## Demo

Check the demo [a link](http://vals-productions.github.io/vs-ng-ui/)

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
    ng-labels="No$$Yes">
</vs-ng-toggle-button>
```
The above example provides, pretty much, the same functionality as the 
"Minimalistic example", but we would like to show the user No\Yes labels
instead of On\Off, so we specified the labels as $$ delimited strings:
```
ng-labels="No$$Yes"
```
Also, we wanted to assign a style to each of the values so that the label
looks "disabled" when "Off" and enabled when "On", or, "Yes" in this
instance. We also added glyphicon from Bootstrap distribution so that 
the "toggle" nature of the button is more apparent.
```
ng-classes="btn btn-default btn-md$$btn btn-success btn-md"
ng-span-class="glyphicon glyphicon-retweet"
```
Both examples are attached to the "form.cbOnOff" angular model.

#### Multiple choice example

This element may mimic a group of check boxes. It is bootstrap styled and
represents a widget to select one or more days of the week.
```
<div class="input-group">
    <span class="input-group-addon" id="basic-addon1">Multiple selection:</span>
    <div class="btn-group btn-group-justified">
        <vs-ng-toggle-button 
            ng-model="form.weekd.suDay"
            ng-span-class="glyphicon glyphicon-retweet"
            ng-classes="btn btn-default btn-md$$btn btn-success btn-md" 
            ng-labels="Su$$Su"></vs-ng-toggle-button>
        <vs-ng-toggle-button 
            ng-model="form.weekd.moDay"
            ng-span-class="glyphicon glyphicon-retweet"
            ng-classes="btn btn-default btn-md$$btn btn-success btn-md" 
            ng-labels="Mo$$Mo"></vs-ng-toggle-button>
...
        <vs-ng-toggle-button 
            ng-model="form.weekd.saDay"
            ng-span-class="glyphicon glyphicon-retweet"
            ng-classes="btn btn-default btn-md$$btn btn-success btn-md" 
            ng-labels="Sa$$Sa"></vs-ng-toggle-button>
    </div>
</div>
```

Again, 0 or 1 are assigned as ng-model's value based on selection.

#### Single choice (drop-down)

Available values as you can see are $$ delimited Yesterday, Today and Tomorrow.

```
<vs-ng-toggle-button
    ng-model="form.rb1"
    ng-span-class="glyphicon glyphicon-retweet"
    ng-classes="btn btn-success btn-md"
    ng-keys="yester$$today$$tomorr"
    ng-labels="Yesterday$$Today$$Tomorrow">
</vs-ng-toggle-button>
```
Since we don't want to assign a separate class to each individual value, 
we specify just one class that will be used for all of them:
```
ng-classes="btn btn-success btn-md"
```
Alternatively, we could specify styles individually with $$ delimiter.

The new element here is ng-keys. It specified corresponding key, or, ng model 
value for each of the labels. If not used, it would be just 0 based index of
the label. It is convenient if keys related to labels are different form 0 
based index. Could have also been some numbers, like
```
ng-keys="10$$17$$25"
```
Please make sure that ng-label number of elements matches ng-key number of
elements. If ng-classes provides delimited values, their number should also
match.

#### Date entry (Bootstrap)

This widget changes its values when the user clicks year, month or day elements.
The direction "<" or ">" element specifies whether the value is incremented 
or decremented.

The widget is based on JavaScript's Date object, so that should be taken into
consideration when some specific date changes happen, like, while the date
is set to 31st of the month that does contain the date and then the month is
being changed to the one that does not contain the date. 

This widget contains built in label (might need to decouple) specified in
ng-label attribute. ng-init specifies the initial value for the widget and, 
also, demonstrates its format which is YYYY-MM-DD.

```
<vs-ng-date 
    ng-init="form.date='2015-03-15'" 
    ng-cls="bootstrap.default" 
    ng-label="Date" 
    ng-model="form.date" >
</vs-ng-date>
```
Date entry has some bootstrap defaults built in that you can specify 
by using 
```
ng-cls="bootstrap.default" 
```
otherwise, you could specify the following style attributes 'manually':
```
ng-grp-cls="btn-group btn-group-justified";
ng-label-cls ="btn btn-default btn-sm";
ng-v-cls="btn btn-success btn-sm";
```
Where ng-grp-cls specifies the style of the <div> element that surrounds the
group of data entry elements. ng-label-cls is the class for the element displaying
the date's label. ng-v-cls is the class for year, month, date and direction
change elements.

#### Date entry (minimalistic)
Same as above, but no styles. Appears as clickable "href" elements.
```
<vs-ng-date ng-cls="" ng-label="" ng-model="form.date" ></vs-ng-date>
```

#### Time entry

Similar to date entry, but changes time. Please note the input (and output) time
format in ng-init. 
```
<vs-ng-time 
    ng-init="form.time='07:55 PM'" 
    ng-cls="bootstrap.default" 
    ng-label="Time" 
    ng-model="form.time" >
</vs-ng-time>   

By default minutes have 5 min increment, which you can overwrite 
```
ng-step="1"
```

### End
