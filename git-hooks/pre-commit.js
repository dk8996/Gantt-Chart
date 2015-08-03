'use strict';
var exec = require('child_process').exec;

// Executes shell command
exec('git branch | grep \'*\' | sed \'s/* //\'', function (err_branch, stdout) {
    var branchName = stdout;
    // Don't run on rebase
    if (branchName !== '(no branch)') {
        exec('git diff --cached --quiet', function (err_diff) {
            // only run if there are staged changes
            // i.e. what you would be committing if you ran "git commit" without "-a" option.
            if (err_diff) {
                // stash unstaged changes - only test what's being committed
                exec('git stash --keep-index --quiet', function () {
                    exec('grunt {{task}}', function (err_tasks, stdout, stderr) {
                        console.log(stdout);
                        exec('git stash pop --quiet', function () {
                            var exitCode = 0;
                            if (err_tasks) {
                                console.log(stderr);
                                exitCode = -1;
                            }
                            process.exit(exitCode);
                        });
                    });
                });
            }
        });
    }
});