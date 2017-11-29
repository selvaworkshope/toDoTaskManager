'use strict';

angular.module('toDoApp.toDoList', ['ngRoute','toDoApp.toDoList'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/todolist', {
    templateUrl: 'todo/view/toDoList.html',
    controller: 'toDoController'
  });
}])

.controller('toDoController', function($scope,$parse) {
    $scope.name='Selvakumar';
    $scope.emailAddress="selvakumarj2e@gmail.com";
    var date = new Date();
    var d = date.getDate(), m = date.getMonth(), y = date.getFullYear(), h= date.getHours();

    // Test Data
    var taskData = (function (){
        return [
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
            }];})();

// Formatting the date
    function dateFormat(dateStr){
        var dateA = dateStr.split('-');
        var date = new Date()
        return new Date(dateA[2], dateA[1]-1, dateA[0],date.getHours(), date.getMinutes());
    }

  /* Generate unique id */
    function get_uni_id(){
        //Generate unique id
        return new Date().getTime() + Math.floor(Math.random()) * 500;
    }

    $('#taskDate').datepicker({
        dateFormat: 'dd-mm-yy',
        changeMonth: true,
        changeYear: true,
        onSelect: function(date) {
            $scope.taskDate = date;
            $scope.$digest();
        }
    });

//addEventSource
    $scope.addNewTask =function addNewTask() {
        if ($scope.toDoForm.$valid) {
            var taskTitle = $scope.taskTitle;
            var taskDescription = $scope.taskDescription;
            var taskDate = $scope.taskDate;
            $('#calendar').fullCalendar('renderEvent', {
                id: get_uni_id(),
                title: taskTitle,
                description: taskDescription,
                start: dateFormat(taskDate),
                end: new Date(y, m, d, 16, 30),
                allDay: false,
                backgroundColor: '#26f316', //green
                borderColor: '#26f316' //green
            });
            alert('Successfully add new task');
        }
    }

// Remove the task from calender
    $scope.removeTask= function removeTask() {
        if($scope.taskTitle){
            $('#calendar').fullCalendar('removeEvents', $scope.taskid);
            alert('Successfully removed Task: '+$scope.taskTitle);
            $scope.taskTitle='';
            $scope.taskDescription='';
            $scope.taskDate='';
        }else{
            alert('Please select valid task to Delete');
        }
    }

    $scope.modifyTask =function modifyTask(){
        if($scope.taskTitle==undefined || $scope.taskTitle===''){
            alert('Please select valid task to Modify');
            return false;
        }else{
            //Retrieve current event
            var currentTask = $('#calendar').fullCalendar('clientEvents', $scope.taskid);
            if(currentTask){
                currentTask = currentTask[0];
                currentTask.id=$scope.taskid;
                currentTask.title=$scope.taskTitle;
                currentTask.description= $scope.taskDescription;
                currentTask.start= dateFormat($scope.taskDate);
                var toDate =$scope.taskDate.split('-');
                currentTask.end= currentTask.end
                currentTask.className= 'fancy-color'
            }
            $('#calendar').fullCalendar( 'updateEvent', currentTask);
            alert('Successfully Modified Task: '+$scope.taskTitle);
        }
    }
    $scope.taskClick = function (event, jsEvent, view) {
        //set the values to text box
        $scope.taskid=event.id
        $scope.taskTitle=event.title;
        $scope.taskDescription=event.description;
        $scope.taskDate=(moment(event.start).format("DD-MM-YYYY"));
        $scope.$apply();
    }
    $scope.desAttach= function(event, element) {
        element.children().last().append("&nbsp;("+event.description+")");
    }
    $(document).ready(function () {
        $('.datepicker').datepicker({
            dateFormat: 'dd-mm-yy'
        });
        $('#calendar').fullCalendar({
            height: 550,
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'listYear,listMonth,listWeek,listDay'
            },
            buttonText: {
                today: 'Today',
                year: 'Year',
                month: 'Month',
                week: 'Week',
                day: 'Day'
            },
            eventClick: $scope.taskClick,
            eventRender: $scope.desAttach,
            defaultView: 'listYear',
            defaultDate: date,
            navLinks: true, // can click day/week names to navigate views
            editable: true,
            eventLimit: true, // allow "more" link when too many events
            events: taskData  // for Demo application data are populated from Array Otherwise AJAX call to set the values
        });
    });

});