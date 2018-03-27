const gulp = require('flarum-gulp');

gulp({
    modules: {
        'flagrow/saved-messages': [
            '../lib/**/*.js',
            'src/**/*.js',
        ],
    },
});
