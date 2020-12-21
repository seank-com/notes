# Git Notes

### Updating submodules

```
git submodule update --init --recursive
```

### Keeping your fork up to date

1. Clone your fork:

    ```
    git clone git@github.com:YOUR-USERNAME/YOUR-FORKED-REPO.git
    ```
2. Add remote from original repository in your forked repository:
    ```
    cd into/cloned/fork-repo
    git remote add upstream git://github.com/ORIGINAL-DEV-USERNAME/REPO-YOU-FORKED-FROM.git
    git fetch upstream
    ```
3. Updating your fork from original repo to keep up with their changes:
    ```
    git pull upstream master
    ```

### Updating projects that require tags to package

1. add and commit any changes

2. tag the current commit and push

    ```
    git tag v#.#.#.#
    git push origin --tags
    ```
