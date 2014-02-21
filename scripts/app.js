var app = angular.module('SignIn-Angular', ['kinvey']);
app.run(function ($kinvey) {
    $kinvey.init({
        appKey: 'kid_TP-o2paIWO',
        appSecret: '6df2f442765741aa833f922ff548ec8b'
    })
});

app.consumer_key = "RTF5M6lhAWuLLqzYYpYyAA";
app.consumerSecret = "CLTKwJLr1gv2QHjXAWFE5OzKwx8ojkuM4gedGeJXnc";
