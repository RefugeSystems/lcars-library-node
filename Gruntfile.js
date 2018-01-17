module.exports = function(grunt) {
	require("load-grunt-tasks")(grunt);

	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-eslint");
	grunt.loadNpmTasks("grunt-jasmine-nodejs");
	grunt.loadNpmTasks("grunt-contrib-yuidoc");
	
	var gruntConfiguration = {
		pkg: grunt.file.readJSON("package.json"),
		eslint: {
			options: {
				ecmaFeatures: {
					modules: true
				},
				globals: [
					"requireSubject"
				],
				/* http://eslint.org/docs/rules/ */
				rules: {
					/* Programatic Fixes */
					"eqeqeq": 0,
					"curly": 2,
					"quotes": [2, "double"],
					"block-scoped-var": 2,
					"no-undef": 2,
					"semi": 2,
					"indent": [2, "tab"],
					"no-mixed-spaces-and-tabs": 2,
					"new-parens": 2,
					"comma-dangle": 2,
					"brace-style": 2,
					"no-trailing-spaces": 2,
					"object-curly-newline": [2, {
							"minProperties": 2
						}
					],
					"object-property-newline": 2,

					/* Manual Fixes */
					"no-unused-vars": [1, {
							varsIgnorePattern: "^drop"
						}
					],

					/* Warnings */
					"camelcase": 1,
					"require-jsdoc": 1
				},
				envs: ["nodejs", "jasmine"]
			},
			target: ["library/**/*.js",
			         "scenerios/**/*.js"]
		},
		watch: {
			build: {
				files: ["library/**/*.js", "scenerios/**/*.js"],
				tasks: ["scenes"]
			}
		},
		jasmine_nodejs: {
			options: {
				specNameSuffix: "scene.js",
				helperNameSuffix: "helper.js",
				useHelpers: true,
				stopOnFailure: true,
				reporters: {
	                console: {
	                    colors: true,        // (0|false)|(1|true)|2
	                    cleanStack: 1,       // (0|false)|(1|true)|2|3
	                    verbosity: 4,        // (0|false)|1|2|3|(4|true)
	                    listStyle: "indent", // "flat"|"indent"
	                    activity: false
	                },
					junit: {
						savePath : "./reports/jasmine",
						filePrefix: "unit",
						useDotNotation: true,
						consolidate: false
					}
				}
			},
			unit: {
				specs: ["./scenerios/**.js"],
				helpers: ["./scenerios/helpers/**.js"]
			}
		},
		yuidoc: {
			compile: {
				name: "<%= pkg.name %>",
				description: "<%= pkg.description %>",
				version: "<%= pkg.version %>",
				url: "<%= pkg.homepage %>",
				options: {
					paths: "./library",
					outdir: "./docs"
				}
			}
		}
	};
	
	if(process.argv.indexOf("format") !== -1) {
		gruntConfiguration.eslint.options.fix = true;
	}
	
	grunt.initConfig(gruntConfiguration);

	grunt.registerTask("scenes", ["eslint", "jasmine_nodejs:unit", "yuidoc"]);
	grunt.registerTask("test", ["eslint", "jasmine_nodejs:unit"]);
	grunt.registerTask("default", ["scenes", "watch"]);

	grunt.registerTask("format", []);
};
