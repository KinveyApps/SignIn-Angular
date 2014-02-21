function LogoutController($scope, $kinvey) {
	$scope.logout = function () {
		$kinvey.User.logout({
            success: function() {
            	window.location.href='../index.html';
            },
            error: function (error) {
                alert("Error logout");
            }
        });
    }
}