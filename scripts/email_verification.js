function EmailVerificationController($scope, $kinvey) {
	 $scope.verifyEmail = function () {
		    var user = $kinvey.getActiveUser();
		    $kinvey.User.verifyEmail(user.username, {
		        success: function() {
		            alert("success");
		        }
		    });
     }
}
