# Contributing to Algoneer Front-End

Thanks a lot for your interest to contribute to this repository!

## Development Setup

This guide is supposed to help you to contribute code.

### Git Hooks

This repository uses [Git Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) for running scripts before committing or pushing new code to prevent errors early. Please use the Git Hooks by running:
```bash
git config --local core.hooksPath .githooks/
```

It's better not to use this, but if you ever need to locally create a commit with errors. Make sure to fix those errors before merging your branch.

```bash
# Commit without doing pre-commit checks
lookMomNoHands() {
  git commit --no-verify -m "$1"
}
```
