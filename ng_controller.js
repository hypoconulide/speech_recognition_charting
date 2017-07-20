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

    $scope.MissingTeethRatio = 0;


    $scope.SVGPlaque = function(sum){
        var Circumference = 2 * Radius * Math.PI;

        var maxCount = 192;

        var offset = -(Circumference / maxCount) * sum;
        document.getElementById('crt_plaque_c').setAttribute('stroke-dashoffset', offset);
    };
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
        $scope.SVGPlaque(sum);
        return Math.round(sum / 1.92 * 100) / 100;
    };
    
    $scope.SVGBleed = function(sum){
        var Circumference = 2 * Radius * Math.PI;

        var maxCount = 192;

        var offset = -(Circumference / maxCount) * sum;
        document.getElementById('crt_bleed_c').setAttribute('stroke-dashoffset', offset);
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
        $scope.SVGBleed(sum);
        return Math.round(sum / 1.92 * 100) / 100;
    };

    $scope.averageGingivalDepth = function(){
        var sum = 0;
        for (var i = 0 ; i < $scope.UpperTeeth.length ; i++)
        {
            sum += $scope.UpperTeeth[i].m_GingivalMargin.a;
            sum += $scope.UpperTeeth[i].m_GingivalMargin.b;
            sum += $scope.UpperTeeth[i].m_GingivalMargin.c;
            sum += $scope.UpperTeeth[i].m_GingivalMarginL.a;
            sum += $scope.UpperTeeth[i].m_GingivalMarginL.b;
            sum += $scope.UpperTeeth[i].m_GingivalMarginL.c;
            sum += $scope.LowerTeeth[i].m_GingivalMargin.a;
            sum += $scope.LowerTeeth[i].m_GingivalMargin.b;
            sum += $scope.LowerTeeth[i].m_GingivalMargin.c;
            sum += $scope.LowerTeeth[i].m_GingivalMarginL.a;
            sum += $scope.LowerTeeth[i].m_GingivalMarginL.b;
            sum += $scope.LowerTeeth[i].m_GingivalMarginL.c;
        }
        var average = Math.round(sum / 192 * 100) / 100;
        return average;
    };
    $scope.averageProbingDepth = function(){
        var sum = 0;
        for (var i = 0 ; i < $scope.UpperTeeth.length ; i++)
        {
            sum += $scope.UpperTeeth[i].m_ProbingDepth.a;
            sum += $scope.UpperTeeth[i].m_ProbingDepth.b;
            sum += $scope.UpperTeeth[i].m_ProbingDepth.c;
            sum += $scope.UpperTeeth[i].m_ProbingDepthL.a;
            sum += $scope.UpperTeeth[i].m_ProbingDepthL.b;
            sum += $scope.UpperTeeth[i].m_ProbingDepthL.c;
            sum += $scope.LowerTeeth[i].m_ProbingDepth.a;
            sum += $scope.LowerTeeth[i].m_ProbingDepth.b;
            sum += $scope.LowerTeeth[i].m_ProbingDepth.c;
            sum += $scope.LowerTeeth[i].m_ProbingDepthL.a;
            sum += $scope.LowerTeeth[i].m_ProbingDepthL.b;
            sum += $scope.LowerTeeth[i].m_ProbingDepthL.c;
        }
        var average = Math.round(sum / 192 * 100) / 100;
        return average;
    };

    $scope.SVGMissing = function(sum){
        var Circumference = 2 * Radius * Math.PI;

        var maxCount = 32;

        var offset = -(Circumference / maxCount) * sum;
        document.getElementById('crt_missing_c').setAttribute('stroke-dashoffset', offset);
    };
    $scope.sumMissingTeeth = function(){
        var sum = 0;
        for (var i = 0 ; i < $scope.UpperTeeth.length ; i++)
        {
            sum += !$scope.UpperTeeth[i].m_Exists;
            sum += !$scope.LowerTeeth[i].m_Exists;
        }
        $scope.SVGMissing(sum);
        return Math.round(sum / 32 * 10000) / 100;
    };

    $scope.SVGImplants = function(sum){
        var Circumference = 2 * Radius * Math.PI;

        var maxCount = 32;

        var offset = -(Circumference / maxCount) * sum;
        document.getElementById('crt_implants_c').setAttribute('stroke-dashoffset', offset);
    };
    $scope.sumImplants = function(){
        var sum = 0;
        for (var i = 0 ; i < $scope.UpperTeeth.length ; i++)
        {
            sum += $scope.UpperTeeth[i].m_Implant;
            sum += $scope.LowerTeeth[i].m_Implant;
        }
        $scope.SVGImplants(sum);
        return Math.round(sum / 32 * 10000) / 100;
    };
});



var Radius = 60;
var Circumference = 2 * Radius * Math.PI;

document.getElementById('crt_missing_c').setAttribute('stroke-dasharray', Circumference);
document.getElementById('crt_missing_c').setAttribute('r', Radius);
document.getElementById('crt_bleed_c').setAttribute('stroke-dasharray', Circumference);
document.getElementById('crt_bleed_c').setAttribute('r', Radius);
document.getElementById('crt_implants_c').setAttribute('stroke-dasharray', Circumference);
document.getElementById('crt_implants_c').setAttribute('r', Radius);
document.getElementById('crt_plaque_c').setAttribute('stroke-dasharray', Circumference);
document.getElementById('crt_plaque_c').setAttribute('r', Radius);