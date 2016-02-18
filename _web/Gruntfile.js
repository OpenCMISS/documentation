// Generated on 2015-06-10 using
// generator-webapp 0.5.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Configurable paths
	var config = {
		app: 'app',
		dist: 'build/dist'
	};

	// Define the configuration for all the tasks
    grunt.initConfig({
		jinja2: {
			app: {
				options: {context_path: "context",template_path:"app"},
				files:[{
					expand: true,
					cwd: 'app/pages',
					src: ['**/*.html'],
					dest: '.tmp',
					ext: '.html'
				}]
			}
		},

		// Project settings
		config: config,

		// Task for merging multiple download data into one file for grunt-jinja2 to build downloads with.
		"merge-json":{
			"downloads":{
				dest:'.tmp/context/pages/downloads.json',
				src: ['data/downloads/**/**.json']
			}
		},

		// Watches files for changes and runs tasks based on the changed files
		watch: {
			js: {
				files: ['<%= config.app %>/scripts/{,*/}*.js','<%= config.app %>/data/{,*/}*.js'],
				tasks: ['babel:dev'],
				options: {
					livereload: true
				}
			},
			gruntfile: {
				files: ['Gruntfile.js']
			},
			sass: {
				files: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
				tasks: ['sass:server', 'autoprefixer']
			},
			jinja: {
				files: ['<%= config.app %>/pages/**/*.html','<%= config.app %>/partials/**/*.jinja','context/{,*/}*.json'],
				tasks: ['jinja2:app','sphinxgenDebug','exec:pelicangen']
			},
			sphinxgen: {
				files: ['sphinx/**/*.html','sphinx/**/*.py','sphinx/**/*.conf','../**/*.rst','!../_web/**/*.*'],
				tasks: ['sphinxgenDebug']
			},
			pelican: {
				files: ['pelican/**/*.rst','pelican/**/*.html','pelican/**/*.py','content/**/*.*'],
				tasks: ['exec:pelicangen']
			},
			styles: {
				files: ['<%= config.app %>/styles/{,*/}*.css'],
				tasks: ['newer:copy:styles', 'autoprefixer']
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'.tmp/{,*/}*.html',
					'.tmp/styles/{,*/}*.css',
					'<%= config.app %>/images/{,*/}*'
				]
			}
		},
		relativeRoot: {
			dist: {
				options: {
					root: '<%= config.dist %>'
				},
				files: [{
					expand: true,
					cwd: '<%= relativeRoot.dist.options.root %>',
					src: ['**/*.css', '**/*.html'],
					dest: '<%= relativeRoot.dist.options.root %>/'
				}]
			}
		},

		// The actual grunt server settings
		connect: {
			options: {
				port: 9000,
				open: true,
				livereload: 35729,
				// Change this to '0.0.0.0' to access the server from outside
				hostname: 'localhost'
			},
			livereload: {
				options: {
					middleware: function(connect) {
						return [
							connect.static('.tmp'),
							connect().use('/bower_components', connect.static('./bower_components')),
							connect().use('/documentation', connect.static('./.tmp/generated-doc')),
							connect.static(config.app),
							connect.static('./.tmp/pelicangen')
						];
					}
				}
			},
			dist: {
				options: {
					base: '<%= config.dist %>',
					livereload: false
				}
			}
		},

		// Empties folders to start fresh
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'<%= config.dist %>/*',
						'!<%= config.dist %>/.git*'
					]
				}]
			},
			server: '.tmp'
		},

		// Make sure code styles are up to par and there are no obvious mistakes
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			all: [
				'Gruntfile.js',
				'<%= config.app %>/scripts/{,*/}*.js',
				'!<%= config.app %>/scripts/vendor/*',
			]
		},

		// Compiles Sass to CSS and generates necessary files if requested
		sass: {
			options: {
				sourceMap: true,
				includePaths: ['bower_components','<%= config.app %>/styles']
			},
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.app %>/styles',
					src: ['*.{scss,sass}'],
					dest: '.tmp/styles',
					ext: '.css'
				}]
			},
			server: {
				files: [{
					expand: true,
					cwd: '<%= config.app %>/styles',
					src: ['*.{scss,sass}'],
					dest: '.tmp/styles',
					ext: '.css'
				}]
			}
		},

		// Add vendor prefixed styles
		autoprefixer: {
			options: {
				browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
			},
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/styles/',
					src: '{,*/}*.css',
					dest: '.tmp/styles/'
				}]
			}
		},

		babel: {
			options: {
				sourceMap: true,
				presets: ['react']
			},
			dev: {
				files: [{
					'dot': true,
					"expand": true,
					'cwd':'<%= config.app %>/scripts/',
					'dest': '.tmp/scripts/',
					'src': '**/*.js',
					'ext': '.js'
				},{
					'dot': true,
					"expand": true,
					'cwd':'<%= config.app %>/data/',
					'dest': '.tmp/data/',
					'src': '**/*.js',
					'ext': '.js'
				}]
			},
			dist: {
				files: [{
					'dot': true,
					"expand": true,
					'cwd':'<%= config.app %>/scripts/',
					'dest': '.tmp/scripts/',
					'src': '**/*.js',
					'ext': '.js'
				},{
					'dot': true,
					"expand": true,
					'cwd':'<%= config.app %>/data/',
					'dest': '.tmp/data/',
					'src': '**/*.js',
					'ext': '.js'
				}]
			}
		},

		// Renames files for browser caching purposes
		rev: {
			dist: {
				files: {
					src: [
						'<%= config.dist %>/scripts/{,*/}*.js',
						'<%= config.dist %>/styles/{,*/}*.css',
						'<%= config.dist %>/images/{,*/}*.*',
						'<%= config.dist %>/styles/fonts/{,*/}*.*',
						'<%= config.dist %>/*.{ico,png}'
					]
				}
			}
		},

		// Reads HTML for usemin blocks to enable smart builds that automatically
		// concat, minify and revision files. Creates configurations in memory so
		// additional tasks can operate on them

		// This will include the templates used in sphinx and pelican.
		useminPrepare: {
			options: {
				dest: '<%= config.dist %>'
			},
			app: {
				src: ['<%= config.app %>/pages/**/*.html', '<%= config.app %>/partials/**/*.jinja','sphinx/templates/**/*.html','pelican/themes/**/*.html', 'content/custompages/**/*.html']
			}
		},

		// Performs rewrites based on rev and the useminPrepare configuration
		usemin: {
			options: {
				assetsDirs: [
					'<%= config.dist %>',
					'<%= config.dist %>/images',
					'<%= config.dist %>/styles'
				]
			},
			html: ['<%= config.dist %>/**/*.html'],
			css: ['<%= config.dist %>/styles/{,*/}*.css']
		},

		// The following *-min tasks produce minified files in the dist folder
		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.app %>/images',
					src: '{,*/}*.{gif,jpeg,jpg,png}',
					dest: '<%= config.dist %>/images'
				}]
			}
		},

		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.app %>/images',
					src: '{,*/}*.svg',
					dest: '<%= config.dist %>/images'
				}]
			}
		},

		htmlmin: {
			dist: {
				options: {
					collapseBooleanAttributes: true,
					collapseWhitespace: true,
					conservativeCollapse: true,
					removeAttributeQuotes: true,
					removeCommentsFromCDATA: true,
					removeEmptyAttributes: true,
					removeOptionalTags: true,
					removeRedundantAttributes: true,
					useShortDoctype: true
				},
				files: [{
					expand: true,
					cwd: '<%= config.dist %>',
					src: '{,*/}*.html',
					dest: '<%= config.dist %>'
				}]
			}
		},

		// By default, your `index.html`'s <!-- Usemin block --> will take care
		// of minification. These next options are pre-configured if you do not
		// wish to use the Usemin blocks.
		// cssmin: {
		//   dist: {
		//     files: {
		//       '<%= config.dist %>/styles/main.css': [
		//         '.tmp/styles/{,*/}*.css',
		//         '<%= config.app %>/styles/{,*/}*.css'
		//       ]
		//     }
		//   }
		// },
		uglify: {
			options: {
				//beautify: true,
				//mangleProperties: false,
				preserveComments:'some'
			},
			dist: {
				files: {
					'<%= config.dist %>/scripts/scripts.js': [
						'<%= config.dist %>/scripts/scripts.js'
					]
				}
			}
		},
		exec: {
			sphinxgen: {
				cwd: '.tmp/sphinxenv',
				command: '../../.pythonenv/bin/sphinx-build -c . -b html ../../../ build' //The input is the documentation root directory.
			},
			pelicangen: {
				cwd: 'pelican',
				command: '../.pythonenv/bin/pelican --debug -o ../.tmp/pelicangen -s pelicanconf.py'
			}
		},

		// Copies remaining files to places other tasks can use
		copy: {
			sphinxPrep: {
				files: [{
					expand: true,
					dot: true,
					cwd: 'sphinx',
					dest: '.tmp/sphinxenv',
					src: '**/*.*'
				},
				{ // Copy the cmake module to the temporary sphinx environment
					expand: true,
					dot: true,
					cwd: '../cmake/docs',
					dest: '.tmp/sphinxenv',
					src: 'cmake.py'
				},
				{
					expand: true,
					dot: true,
					cwd: '<%= config.app %>',
					dest: '.tmp/sphinxenv/templates/ocmiss',
					src: 'partials/**/*.*'
				}]
			},
			sphinxOutputToDist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '.tmp/sphinxenv/build',
					dest: '<%= config.dist %>/documentation',
					src: '**/*.*'
				}]
			},
			pelicanOutputToDist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '.tmp/pelicangen/',
					dest: '<%= config.dist %>',
					src: '**/*.*'
				}]
			},

			sphinxOutputToDebug: {
				files: [{
					expand: true,
					dot: true,
					cwd: '.tmp/sphinxenv/build',
					dest:'.tmp/generated-doc',
					src: '**/*.*'
				}]
			},
			"extgen": {
				files: [{
					expand: true,
					dot: true,
					cwd: 'extgen',
					src: '**/*.*',
					dest: '<%= config.dist %>/'
				}]
			},
			"extgenDev": {
				files: [{
					expand: true,
					dot: true,
					cwd: 'extgen',
					src: '**/*.*',
					dest: '.tmp/'
				}]
			},
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= config.app %>',
					dest: '<%= config.dist %>',
					src: [
						'*.{ico,png,txt}',
						'data/{,*/}*.json',
						'images/{,*/}*.cur',
						'styles/fonts/{,*/}*.*',
						'assets/**/*.*'
					]
				},
						{
							expand: true,
							cwd: '.tmp',
							dest: '<%= config.dist %>',
							src: [
								'**/*.html',
							]
						},
						{
							src: 'node_modules/apache-server-configs/dist/.htaccess',
							dest: '<%= config.dist %>/.htaccess'
						}, {
							expand: true,
							dot: true,
							cwd: '.',
							src: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
							dest: '<%= config.dist %>'
						}
					   ]
			},
			styles: {
				expand: true,
				dot: true,
				cwd: '<%= config.app %>/styles',
				dest: '.tmp/styles/',
				src: '{,*/}*.css'
			}
		},

		// Run some tasks in parallel to speed up build process
		concurrent: {
			server: [
				'sass:server',
				'copy:styles',
				'jinja2:app'
			],
			dist: [
				'sass',
				'copy:styles',
				'jinja2:app',
				'imagemin',
				'svgmin'
			]
		},

		sitemap: {
			dist: {
				pattern: ['<%= config.dist %>/**/*.html','!<%= config.dist %>/underconstruction.html'],
				siteRoot: '<%= config.dist %>',
				homepage: grunt.option('siteurl') || 'http://next.opencmiss.org',
				changefreq: 'monthly'
			}
		}
	});


	grunt.registerTask('serve', 'start the server and preview your app, --allow-remote for remote access', function (target) {
		if (grunt.option('allow-remote')) {
			grunt.config.set('connect.options.hostname', '0.0.0.0');
		}
		if (target === 'dist') {
			return grunt.task.run(['build', 'connect:dist:keepalive']);
		}

		grunt.task.run([
			'clean:server',
			'merge-json:downloads',
			'concurrent:server',
			'autoprefixer',
			'sphinxgenDebug',
			'exec:pelicangen',
			'babel:dev',
			'copy:extgenDev',
			'connect:livereload',
			'watch'
		]);
	});

	grunt.registerTask('server', function (target) {
		grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
		grunt.task.run([target ? ('serve:' + target) : 'serve']);
	});

	// Generalise into a sphinxgen task.
	grunt.registerTask('sphinxgenDist',[
		'copy:sphinxPrep',
		'exec:sphinxgen',
		'copy:sphinxOutputToDist'
	]);

	grunt.registerTask('pelicanDist',[
		'exec:pelicangen',
		'copy:pelicanOutputToDist'
	]);

	grunt.registerTask('sphinxgenDebug',[
		'copy:sphinxPrep',
		'exec:sphinxgen',
		'copy:sphinxOutputToDebug'
	]);



	grunt.registerTask('build',[
		'clean:dist',
		'merge-json:downloads',
		'concurrent:dist',
		'babel:dist',
		'useminPrepare',
		'autoprefixer',
		'concat',
		'cssmin',
		'uglify',
		'copy:dist',
		'sphinxgenDist',
		'pelicanDist',
		'rev',
		'usemin',
		'relativeRoot:dist',
		'htmlmin',
		'copy:extgen',
		'sitemap:dist'
	]);

grunt.registerTask('dist', function(){
	var url = grunt.option('siteurl');
	if (typeof url === "undefined" || url === null || url === "" || url === 0){
		grunt.fail.fatal("No siteurl set. Please set the siteurl root for the sitemap to be generated. grunt --siteurl=[URL]");
	}
	grunt.task.run('build');
});

	grunt.registerTask('default', [
		'dist'
	]);
};
