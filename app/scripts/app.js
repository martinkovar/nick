'use strict';
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, ContentService) {
		$ionicPlatform.ready(function() {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard for form inputs)
			if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);

			}
			if (window.StatusBar) {
				// org.apache.cordova.statusbar required
				StatusBar.styleLightContent();
				//$ionicPlatform.showStatusBar(false);
			}

			//inicializace DB a pokus o synchronizaci
			ContentService.initDB();

		});
	})
	.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

		$ionicConfigProvider.views.transition('none');
		$ionicConfigProvider.backButton.previousTitleText(false);
		$ionicConfigProvider.backButton.icon('ion-android-arrow-dropleft-circle');

		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'templates/home.html',
				controller: 'HomeCtrl'
			})
		//rychlokvíz
		.state('quick-quiz', {
				url: '/quick-quiz',
				templateUrl: 'templates/quickquiz.html',
				abstract: true
			})
			.state('quick-quiz.difficulty', {
				url: '/difficulty',
				views: {
					'gamecanvas': {
						templateUrl: 'templates/quickquiz-difficulty.html',
						controller: 'QuickQuizCtrl'
					}
				}
			})
			.state('quick-quiz.topic', {
				url: '/topic',
				views: {
					'gamecanvas': {
						templateUrl: 'templates/quickquiz-topic.html',
						controller: 'QuickQuizCtrl'
					}
				}
			})
			.state('quick-quiz.pregame', {
				url: '/pregame',
				views: {
					'gamecanvas': {
						templateUrl: 'templates/quickquiz-pregame.html',
						controller: 'QuickQuizCtrl'
					}
				}
			})
			.state('quick-quiz.game', {
				url: '/game',
				views: {
					'gamecanvas': {
						templateUrl: 'templates/quickquiz-game.html',
						controller: 'QuickQuizCtrl'
					}
				}
			})
			.state('quick-quiz.results', {
				url: '/results',
				views: {
					'gamecanvas': {
						templateUrl: 'templates/quickquiz-results.html',
						controller: 'QuickQuizCtrl'
					}
				}
			})
			//o hre
			.state('about', {
				url: '/about',
				templateUrl: 'templates/about.html',
				controller: 'AboutCtrl'
			})
			.state('single-player', {
					url: '/quick-quiz',
					templateUrl: 'templates/single.html',
					abstract: true
				})
				.state('single-player.profile', {
					url: '/profile',
					views: {
						'gamecanvas': {
							templateUrl: 'templates/single-profile.html',
							controller: 'SinglePlayerCtrl'
						}
					}
				});

		$urlRouterProvider.otherwise('/');

	});
