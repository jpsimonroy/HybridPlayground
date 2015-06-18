module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    uglify: {
      minify: {
        files: {
          'www/index.js': ['www/index.js']
        }
      }
    },

    bower: {
      install: {
        options: {
          copy: false
        }
      }
    },

    clean: {
      build: ['www']
    },

    copy: {
      html: {
        src: 'app/index.html',
        dest: 'www/index.html'
      },
      images: {
        expand: true,
        flatten: true,
        src: 'app/images/*',
        dest: 'www/images/',
        filter: 'isFile'
      },
      glyphicons: {
        expand: true,
        flatten: true,
        src: ['bower_components/bootstrap-sass-official/assets/fonts/bootstrap/**'],
        dest: 'www/fonts/bootstrap/',
        filter: 'isFile'
      },
      fonts: {
        expand: true,
        flatten: true,
        src: ['bower_components/bootstrap-material-design/fonts/**', 'bower_components/font-awesome/fonts/**'],
        dest: 'www/fonts/',
        filter: 'isFile'
      }
    },

    sass: {
      dist: {
        src: 'app/styles/index.scss',
        dest: 'www/styles/index.css',
        options: {
          includePaths: ['bower_components']
        }
      }
    },

    browserify: {
      dist: {
        src: 'app/index.js',
        dest: 'www/index.js',
        options: {
          transform: ['reactify']
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 8000,
          base: 'www'
        }
      }
    },

    shell: {
      mocha: {
        command: './node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha -- -R spec'
      },
      localProps: {
        command: "sed -i index 's/API_CONTEXT_URI/http:\\/\\/192.168.1.108:5556/g' www/index.js"
      }
    },

    watch: {
      options: {
        spawn: true,
        livereload: true
      },
      js: {
        files: ['app/**/*.js', 'app/**/*.jsx'],
        tasks: ['browserify', 'shell:localProps']
      },
      css: {
        files: ['app/**/*.scss'],
        tasks: ['sass']
      },
      props: {
        files: ['app/index.js'],
        tasks: ['shell:localProps']
      }
    }

  });

  grunt.registerTask('build_local', ['clean', 'bower', 'copy', 'sass', 'browserify', 'shell:localProps']);
  grunt.registerTask('build_staging', ['clean', 'bower', 'copy', 'sass', 'browserify', 'shell:stagingProps', 'uglify:minify']);
  grunt.registerTask('build_prod', ['clean', 'bower', 'copy', 'sass', 'browserify', 'shell:prodProps', 'uglify:minify']);

  grunt.registerTask('default', ['clean', 'bower', 'copy', 'sass', 'browserify', 'shell:localProps', 'connect', 'watch']);

}