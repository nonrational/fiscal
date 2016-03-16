/* jshint node: true */

module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: [
                "extension/*.js"
            ]
        },
        crx: {
            test_track: {
              "src": [
                "extension/**/*",
                "!.{git,svn}"
              ],
              "dest": "dist/fiscal.crx",
              "options": {
                "baseURL": "http://fiscal.dev/",
                "privateKey": "./etc/fiscal.key.pem",
                "maxBuffer": 3000 * 1024 //build extension with a weight up to 3MB
              }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-crx');

    grunt.registerTask('default', ['jshint', 'crx:test_track']);
};
