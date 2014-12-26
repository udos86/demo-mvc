module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({

        pkg: grunt.file.readJSON("package.json"),

        clean: {

            options: {
                force: true
            },

            remove: {
                src: ["dist/"]
            }
        },

        cssmin: {

            minify: {

                files: [{

                    expand: true,
                    cwd: "css/",
                    src: "*.css",
                    dest: "dist/css/",
                    ext: ".min.css"
                }]
            }
        },

        uglify: {

            minify: {

                files: [{

                    expand: true,
                    cwd: "scripts/",
                    src: "**/*.js",
                    dest: "dist/scripts/",
                    ext: ".min.js"
                }]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-uglify");

    grunt.registerTask("default", ["clean", "cssmin", "uglify"]);
};