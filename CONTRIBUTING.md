# Contribution Guidelines

We encourage you to contribute to this open source project. This should be as easy as possible for you, but please follow the guidelines here. Following them shows that you respect the time of the developers managing and developing this project. In return, they should reciprocate that respect in addressing your issue or assessing patches and features.

## Table of Contents

- [Raising Issues](#raising-issues)
  - [Bug Reports](#bug-reports)
  - [Feature Requests](#feature-requests)
- [Pull Requests](#pull-requests)
- [IBM Contributor License Agreement](#IBM-Contributor-License-Agreement)

## Raising Issues

When raising an issue, use the most appropriate issue template, and follow these guidelines:


### Bug Reports

A bug is a **demonstrable problem** that is caused by the code in the repository.

Guidelines for bug reports:

1. **Use [the GitHub issue search](https://github.com/RuntimeTools/chai-openapi-response-validator/issues)** &mdash; check if the issue has already been reported.
2. **Check if the issue has been fixed** &mdash; try to reproduce it using the latest `master` or development branch in the repository.
3. **Isolate the problem** &mdash; create a test case to demonstrate your issue. Provide either a repo, gist, or code sample to demonstrate you problem.

A good bug report shouldn't leave others needing to chase you up for more information. Please try to be as detailed as possible in your report. What is your environment? What steps will reproduce the issue? What would you expect to be the outcome? All these details will help people to fix any potential bugs.


### Feature Requests

Feature requests are welcome. But take a moment to find out whether your idea fits with the scope and aims of the project. It's up to *you* to make a strong case to convince the project's developers of the merits of this feature. Please provide as much detail and context as possible.


## Pull Requests

- Good PRs are a fantastic help. PRs for assertions, bug fixes, enhancing the interfaces, increasing test coverage are always welcome.
- Please adhere to the coding conventions used throughout a project (indentation, accurate comments, etc.) and any other requirements (e.g. linter and test coverage checks). PRs are scrutinized for coding-style. All source code files include the Apache v2.0 license header.
- PRs should remain focused in scope and avoid containing unrelated commits.
- **Please ask first** before embarking on any significant pull request (e.g. implementing features, refactoring code), otherwise you risk spending a lot of time working on something that the project's developers might not want to merge into the project.
- **IMPORTANT**: In order for us to accept pull requests from a new contributor, the contributor must indicate that they accept and agree to be bound by the terms of the IBM Contributor License Agreement below. Please do this by adding your name to the [AUTHORS file](https://github.com/RuntimeTools/chai-openapi-response-validator/blob/master/AUTHORS.md)
in your first pull request.

Follow this process if you'd like your work considered for inclusion in the project:

1. [Fork](http://help.github.com/fork-a-repo/) the project, clone your fork, and configure the remotes:

```bash
# Clone your fork of the repo into the current directory
git clone https://github.com/<your-username>/<repo-name>
# Navigate to the newly cloned directory
cd <repo-name>
# Assign the original repo to a remote called "upstream"
git remote add upstream https://github.com/<upstream-owner>/<repo-name>
```

2. If you cloned a while ago, get the latest changes from upstream:

```bash
git checkout <dev-branch>
git pull upstream <dev-branch>
```

3. Create a new topic branch (off the main project development branch) to contain your feature, change, or fix:

```bash
git checkout -b <topic-branch-name>
```

4. Test that your code works:

```bash
# run all tests
npm test

# run all tests, with coverage check
npm run test:coverage

# run all tests, with coverage check, and opens the coverage report in your browser
npm run test:coverage:browse

# run all tests, with Stryker mutation testing
npm run test:mutation

# run eslint check
npm run lint

# run all checks: linting, tests, code coverage, and mutation testing
npm run test:full
```

5. Commit your changes in logical chunks. Use Git's [interactive rebase](https://help.github.com/articles/interactive-rebase) feature to tidy up your commits before making them public.

    - We use [Husky](https://github.com/typicode/husky) to run code-quality checks on every commit and push. This informs you early on if your code is not ready to be saved in Git history. If a commit or push fails a check, just address the problem, then commit or push again.

6. Locally merge (or rebase) the upstream development branch into your topic branch:

```bash
git pull [--rebase] upstream <dev-branch>
```

7. Push your topic branch up to your fork:

```bash
git push origin <topic-branch-name>
```

8. [Open a Pull Request](https://help.github.com/articles/using-pull-requests/) with a clear title and description. Link it to the relevant issue.


## IBM Contributor License Agreement
Version 1.0.1 - January 25th, 2017

In order for You (as defined below) to make intellectual property Contributions (as defined below) now or in the future to IBM GitHub repositories, You must agree to this Contributor License Agreement ("CLA"). Please read this CLA carefully before accepting its terms. By accepting the CLA, You are agreeing to be bound by its terms. If You submit a Pull Request against an IBM repository on GitHub You must include in the Pull Request a statement of Your acceptance of this CLA.
As used in this CLA: (i) "You" (or "Your") shall mean the entity that is making this Agreement with IBM; (ii)"Contribution" shall mean any original work of authorship, including any modifications or additions to an existing work, that is submitted by You to IBM for inclusion in, or documentation of, any of the IBM GitHub repositories; (iii) "Submit" (or "Submitted") means any form of communication sent to IBM (e.g. the content You post in a GitHub Issue or submit as part of a GitHub Pull Request).

This agreement applies to all Contributions You Submit.

- You will only Submit Contributions where You have authored 100% of the content.

- You will only Submit Contributions to which You have the necessary rights. This means that if You are employed You have received the necessary permissions from Your employer to make the Contributions.

- Whatever content You Contribute will be provided under the Apache v2.0 license. You can read a copy of the Apache v2.0 License at http://www.apache.org/licenses/LICENSE-2.0.  Unless You explicitly state otherwise, any Contribution intentionally submitted for inclusion in the Work by You to the Licensor shall be under the terms and conditions of this License, without any additional terms or conditions. Notwithstanding the above, nothing herein shall supersede or modify the terms of any separate license agreement you may have executed with Licensor regarding such Contributions.

- You understand and agree that the Project and Your contributions are public, and that a record of the contribution (including all personal information You submit with it, including Your sign-off) is maintained indefinitely and may be redistributed consistent with the license(s) involved.

- You understand that the decision to include Your Contribution is entirely that of the Project and this agreement does not guarantee that the Contribution will be included in the Project.

- You are not expected to provide support for Your Contribution. However you may provide support for free, for a fee or not at all. You provide Your Contribution on an "AS IS" BASIS as stated in the License.

You will promptly notify the Project if You become aware of any facts or circumstances that would make these commitments inaccurate in any way. To do so, please an issue on the project's GitHub [issue tracker](https://github.com/RuntimeTools/chai-openapi-response-validator/issues).
If You think the Project could make use of content which You did not author, please talk to a committer on the Project. If they like Your idea, they will know the process to get it included.



## Attribution

These Contribution Guidelines are adapted from the Chai Contribution Guidelines, available at https://github.com/chaijs/chai/blob/master/CONTRIBUTING.md
