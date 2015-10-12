'use strict';
angular.module('starter.controllers', ['timer'])

.controller('HomeCtrl', function() {
	//TODO
})

.controller('AboutCtrl', function() {
	//TODO
})

.controller('SinglePLayerCtrl', function() {
	//TODO
})

.controller('QuickQuizCtrl', ['$scope', '$location', '$ionicNavBarDelegate', '$log', '$ionicPlatform', 'ContentService', 'GameService', 'ProfileService', 'StatisticService', '$ionicModal', '$ionicHistory', '$ionicPopup', '$state', function($scope, $location, $ionicNavBarDelegate, $log, $ionicPlatform, ContentService, GameService, ProfileService, StatisticService, $ionicModal, $ionicHistory, $ionicPopup, $state) {
	// POSTUP
	//
	//resetovat nastaveni hry
	//zvolit obtiznost
	//zvolit okruh otazek
	////iniciovat novou otaku
	////spustit casovac
	////aktualizovat seznam jiz polozenych otazek
	////zkontrolovat vyprseni casu
	////zkontrolovat odpoved
	////aktualizovat prubezne statistiky hry
	//zobrazeni vysledku hry

	/*
	POZOR:
	$scope.promenna = ""; // bind (zpřístupnění proměnné) ve view - $scope je propojka mezi controllerem a šablonama
	var promenna = ""; // lokální proměnná, nepřístupná ve view
	*/
	$scope.$log = $log;
	$scope.topics = ContentService.getTopics();
	$scope.difficulties = ContentService.getDifficulties();
	$scope.game = GameService.all();
	$scope.selectedOption = 0;

/*
	var path = $location.path();
	console.log(path);

	if (path.indexOf('/quick-quiz/pregame') !== -1) {
		$ionicHistory.nextViewOptions({
			disableBack: true
		});
	}
	if (path.indexOf('/quick-quiz/results') !== -1) {
		$ionicHistory.nextViewOptions({
			disableBack: true
		});
	}
*/

	/*
		$scope.customBack = function() {
			console.log($state.current);
			$ionicNavBarDelegate.back();
			if($scope.isNative){
		    //location.href='jmh-ios://back';
			$state.go('quick-quiz.topic');
		  }else{
		    $ionicNavBarDelegate.back();
		}
		}
		*/

	$ionicPlatform.ready(function() {
		//propis otazky z db do scope
		//TODO refactoring: potrebuju vsechny otazky ve scope????
		ContentService.getQuestions().then(function(questions) {
			$scope.questions = questions;
		});
	});

	$scope.selectDifficulty = function(difficulty) {
		GameService.restoreGame();
		GameService.setDifficulty(difficulty);
		$state.go('quick-quiz.topic');
	};
	$scope.selectTopic = function(topic) {
		GameService.setTopic(topic);
		$state.go('quick-quiz.pregame');
	};
	$scope.startGame = function() {
		$scope.selectedOption = 0;
		var response = GameService.setQuizQuestion();
		if (response === null) {
			var alertPopup = $ionicPopup.alert({
				title: 'Nejsou otázky!',
				subTitle: 'Průser nebo lenost?',
				template: 'Sorry, v db <strong>není</strong> odpovídající otázka'
			});
			alertPopup.then(function(res) {
				$log.log('nula - sorry nejsou otázky');
			});
		} else {
			$state.go('quick-quiz.game');
		}
	};
	$scope.nextQuestion = function() {
		if ($scope.game.gameStatistics.answeredQuestions < 10) {
			$scope.selectedOption = 0;
			GameService.setQuizQuestion();
			$scope.$broadcast('timer-set-countdown', 10);
			$scope.$broadcast('timer-start');
		} else {
			$state.go('quick-quiz.results');
		}
	};

	$scope.exitGame = function() {
		var confirmPopup = $ionicPopup.confirm({
			title: 'Opravdu ukončit hru?',
			template: 'Fakt to chceš zabalit?'
		});
		confirmPopup.then(function(res) {
			if (res) {
				$state.go('home');
			} else {
				//zruseno
			}
		});
	};

	$scope.answer = function(index, isAnswer) {
		$scope.$broadcast('timer-clear');
		$scope.timerRunning = false;
		$scope.selectedOption = index + 1;
		GameService.setactiveQuestionAnswered(true);
		GameService.setScoreQuestion(isAnswer);
		if (isAnswer) {
			$log.log('cool - správně');
			return true;
		} else {
			$log.log('not so cool - špatně');
			return false;
		}
	};

	$scope.timeLimit = function() {
		$log.log('Vypršel čas');
		GameService.setactiveQuestionAnswered(true);
		GameService.setScoreQuestion(false);
		$scope.$apply();
	};
	/*
	   //jiny zpusob pri vyprseni casoveho limitu, namisto callbacku v direktive timer
	   $scope.$on('timer-stopped', function (event, data){
		   console.log('Vypršel čas');
		   GameService.setactiveQuestionAnswered(true);
		  GameService.setScoreQuestion(false);
		  $scope.$apply();
	   });
   */



}]);
