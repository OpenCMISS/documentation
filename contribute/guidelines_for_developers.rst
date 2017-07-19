=========================
Guidelines for developers
=========================

This page details the development process that should be followed for developing OpenCMISS.

----------------
Before you begin
----------------

Before you begin you should:

- Familiarise yourself with the latest coding style (see code_style)

- In your GitHub account, watch the appropriate repo (e.g. iron, zinc, examples, documentation, or website)

- Study the git workflow (see http://sourceforge.net/apps/mediawiki/opencmiss/index.php?title=Git_Workflow)

-------------------
Development Process
-------------------

The development process that should be followed is:

1. Discuss your problem and proposal either at the OpenCMISS meeting or on the mailing list.

2. Create a github issue for your planned work.

  a. A description of the change to be made

  b. The general area of the code the change will need to be made in

  c. Any progress that has been made on the change to date (if relevant)

  d. Any pre-requisite functionality not currently in OpenCMISS required for the change

  e. Any other relevant information, for example references of relevant papers

  f. The conditions necessary for the change to be signed off and the item closed, i.e. what testing conditions need to be satisfied.

  You can change the severity field in the new tracker item from the default of 'feature', to whatever you deem the severity. Once the item has been submitted the item, I would suggest that you assign the item to yourself. (Senior developers will assign a milestone?)

3. Create a git branch for your work and check it out.

4. Commit and push your changes often to your repository with appropriate commit messages (as described in the next section). Commit small and often!

5. Write a test example..

------------------
Committing Process
------------------

The committing process that should be followed is:

1. The commit message format should be: summary, blank line, Github issue tag (e.g. #21), blank line, more detail.

2. Update the tracker often so as to reflect the progress and problems faced. Make the tracker tell the story of the change! Some of this will be done by the post-commit hook but add extra comments if required.

3. Run tests on your changes and run all the examples on buildbot to make sure that they all pass. Include a buildbot link to the build in the tracker.

4. Make sure all compiler warnings are addressed.

5. When you are ready to have your code merged back into the trunk create a “pull request” for your changes. The Github Issue should be changed to “resolved/fixed”.

6. Approach or nominate people to review your changes and place this information in the Github Issue.

--------------
Review Process
--------------

The review process that should be followed is:
1. Once you have accepted the role of reviewer change the tracker to assign it to yourself.

2. Go through the code and make comments on the GitHub pull request on any required changes and corrections and/or questions about the code.

3. You should review coding style, code clarity, existence of tests, implementation method, documentation, OpenCMISS notes.

4. During the review the commit messages should state what has changed and be independent of the review comments.

5. The reviewer should ensure that the examples run using the buildbot sandbox.

6. When the review has finished and the code is ready to be pulled into the main repository the reviewer should add a comment to this effect in the pull request and the GitHub isssue. The code reviewer should change the tracker status to “verified/fixed”.

7. Once the tracker item has been changed to verified/fixed and the repository manager is happy with the process they will pull the code into the repository and changed the GitHub Issue to “closed/fixed”.

---------------------
Collaboration Process
---------------------

The collaboration process that should be followed is:

1. The collaboration process should be very similar to the commit process above (with the exception of changing the GitHub Issue status tag).

2. If developers are working particularly close on an item git and GitHub allow for other modes of collaboration. A few of these include:

  -  Set up each of your collaborators' repositories as a remote and then merge their changes into your repository.

  -  Give collaborators access to your repository so that they can push changes directly.