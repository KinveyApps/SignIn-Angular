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
var controllers = angular.module('controllers', []);
controllers.controller('LoginController', 
		['$scope', '$kinvey', "$location", function($scope, $kinvey, $location) {
			$scope.login = function () {
                var isFormInvalid = false;
                if ($scope.loginForm.email.$error.email || $scope.loginForm.email.$error.required) {
                    $scope.submittedEmail = true;
                    isFormInvalid = true;
                } else {
                    $scope.submittedEmail = false;
                }
                if ($scope.loginForm.password.$error.required) {
                    $scope.submittedPassword = true;
                    isFormInvalid = true;
                } else {
                    $scope.submittedPassword = false;
                }
                if (isFormInvalid) {
                    return;
                }
                        var promise = $kinvey.User.login({
                            username: $scope.username,
                            password: $scope.password
                        });
                        promise.then(
                            function (response) {
                                $scope.submittedError = false;
                                $location.path('/templates/logged_in');
                            },
                            function (error) {
                                $scope.submittedError = true;
                                $scope.errorDescription = error.description;
                            }
                        );
			}
			$scope.loginFacebook = function () {
		        var promise = $kinvey.Social.connect(null, 'facebook', {
		            create: 'true'
		        });
		        promise.then(
		            function () {
		                $location.path('/templates/logged_in');
                        $scope.submittedFacebookError = false;
		            },
		            function (error) {
                        $scope.submittedFacebookError = true;
                        $scope.errorDescription = error.description;
		            }
		        );
		    }
		    $scope.loginTwitter = function () {
		        var promise = $kinvey.Social.connect(null, 'twitter', {
		            create: 'true'
		        });
		        promise.then(
		            function () {
                        $scope.submittedTwitterError = false;
		                $location.path('/templates/logged_in');
		            },
		            function (error) {
                        $scope.submittedTwitterError = true;
                        $scope.errorDescription = error.description;
		            }
		        );
		    }
		    $scope.forgetPassword = function () {
		        $location.path("templates/password_reset");
		    }
		    $scope.signUp = function () {
		        $location.path("templates/sign_up");
		    }
		}]);
controllers.controller('ResetPasswordController', 
		['$scope', '$kinvey', "$location", function($scope, $kinvey, $location) {
            $scope.resetPassword = function () {
                if ($scope.resetPasswordForm.email.$error.email || $scope.resetPasswordForm.email.$error.required) {
                    $scope.submitted = true;
                    return;
                }else{
                    $scope.submitted = false;
                }
                var promise = $kinvey.User.resetPassword($scope.email);
                promise.then(
                    function () {
                        $location.path("templates/login");
                    });
            }

            $scope.logIn = function () {
                $location.path("templates/login");
            }
		}]);
controllers.controller('SignUpController', 
		['$scope', '$kinvey', "$location", function($scope, $kinvey, $location) {
			$scope.signUp = function () {
                var isFormInvalid = false;
                if ($scope.registrationForm.email.$error.email || $scope.registrationForm.email.$error.required) {
                    $scope.submittedEmail = true;
                    isFormInvalid = true;
                } else {
                    $scope.submittedEmail = false;
                }
                if ($scope.registrationForm.password.$error.required) {
                    $scope.submittedPassword = true;
                    isFormInvalid = true;
                } else {
                    $scope.submittedPassword = false;
                }
                if (isFormInvalid) {
                    return;
                }
				var promise = $kinvey.User.signup({
		             username: $scope.email,
		             password: $scope.password,
		             email: $scope.email
		         });
				promise.then(
						function () {
                            $scope.submittedError = false;
							$location.path("templates/logged_in");
						}, 
						function(error) {
                            $scope.submittedError = true;
                            $scope.errorDescription = error.description;
						}
				);
			}
		}]);
controllers.controller('LoggedInController', 
		['$scope', '$kinvey', '$location', function($scope, $kinvey, $location)  {
            $scope.logout = function () {
                var promise = $kinvey.User.logout();
                promise.then(
                    function () {
                        $kinvey.setActiveUser(null);
                        $location.path("templates/login");
                    });
            }

			$scope.verifyEmail = function () {
			    var user = $kinvey.getActiveUser();
			    $kinvey.User.verifyEmail(user.username);
			}
			$scope.username = $kinvey.getActiveUser().username;

            $scope.showEmailVerification = function () {
                var activeUser = $kinvey.getActiveUser();
                if (activeUser != null) {
                    var metadata = new $kinvey.Metadata(activeUser);
                    var status = metadata.getEmailVerification();
                    if (status === "confirmed" || !(!!activeUser.email)) {
                        return false;
                    } else {
                        return true;
                    }
                }
            }
        }]);