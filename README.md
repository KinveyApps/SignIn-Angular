SignIn-Angular
==============

This application presets a sample login screen/account registration flow.


In particular this sample application highlights the following key backend tasks:

* Allow users to sign up and log in
* Allow users reset password and send verification email
* Integrate Login with Twitter or Facebook OAuth

##Get Kinvey API Keys

1. Visit [Kinvey official site](http://www.kinvey.com/) and create your own Kinvey account.
2. Choose the "Get started" option that suits you best. 
3. Name your app, choose app platform and click "Create app backend".
4. On the app dashboard page, you will find your App Key and App Secret. 
5. Specify your app key and secret in `scripts/app.js` constant variables

```javascript
var promise = $kinvey.init({
		appKey : 'MY_APP_KEY',
		appSecret : 'MY_APP_SECRET',
	});
```


##Get Twitter, Facebook API Keys

To get social API Keys you need visit [Kinvey Devcenter](http://devcenter.kinvey.com/backbone/tutorials/how-to-implement-safe-signin-via-oauth#SetUp).
Here you can find how to get and plug in social API keys to your app.

## License

Copyright (c) 2014 Kinvey, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
