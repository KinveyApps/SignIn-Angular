var controllers = angular.module('controllers', []);
controllers.controller('LoginController', 
		['$scope', '$kinvey', "$location", function($scope, $kinvey, $location) {
			$scope.login = function () {
                checkExistUser($scope.username, $kinvey, function (isExistUser) {
                    if (!isExistUser) {
                        alert("User with this name don't exist");
                    } else {
                        var promise = $kinvey.User.login({
                            username: $scope.username,
                            password: $scope.password
                        });
                        promise.then(
                            function (response) {
                                $location.path('/templates/logged_in');
                            },
                            function (error) {
//		                alert("Error login " +JSON.stringify(error));
                                alert("Invalid credentials");
                            });
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
                var promise = $kinvey.User.resetPassword($scope.email);
                promise.then(
                    function () {
                        console.log("resetPassword");
                        $location.path("templates/login");
                    });
		    }

            $scope.logIn = function () {
                console.log("logIn");
                $location.path("templates/login");
            }
		}]);
controllers.controller('SignUpController', 
		['$scope', '$kinvey', "$location", function($scope, $kinvey, $location) {
			$scope.signUp = function () {
				console.log("signup");
                checkExistUser($scope.email, $kinvey, function (isExistUser) {
                        if (isExistUser) {
                            alert("User with this email already exist");
                        } else {
				var promise = $kinvey.User.signup({
		             username: $scope.email,
		             password: $scope.password,
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
                });
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
                    },
                    function (error) {
                        alert("Error logout: " + JSON.stringify(error));
                    });
            }

			$scope.verifyEmail = function () {
			    var user = $kinvey.getActiveUser();
			    var promise = $kinvey.User.verifyEmail(user.username);
                promise.then(
			        function() {
			            alert("Email was sent");
			        }
                );
			}

//			$scope.username = $kinvey.getActiveUser()._id;
			$scope.username = $kinvey.getActiveUser().username;

            $scope.showEmailVerification = function () {
                var activeUser = $kinvey.getActiveUser();
                if (activeUser != null) {
                    var metadata = new $kinvey.Metadata(activeUser);
                    var status = metadata.getEmailVerification();
                    console.log("User email " + status + " " + activeUser.email);
                    if (status === "confirmed" || !(!!activeUser.email)) {
                        return false;
                    } else {
                        return true;
                    }
                }
            }

        }]);


checkExistUser = function (username, $kinvey, callback) {
    var promise = $kinvey.User.exists(username);
    promise.then(
        function (usernameExists) {
            if (!!callback) {
                callback(usernameExists);
            }
        });
};