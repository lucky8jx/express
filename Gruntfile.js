module.exports = function(grunt) {
	var cssFiles = [
		'public/stylesheets/style.css'
	],
		jsFiles = [
			'public/javascripts/main.js'
		];
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		cssmin: {
			options: {
				banner: '/* <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			combin: {
				files: {
					'public/stylesheets/<%= pkg.name %>.min.css': cssFiles
				}
			}
		},
		uglify: {
			options: {
				banner: '/* <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			dist: {
				files: {
					'public/javascripts/<%= pkg.name %>.min.js': jsFiles
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['cssmin', 'uglify']);
	grunt.registerTask('buildcss', ['cssmin']);
};