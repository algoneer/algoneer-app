# 7s-ui - Example Application

This repository contains an example application showing how to use the 7s-ui toolkit.

## Installation

First, install the required node modules:

    npm install

## Dependency Handling

This project depends on the 7scientists UI toolkit as well as the Worf UI
toolkit, which are both included as submodules. We require these two modules
via NPM, which ensures that their dependencies are install recursively.

## Checkout out submodules (7s-ui)

This project relies on our generic UI components library `7s-ui`, which is included
as a submodule. Hence, to build the project you will need to check out the
submodules, which you can do with the following two commands:

    git submodule init
    git submodule update

This will initialize all submodules and check them out into the appropriate
directories. Please note that if you want to make changes to `7s-ui` (and you can)
you should first check out the correct branch (e.g. `master`) as by default
the submodule will be in a detached head state.

## Building

To build the web application, run

    # development version with test settings (i.e. mocked APIs):
    npm run-script make-web-dev-test
    # production version:
    npm run-script make-web

To build the desktop application, run

    # development version:
    npm run-script make-desktop-dev-text
    # production version:
    npm run-script make-desktop
