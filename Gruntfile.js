module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {

      },
      main: {
        files: {
          'resources/public/js/out.js': ['resources/public/js/lib/*.js']
        }
      }
    },

    sass: {
      main: {
        options: {
          outputStyle: 'compressed',
          includePaths: [
            'bower_components/bourbon/app/assets/stylesheets',
            'bower_components/sass-mediaqueries',
            'bower_components/normalize-css'
          ]
        },
        files: {
          'resources/public/css/style.css': 'scss/style.scss'
        }
      }
    },

    copy: {
      main: {
        src: 'bower_components/normalize-css/normalize.css',
        dest: 'bower_components/normalize-css/_normalize.scss',
      }
    },

    watch: {
      sass: {
        files: ['scss/**/*.scss'],
        tasks: ['sass']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');

  grunt.registerTask('build', ['copy', 'uglify', 'sass']);
  grunt.registerTask('default', ['build', 'watch'])
};
