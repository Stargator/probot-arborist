"use strict";

//TODO: This works as is. Need to add configuration file
module.exports = function (robot) {

  var branchNameIssueTemplate = {
    "title": "Recently created branch names don't conform to policy",
    "body": "The following branches were found to not met branch name policy:\n",
    "owner": "probot", // TODO: Need to pull from configuration file
    "repo": ""
  };

  var botCreatedIssues = [];

  robot.on('create', async context => {
    var payload = context.payload;

    if ( payload.ref_type === 'branch' ) {
      branchCreated(payload, context);
    }
  })

  robot.on('issues.opened', async context => {
    var payload = context.payload;

    if (payload.issue.title === branchNameIssueTemplate.title) {
      botCreatedIssues.push(payload.issue);
    }
  })

  function branchCreated(payload, context) {

    var branchName = payload.ref;
    var branchNameRules = "[a-zA-Z-_][0-9]";  // TODO: Need to pull from configuration file

    var isBranchValid = branchName.match(branchNameRules);

    if (!isBranchValid) {
      if (botCreatedIssues.length === 0) {
        var newIssue = branchNameIssueTemplate;
        newIssue.body = newIssue.body + "* " + branchName;
        newIssue.repo = payload.repository.name;

        context.github.issues.create(newIssue);
      } else {
        // Find issue for branch names that don't meet policy
      }
    }
  }
  // If the branch does not meet naming standard, then create an issue listing that branch
  // Track any issues created and whether they get closed/completed. If so, create a new one.
};
