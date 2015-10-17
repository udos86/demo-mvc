module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({

        pkg: grunt.file.readJSON("package.json"),

        clean: {

            options: {
                force: true
            },

            remove: {
                src: ["dist/**/*"]
            }
        },

        cssmin: {

            dist: {

                files: [{

                    expand: true,
                    cwd: "css/",
                    src: "*.css",
                    dest: "dist/css/",
                    ext: ".min.css"
                }]
            }
        },

        concat: {

            dist: {

                src: ["scripts/main.js", "scripts/**/*.js"],
                dest: "dist/scripts/app.js"
            }
        },

        uglify: {

            scripts: {

                files: [{

                    expand: true,
                    cwd: "scripts/",
                    src: "**/*.js",
                    dest: "scripts/",
                    ext: ".min.js"
                }]
            },

            dist: {

                options: {
                    compress: {
                        global_defs: {
                            DEBUG: false
                        }
                    }
                },

                files: [{

                    expand: true,
                    cwd: "dist/scripts/",
                    src: "*.js",
                    dest: "dist/scripts/",
                    ext: ".min.js"
                }]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");

    grunt.registerTask("distribute", ["clean", "cssmin", "concat", "uglify:dist"]);
};