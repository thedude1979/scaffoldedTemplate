//var _ = require('underscore');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    bower_concat: {
      all: {
        callback: function(mainFiles, component) {
          return _.map(mainFiles, function(filepath) {
            // Use minified files if available
            var min = filepath.replace(/\.js$/, '.min.js');
            return grunt.file.exists(min) ? min : filepath;
          });
        },
        separator : ';',
        mainFiles: {
          "font-awesome": ["css/font-awesome.min.css"]
        },
        dest: {
          'js': 'public/js/_bower.js',
          'css': 'public/css/_bower.css'
        },
        exclude: [
          'bootstrap',
        ],
      },
      css: {
        mainFiles: {
          "font-awesome": ["css/font-awesome.min.css"]
        },
        dest: {
          'css': 'public/css/_bower.css'
        },
        exclude: [
          'bootstrap',
        ],
      }
    },
    copy: {
      release: {
        files: [
          {expand:true, flatten: true, src: ['src/js/*'], dest: 'public/js/'},
          {expand:true, flatten: true, src: ['bower_components/bootstrap/dist/css/bootstrap.min.css'], dest: 'public/css/'},
          {expand:true, flatten: true, src: ['src/css/*'], dest: 'public/css/'},
          {expand:true, flatten: true, src: ['bower_components/bootstrap/dist/fonts/*'], dest: 'public/fonts/'},
          {expand:true, flatten: true, src: ['bower_components/font-awesome/fonts/*'], dest: 'public/fonts/'},
          {expand:true, flatten: true, src: ['bower_components/leaflet-draw/dist/images/*'], dest: 'public/css/images/'},
          {expand:true, flatten: true, src: ['src/fonts/*'], dest: 'public/fonts/'},
        ]
      },
      js: {
        files: [
          {expand:true, flatten: true, src: ['src/js/*'], dest: 'public/js/'},
        ]
      },
      css: {
        files: [
          {expand:true, flatten: true, src: ['bower_components/bootstrap/dist/css/bootstrap.min.css'], dest: 'public/css/'},
          {expand:true, flatten: true, src: ['src/css/*'], dest: 'public/css/'},
          {expand:true, flatten: true, src: ['bower_components/leaflet-draw/dist/images/*'], dest: 'public/css/images/'},
        ]
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      release: {
        files: {
          'public/js/complete.min.js': ['public/js/*.js'],
        },
      },
    },
    cssmin: {
      target: {
        files: {
          'public/css/complete.min.css':['public/css/*.css']
        }
      }
    },
    clean: {
      all: {
        src: ['public/css/*','public/js/*','public/fonts/*','public/css/images']
      },
      release: {
        src: ['public/css/*.css','!public/css/*.min.css','public/js/*.js','!public/js/complete.min.js']
      },
      css_release: {
        src: ['public/css/*.css','!public/css/complete.min.css']
      },
      css: {
        src: ['public/css/*']
      },
      test: {
        options: {
          'no-write': true
        },
        src: ['public/css/*','public/js/*','public/fonts/*']
      }
    },
    watch: {
      js: {
        files: ['src/js/*'],
        tasks: ['copy:js']
      },
      css: {
        files: ['src/css/*'],
        tasks: ['clean:css', 'bower_concat:css', 'copy:css', 'cssmin','clean:css_release']
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task(s).
  grunt.registerTask('default', ['clean:all','bower_concat:all','copy:release','uglify:release','cssmin','clean:release']);
  grunt.registerTask('debug', ['clean:all','bower_concat:all','copy:release','cssmin','clean:css_release']);
  grunt.registerTask('test', ['bower_concat']);
};
