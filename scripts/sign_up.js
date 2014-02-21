function SignUpController($scope, $kinvey) {
	// TODO: exception
	$scope.signUp = function () {
		 $kinvey.User.signup({
             username: $scope.email,
             password: $scope.password,
             firstName: $scope.firstName,
             lastName: $scope.lastName,
             email: $scope.email
         }, {
             success: function (response) {
            	 window.location.href='logged_in.html';
             },
             error: function (error) {
                 alert("Error sign in " + JSON.stringify(response));
             }
         });
	}
} 