function ResetPasswordController($scope, $kinvey) {
    $scope.resetPassword = function () {
    	$kinvey.User.resetPassword($scope.email, {
            success: function() {
                window.location.href='../index.html';
            }
        });
    }
} 