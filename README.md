# Project Details
## Background
An assignment for Udacity's Front-End Web Developer Nanodegree. Forked from the [Udacity repo](https://github.com/udacity/frontend-nanodegree-resume). Project rubric available [here](https://review.udacity.com/?_ga=1.189245867.12280332.1465333852#!/projects/2962818615/rubric).

## Getting Started
### Submodule Dependency
In order to allow for future modular usage of resume data, the biographical JSON has been broken out into a separate repo. This repo depends upon that repo ([`resume-data`](https://github.com/jackkoppa/resume-data)) for its data and images. To make sure the submodule is included when you clone this repo, use the following modified clone command when starting:
```shell
git clone --recursive https://github.com/jackkoppa/frontend-nanodegree-resume
```

If you've already cloned `frontend-nanodegree-resume`, and find that `resume-data` is empty, you can update the dependency with the following command from the project root:
```shell
git submodule update --init --recursive
```

More info in the [`resume-data` documentation](https://github.com/jackkoppa/resume-data#readme), and at this [GitHub article](https://github.com/blog/2104-working-with-submodules) on submodules.

### General Dependencies
* Node.js & npm ([link](https://nodejs.org/en/download/))
* Grunt.js (after installing Node & npm, run `npm install -g grunt-cli`. [More info](https://gruntjs.com/getting-started))
* ImageMagick (required, in order to use responsive images. [Download instructions](https://www.imagemagick.org/script/download.php))

### npm
After verifying the submodule, just 2 quick steps to get up & running. Run

```shell
npm install
```

to install the dev dependencies. After that, run one of the following Grunt tasks:

* compile & lint files, for both development (`dev/`) & production (`dist/`) builds:
    ```shell
    grunt
    ```


* compile, lint, & launch a livereloading server (`localhost:8000`) for the development build:
    ```shell
    grunt serveDev
    ```


* compile, lint, & launch a persistent server without livereload (`localhost:8080`) for the production build:
    ```shell
    grunt serveProd
    ```


## Notes
The modular approach required a few deviations from the initial Udacity guidelines. Check out an explanation of those changes in [notes.md](notes.md).