function LoginController($scope, $kinvey) {
	$scope.login = function () {
		$kinvey.User.login({
            username: $scope.username,
            password: $scope.password
        }, {
            success: function (response) {
                alert("You have successfully logged in");
                window.location.href='templates/logged_in.html';
            },
            error: function (error) {
                alert("Error login " +JSON.stringify(error));
            }
        });
	}
}