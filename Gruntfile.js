/**
 * Author: Jeroen Bijl
 * Description: Gruntfile DrupalJam
 */

module.exports = function(grunt) {

// ====================================================================
 // require('time-grunt')(grunt);

// ====================================================================
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

// ====================================================================

    sass: {
      // Release
      dist: {
        options: {
          style: 'compressed',
          sourcemap: 'none'
        },
        files: {
          'dist/styles/style.css':'sass/style.scss',
        },
      },
      // Development
      dev: {
        options: {
          style: 'expanded',
        },
        files: {
          'dist/styles/style.css':'sass/style.scss',
        },
      },

    },

// ====================================================================

    uglify: {
      // Release
      dist: {
        options: {
          mangle: true,
          compress: true,
          banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */',
        },
        files: {
          'dist/js/script.min.js': ['js/jquery.js', 'js/script.js']
        },
      },
      // Development
      dev: {
        options: {
          mangle: false,
          compress: false,
          preserveComments: 'all',
          beautify: true
        },
        files: {
          'dist/js/script.min.js': ['js/jquery.js', 'js/script.js']
        },
      },
    },

// ====================================================================

    jshint: {
      options: {
        globals: {
          jQuery: true
        },
        },
      files: {
        src: ['Gruntfile.js', 'js/script.js'],
      }
    },

// ====================================================================

    watch: {
      scripts: {
        files: ['Gruntfile.js', 'js/script.js','sass/*.scss'],
        tasks: ['sass:dev','uglify:dev', 'jshint'],
      },
      options: {
        spawn: false,
      }
    },

  });

// ====================================================================
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

// ====================================================================
  grunt.registerTask('default', ['sass:dev','uglify:dev' , 'watch']);
  grunt.registerTask('release', ['jshint','uglify:dist', 'sass:dist']);

};
