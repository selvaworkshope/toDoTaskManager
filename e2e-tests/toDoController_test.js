'use strict';

describe('toDoApp.toDoList module', function() {
    var scope, $compile, $locale, $controller, config, element, elementScope, fullCalendar;
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    beforeEach(module('toDoApp.toDoList'));

    beforeEach(inject(function (_$rootScope_, _$compile_, _$locale_,_$controller_,uiCalendarConfig) {
        scope = _$rootScope_.$new();
        $compile = _$compile_;
        $locale = _$locale_;
        $controller = _$controller_;
        config = uiCalendarConfig;

        // create an array of events, to pass into the directive.
        scope.events = [
            {
                id: '1',
                title: 'Meeting',
                start: new Date(y, m, d, 10, 30),
                allDay: false,
                backgroundColor: '#0073b7', //Blue
                borderColor: '#0073b7', //Blue
                editable: true,
                description: 'MTN Client Meeting ',
                startEditable: true
            },
            {
                id: '2',
                title: 'Lunch',
                start: new Date(y, m, d, 12, 0),
                end: new Date(y, m, d, 14, 0),
                allDay: false,
                backgroundColor: '#0073b7', //Info (aqua)
                borderColor: '#0073b7', //Info (aqua)
                editable: true,
                description: 'going for Outside Lunch',
                startEditable: true
            },
            {
                id: '3',
                title: 'Tea',
                start: new Date(y, m, d-1, 12, 0),
                end: new Date(y, m, d-1, 14, 0),
                allDay: false,
                backgroundColor: '#74f325',
                borderColor: '#74f325',
                editable: true,
                description: 'going with friends',
                startEditable: true
            },
            {
                id: '4',
                title: 'Birthday Party',
                start: new Date(y, m, d + 1, 19, 0),
                end: new Date(y, m, d + 1, 22, 30),
                allDay: false,
                description: 'Sanu Birthday Party',
                backgroundColor: '#0073b7', //Success (green)
                borderColor: '#0073b7', //Success (green)
                editable: true,
                startEditable: true
            }];


        //event Sources array
        scope.eventSources = [scope.events]; //End of Events Array

        scope.addSource = function(source) {
            scope.eventSources.push(source);
        };

        scope.addChild = function(array) {
            array.push({
                title: 'Click for Google ' + scope.events.length,
                start: new Date(y, m, 28),
                end: new Date(y, m, 29),
                url: 'http://google.com/'
            });
        };

        scope.remove = function(array,index) {
            array.splice(index,1);
        };

        scope.uiConfig = {
            calendar:{
                height: 200,
                weekends: false,
                defaultView: 'month'
            }
        };

    }));


    it('should call its renderEvent method', function () {
        expect($.fn.fullCalendar.calls.mostRecent().args[0].eventSources[0].length).toEqual(4);
        expect($.fn.fullCalendar.calls.count()).toEqual(1);
        scope.addChild(scope.events);
        scope.$apply();
        expect($.fn.fullCalendar.calls.count()).toEqual(2);
        expect($.fn.fullCalendar.calls.mostRecent().args[0]).toEqual('renderEvent');
        scope.addChild(scope.events);
        scope.$apply();
        expect($.fn.fullCalendar.calls.count()).toEqual(3);
        expect($.fn.fullCalendar.calls.mostRecent().args[0]).toEqual('renderEvent');
    });
    describe('toDoList controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var toDoCtrl = $controller('toDoController');
      expect(toDoCtrl).toBeDefined();
    }));

  });
});