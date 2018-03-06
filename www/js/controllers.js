angular.module('app.controllers', [])
  
.controller('roundXpCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	$scope.calculate = function(){
		$scope.display = function(){
		var tab = [25,31,50,63,75,94,100,125,500];
		var description = ["SPIN ENEMY GYM PHOTO DISC WITHOUT BRONZE BADGE","SPIN FRIENDLY GYM PHOTO DISC WITHOUT BRONZE BADGE","POKESTOP INTERACTION","SPIN FRIENDLY GYM PHOTO DISC WITH BRONZE BADGE","SPIN ENEMY GYM PHOTO DISC WITH SILVER BADGE","SPIN FRIENDLY GYM PHOTO DISC WITH SILVER BADGE","SPIN ENEMY GYM PHOTO DISC WITH GOLD BADGE","SPIN FRIENDLY GYM PHOTO DISC WITH GOLD BADGE","EVOLVE A POKEMON","7"]
		var rez = combinationSum(tab,$scope.xp())[0];
		console.log(rez);
		return showResult(rez,tab,description);
	};
	}
	$scope.current = {
		value : 0
	};
	$scope.target = {
		value : 0
	};
	$scope.xp = function(){
		return $scope.target.value-$scope.current.value <= 0 ? '0' : $scope.target.value-$scope.current.value
	};
	//$scope.xp = $scope.XPtarget - $scope.XPcurrent;
	

}])
   
.controller('aboutCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
 
 // 384 (383?) is the highest combination without solutions


/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
function combinationSum(candidates, target) {
    var res = [];
    var nTmp = [];
    var countEvolve = 0;

    candidates.sort(sorting);
    if(target >1000){
    	countEvolve = Math.floor((target-500)/500);
    	for (var i = 1; i <= countEvolve; i++) {
    		nTmp.push(500);
    	};
    }
    dfs(countEvolve*500, 0, nTmp);
    return res.sort(function(a,b){return a.length-b.length;});

    function dfs(sum, index, tmp){
        if(sum === target){
            newTmp = tmp.concat();
            res.push(newTmp);
            return; //pruning
        }else if(sum > target){
            return; //pruning
        }
        for(var i = index; i < candidates.length; i++){ 
            newTmp = tmp.concat();
            newTmp.push(candidates[i]);
            dfs(sum + candidates[i], i, newTmp);
        }    
    }
    function sorting(a, b){
        if(a > b){
            return 1;
        }else if(a < b){
            return -1;
        }else{
            return 0;
        }
    }
};


//console.log(combinationSum(tab,sum));

//console.log(showResult(combinationSum(tab,sum)[1]));
//showResults(combinationSum(tab,sum));
function showResult(solution,tab,description){
	var solutionDescription ="";
	for (var i = solution.length - 1; i >= 0; i--) {
		for (var j = tab.length - 1; j >= 0; j--) {
			if (solution[i] == tab[j]){
				solutionDescription += solution[i] + " " + description[j] + "\n";
			}
		};
	};
	return solutionDescription;
}

function showResults(solutions){
	for (var i = solutions.length - 1; i >= 0; i--) {
		console.log("======"+i+"======\n");
		console.log(showResult(solutions[i]));
	};
}

