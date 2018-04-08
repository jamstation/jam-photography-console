// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
	production: false
};

export const database = {

	firebaseAppConfig: {
		apiKey: "AIzaSyCCgjN5mnBqXVXRdeSuoYT9rxwmIEhUaJQ",
		authDomain: "jam-photography-site.firebaseapp.com",
		databaseURL: "https://jam-photography-site.firebaseio.com",
		projectId: "jam-photography-site",
		storageBucket: "jam-photography-site.appspot.com",
		messagingSenderId: "151370763286"
	},

	config: {
		metadataPath: '/Metadata/Database/JamPhotography'
	}

}
