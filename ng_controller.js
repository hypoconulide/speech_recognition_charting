var app = angular.module("app", []);

app.controller('ctl', function($scope){
    $scope.UpperTeeth = speech_ctl.Charting.Maxilla.Teeth;
    $scope.LowerTeeth = speech_ctl.Charting.Mandibula.Teeth;
    $scope.redraw = function(x){
        drawTeeth(x);
    };
    $scope.cycleFurca = function(x){
        speech_ctl.Charting.cycle_furcState(x);
    };
    $scope.TeethList = TeethMajor;
    $scope.Dictionnary = __dictionnary;
});
