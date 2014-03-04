/**
* Copyright (c) 2014 Kinvey Inc.
* Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
* in compliance with the License. You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software distributed under the License
* is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
* or implied. See the License for the specific language governing permissions and limitations under
* the License.
*
*/

var app = angular.module('SignIn-Angular', [ 'kinvey', 'ngRoute', 'controllers' ]);
app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/templates/login', {
		templateUrl: 'templates/login.html',
		controller: 'LoginController'
	}).
	when('/templates/password_reset', {
		templateUrl: 'templates/password_reset.html',
		controller: 'ResetPasswordController'
	}).
	when('/templates/sign_up', {
		templateUrl: 'templates/sign_up.html',
		controller: 'SignUpController'
	}).
	when('/templates/logged_in', {
		templateUrl: 'templates/logged_in.html',
		controller: 'LoggedInController'
	}).
	otherwise({
		 redirectTo: '/templates/login'
	});
}]);
app.run(['$location', '$kinvey', '$rootScope', function($location, $kinvey, $rootScope) {

	var promise = $kinvey.init({
		appKey : 'kid_TP-o2paIWO',
		appSecret : '6df2f442765741aa833f922ff548ec8b',
		refresh: true
	});
	promise.then(function() {
		console.log("Kinvey init with success");
		determineBehavior($kinvey, $location, $rootScope);
	}, function(errorCallback) {
		console.log("Kinvey init with error: " + JSON.stringify(errorCallback));
		determineBehavior($kinvey, $location, $rootScope);
	});
}]);

function determineBehavior($kinvey, $location, $rootScope) {
	var activeUser = $kinvey.getActiveUser();
	console.log("$location.$$url: " + $location.$$url);
	if (activeUser != null) {
		console.log("activeUser not null determine behavior");
		if ($location.$$url != '/templates/logged_in') {
			$location.path('/templates/logged_in');
		}
	} else {
		console.log("activeUser null redirecting");
		if ($location.$$url != '/templates/login') {
			$location.path('/templates/login');
		}
	}
}
