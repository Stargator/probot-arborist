"use strict";

//TODO: This works as is. Need to add configuration file
module.exports = function (robot) {

  const ISSUE_TYPES = {
    badBranchName: "badBranchName",
    branchForClosedPullRequest: "branchForClosedPullRequest",
    branchForMergedPullRequest: "branchForMergedPullRequest"
  };

  var badBranchNameIssueTemplate = {
    "title": "Recently created branch names don't conform to policy",
    "body": "The following branches were found to not met branch name policy:\n"
  };

  var botCreatedIssues = [];

  robot.on('create', async context => {
    var createPayload = context.payload;

    if ( createPayload.ref_type === 'branch' ) {
      branchCreated(createPayload, context);
    }
  })

  /**
   * Looks at all issues opened/created and looks for those that seem to be created by the bot.
   */
  robot.on('issues.opened', async context => {
    var issuesOpenedPayload = context.payload;

    if (issuesOpenedPayload.issue.title === badBranchNameIssueTemplate.title) {
      botCreatedIssues.push({issue: issuesOpenedPayload.issue, contents: "", type: ISSUE_TYPES.badBranchName});
    }
  })

  /**
   * Looks at all pull requests opened/created and looks for those that seem to be created by the bot.
   */
  robot.on('pull_request.opened', async context => {
    // If a Pull Request is opened for a branch with a bad name, update bot created issue with link to Pull Request
  })

  /**
   * Looks at all pull requests opened/created and looks for those that seem to be created by the bot.
   */
  robot.on('pull_request.closed', async context => {
    // After a Pull Request was closed, wait a number of days before the bot will add related branch to issue.
    // After a Pull Request was merged, wait a number of days before the bot will add related branch to issue.
  })

  /**
   * Looks at all pull requests opened/created and looks for those that seem to be created by the bot.
   */
  robot.on('pull_request.reopened', async context => {
    // If a pull request is reopened for a bad branch name, do something
  })

  function branchCreated(payload, context) {

    var branchName = payload.ref;
    var branchNameRules = "[a-zA-Z-_][0-9]";  // TODO: Need to pull from configuration file

    var isBranchValid = branchName.match(branchNameRules);

    if (!isBranchValid) {
      if (botCreatedIssues.length === 0) {
        var newIssue = context.repo(badBranchNameIssueTemplate);
        newIssue.body = newIssue.body + "* " + branchName + "\n";
        newIssue.repo = payload.repository.name;

        if (botCreatedIssues.length === 1) {
          botCreatedIssues[ 0 ].contents = newIssue;
        } else {
          // TODO Likely an error occurred, determine what to do.
        }
        context.github.issues.create(newIssue);
      } else {
        if (botCreatedIssues.length === 1) {
          // Update existing issue with new branch to cut.
          var issueContent = botCreatedIssues[0].contents;
          issueContent.body = issueContent.body + "* " + branchName + "\n";
          context.github.issues.edit();
        } else {
          // TODO In case where a multiple issues are created by Arborist, determine what to do.
        }
      }
    }
  }
  // If the branch does not meet naming standard, then create an issue listing that branch
  // Track any issues created and whether they get closed/completed. If so, create a new one.
};
