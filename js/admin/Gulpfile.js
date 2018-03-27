const gulp = require('flarum-gulp');

gulp({
    modules: {
        'flagrow/canned-messages': [
            '../lib/**/*.js',
            'src/**/*.js',
        ],
    },
});
