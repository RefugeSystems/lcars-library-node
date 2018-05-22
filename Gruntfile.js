module.exports = function(grunt) {
	require("load-grunt-tasks")(grunt);
	
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("gruntify-eslint");
	grunt.loadNpmTasks("grunt-jasmine-nodejs");
	grunt.loadNpmTasks("grunt-contrib-yuidoc");
	
	var gruntConfiguration = {
		"pkg": grunt.file.readJSON("package.json"),
		"eslint": {
			"options": {
				"ecmaFeatures": {
					"modules": true
				},
				"globals": [
					"setTimeout",
					"requireSubject",
					"EventEmitter",
					"random",
					"module",
					"require",
					"console",
					"Promise",
					"global",
					"process",
					"btoa",
					"atob"
				],
				/* http://eslint.org/docs/rules/ */
				"rules": {
					"eqeqeq": 0,
					"curly": 2,
					"no-undef": 2,
					"semi": 2,
					"indent": [2, "tab", {
						"ignoreComments": true,
						"MemberExpression": 0,
						"SwitchCase": 1,
						
					}],
					"comma-dangle": 2,
					"quotes": [2, "double"],
					"no-unused-vars": [2, {
						"varsIgnorePattern": "^ignore"
					}],
					"block-scoped-var": 2,
					"no-undef": 2,
					"semi": 1,
					"camelcase": 2,
					"max-depth": 2,
					"no-unused-vars": 1
				},
				"terminateOnCallback": false,
				"callback": function(response) {
					if(response.errorCount) {
						var result, message;
						for(result=response.results.length-1; result !== -1; --result) {
							if(!response.results[result].errorCount) {
								response.results.splice(result,1);
							} else {
								for(message=response.results[result].messages.length-1; message !== -1; --message) {
									if(response.results[result].messages[message].severity !== 2) {
										response.results[result].messages.splice(message,1);
									}
								}
							}
						}
					}
					return response;
				},
				"envs": ["nodejs", "jasmine"]
			},
			"target": ["library/**/*.js", "specifications/**/*.js", "scenarios/**/*.js"]
		},
		"watch": {
			"build": {
				"files": ["library/**/*.js", "specifications/**/*.js", "scenarios/**/*.js"],
				"tasks": ["spec", "docs"]
			},
			"lint": {
				"files": ["library/**/*.js", "specifications/**/*.js", "scenarios/**/*.js"],
				"tasks": ["eslint:target"]
			}
		},
		"jasmine_nodejs": {
			"options": {
				"useHelpers": true,
				"stopOnFailure": true,
				"reporters": {
	                "console": {
	                    "colors": 1,			// (0|false)|(1|true)|2
	                    "cleanStack": 1,		// (0|false)|(1|true)|2|3
	                    "verbosity": 4,			// (0|false)|1|2|3|(4|true)
	                    "listStyle": "indent",	// "flat"|"indent"
	                    "activity": false
	                },
					"junit": {
						"savePath ": "./reports",
						"filePrefix": "unit",
						"useDotNotation": true,
						"consolidate": false
					}
				}
			},
			"spec": {
				"specs": ["./specifications/*.js"],
				"helpers": ["./specifications/helpers/*.js"]
			},
			"scene": {
				"specs": ["./scenarios/*.js"],
				"helpers": ["./scenarios/helpers/*.js"]
			}
		},
		"yuidoc": {
			"compile": {
				"name": "<%= pkg.name %>",
				"description": "<%= pkg.description %>",
				"version": "<%= pkg.version %>",
				"url": "<%= pkg.homepage %>",
				"options": {
					"paths": "./library",
					"outdir": "./docs"
				}
			}
		}
	};
	
	grunt.initConfig(gruntConfiguration);

	grunt.registerTask("spec", ["eslint", "jasmine_nodejs:spec"]);
	grunt.registerTask("scene", ["eslint", "jasmine_nodejs:scene"]);
	grunt.registerTask("spec:live", ["spec", "watch"]);
	grunt.registerTask("lint", ["eslint"]);
	grunt.registerTask("docs", ["yuidoc"]);
	grunt.registerTask("default", ["spec:live"]);
	grunt.registerTask("test", ["spec"]);
};
