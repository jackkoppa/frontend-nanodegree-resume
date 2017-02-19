# Notes
## Differences from Udacity Project Details
In different portions of the project, this resume diverges from the project specifications given by Udacity. This was primarily done to increase reusability for future projects, after deciding that this would be a great opportunity to create a central feed of biographical information for resumes & portfolios. The main change was breaking out the resume *data* into a separate repo (called [`resume-data`](https://github.com/jackkoppa/resume-data)), where future projects and jobs could be added. `resume-data` returns both JSON and JS object versions of this info; in the case of this resume, the JS object is used by cloning the `resume-data` repo into the project, but the door has been left open for future projects easily using a JSON feed from a hosted source. Most of the changes below follow from that decision, along with a few development preferences (e.g. Sass).

- After cloning `resume-data`, all biographical content can be found within `resume-data/resume.js`. It is maintained, with comments, in `resume-data/resume_annotated.json`. Meanwhile, `js/resumeBuilder.js` still handles all functionality for this project
- Different resume object naming patterns
    - `dates` - now an object with 4 properties (`startMonth`, `startYear`, `endMonth`, `endYear`), to allow for more flexible naming functions in future projects (affects `education`, `work`, and `projects`)
    - `education.schools.minor` - added an optional `minor` property to schools
    - `work.jobs.job.urls` - added related URLs for each job
    - `projects.projects.project`
        - `skills` - an optional array for the skills used on that project
        - `description` - is now an object, with `short` and `long` properties; the longer description would be useful for future portfolios with more in-depth analysis of each project
        - `imgDir` - in the `resume-data` repo, images are organized by project; this explains where to look
        - `urls` - associated URLs (either the final hosted product, and/or GitHub)
    - `display` - the display function for each of the 4 main properties is left out of the `resume-data` repo (so that JSON can be used), and is added within this project, in `resumeBuilder.js`
- Project uses npm & Grunt for task automation
- Uses Sass for all styling; source files are maintained in the `scss` directory according to Udacity style guides; the css files cannot be gauranteed to be up to Udacity styles.
- The production build uses minified css & js; non-minified versions are used in development
