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

    $scope.sumPlaque = function(){
        var sum = 0;
        for (var i = 0 ; i < $scope.UpperTeeth.length ; i++)
        {
            sum += $scope.UpperTeeth[i].m_HasPlaque.a;
            sum += $scope.UpperTeeth[i].m_HasPlaque.b;
            sum += $scope.UpperTeeth[i].m_HasPlaque.c;
            sum += $scope.UpperTeeth[i].m_HasPlaqueL.a;
            sum += $scope.UpperTeeth[i].m_HasPlaqueL.b;
            sum += $scope.UpperTeeth[i].m_HasPlaqueL.c;
            sum += $scope.LowerTeeth[i].m_HasPlaque.a;
            sum += $scope.LowerTeeth[i].m_HasPlaque.b;
            sum += $scope.LowerTeeth[i].m_HasPlaque.c;
            sum += $scope.LowerTeeth[i].m_HasPlaqueL.a;
            sum += $scope.LowerTeeth[i].m_HasPlaqueL.b;
            sum += $scope.LowerTeeth[i].m_HasPlaqueL.c;
        }
        return Math.round(sum / 1.92 * 100) / 100;
    };
    $scope.sumBleed = function(){
        var sum = 0;
        for (var i = 0 ; i < $scope.UpperTeeth.length ; i++)
        {
            sum += $scope.UpperTeeth[i].m_BleedOnProbing.a;
            sum += $scope.UpperTeeth[i].m_BleedOnProbing.b;
            sum += $scope.UpperTeeth[i].m_BleedOnProbing.c;
            sum += $scope.UpperTeeth[i].m_BleedOnProbingL.a;
            sum += $scope.UpperTeeth[i].m_BleedOnProbingL.b;
            sum += $scope.UpperTeeth[i].m_BleedOnProbingL.c;
            sum += $scope.LowerTeeth[i].m_BleedOnProbing.a;
            sum += $scope.LowerTeeth[i].m_BleedOnProbing.b;
            sum += $scope.LowerTeeth[i].m_BleedOnProbing.c;
            sum += $scope.LowerTeeth[i].m_BleedOnProbingL.a;
            sum += $scope.LowerTeeth[i].m_BleedOnProbingL.b;
            sum += $scope.LowerTeeth[i].m_BleedOnProbingL.c;
        }
        return Math.round(sum / 1.92 * 100) / 100;
    };
    $scope.sumMissingTeeth = function(){
        var sum = 0;
        for (var i = 0 ; i < $scope.UpperTeeth.length ; i++)
        {
            sum += !$scope.UpperTeeth[i].m_Exists;
            sum += !$scope.LowerTeeth[i].m_Exists;
        }
        return Math.round(sum / 32 * 10000) / 100;
    };
    $scope.sumImplants = function(){
        var sum = 0;
        for (var i = 0 ; i < $scope.UpperTeeth.length ; i++)
        {
            sum += $scope.UpperTeeth[i].m_Implant;
            sum += $scope.LowerTeeth[i].m_Implant;
        }
        return Math.round(sum / 32 * 10000) / 100;
    };
});
