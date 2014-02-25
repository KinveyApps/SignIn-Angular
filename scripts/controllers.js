var controllers = angular.module('controllers', []);
controllers.controller('LoginController', 
		['$scope', '$kinvey', "$location", function($scope, $kinvey, $location) {
			$scope.login = function () {
				$kinvey.User.login({
		            username: $scope.username,
		            password: $scope.password
		        }, {
		            success: function (response) {
		            	$location.path('/templates/logged_in');
		            },
		            error: function (error) {
		                alert("Error login " +JSON.stringify(error));
		            }
		        });
			}
			$scope.loginFacebook = function () {
		        console.log("social login Facebook");
		        var promise = $kinvey.Social.connect(null, 'facebook', {
		            create: 'true'
		        });
		        promise.then(
		            function () {
		                console.log("social login Facebook success");
		                $location.path('/templates/logged_in');
		            },
		            function (error) {
		                console.log("social login Facebook error: " + error.description + " json: " + JSON.stringify(error));
		                alert("Facebook login error : " + error.description);
		            }
		        );
		    }
		    $scope.loginTwitter = function () {
		        console.log("social login Twitter");
		        var promise = $kinvey.Social.connect(null, 'twitter', {
		            create: 'true'
		        });
		        promise.then(
		            function () {
		                console.log("social login Twitter success");
		                $location.path('/templates/logged_in');
		            },
		            function (error) {
		                console.log("social login Twitter error: " + error.description + " json: " + JSON.stringify(error));
		                alert("Twitter login error : " + error.description);
		            }
		        );
		    }
		    $scope.forgetPassword = function () {
		        console.log("forgetPassword");
		        $location.path("templates/password_reset");
		    }
		    $scope.signUp = function () {
		        console.log("signUp");
		        $location.path("templates/sign_up");
		    }
		}]);
controllers.controller('ResetPasswordController', 
		['$scope', '$kinvey', "$location", function($scope, $kinvey, $location) {
		    $scope.resetPassword = function () {
		    	$kinvey.User.resetPassword($scope.email, {
		            success: function() {
		            	console.log("resetPassword");
		            	$location.path("templates/login");
		            }
		        });
		    }
		}]);
controllers.controller('SignUpController', 
		['$scope', '$kinvey', "$location", function($scope, $kinvey, $location) {
			$scope.signUp = function () {
				console.log("signup");
				var promise = $kinvey.User.signup({
		             username: $scope.email,
		             password: $scope.password,
		             firstName: $scope.firstName,
		             lastName: $scope.lastName,
		             email: $scope.email
		         });
				console.log("signup promise");
				promise.then(
						function () {
							console.log("signup success");
							$location.path("templates/logged_in");
						}, 
						function(error) {
							console.log("signup error: " + error.description);
							alert("Signup error: " + error.description);
						}
				);
			}
			
			 $scope.checkPassword = function () {
			        console.log($scope.password !== $scope.reenterPassword)
			        $scope.registrationForm.reenterPassword.$error.dontMatch = $scope.password !== $scope.reenterPassword;
			        $scope.registrationForm.password.$error.dontMatch = $scope.password !== $scope.reenterPassword;
			    };
		}]);
controllers.controller('LoggedInController', 
		['$scope', '$kinvey', '$location', function($scope, $kinvey, $location)  {
			$scope.logout = function () {
		        $kinvey.User.logout({
		            success: function () {
		                $kinvey.setActiveUser(null);
		                $location.path("templates/login");
		            },
		            error: function (error) {
		                alert("Error logout: " + JSON.stringify(error));
		            }
		        });
		    }
			$scope.verifyEmail = function () {
			    var user = $kinvey.getActiveUser();
			    $kinvey.User.verifyEmail(user.username, {
			        success: function() {
			            alert("success");
			        }
			    });
			}
			$scope.username = $kinvey.getActiveUser()._id;
			// TODO: handle email verification status behavior
			$scope.$on('kinveyInitCallback', function(id, status){
				console.log("$scope.$on: kinveyInitCallback username: " + username + " status: " + status);
				// TODO: handle email verification status behavior
				$scope.username = id;
			});
		}]);
