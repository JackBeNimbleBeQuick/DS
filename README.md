# DS Typescript Data Structures

## A Kickstarter Kit for typescript test driven patterns with no js frameworks

### A series of Data Structure
- with the intent to use as part of the TUC pattern 8^)
  - test driven design
  - validated protocol interfaces
  - typescript with unit Tests
  - use of jest and ts-jest

### Get started

- may I suggest Node Version Management [npm nvm](https://github.com/creationix/nvm) | [npm nvm-windows](https://github.com/coreybutler/nvm-windows) if you have not done so yet
  - this package assembled with npm v8.9.4
- install and setup typescript [ts](https://www.npmjs.com/package/typescript)
- run all tasks within bin/ this is meant as distribution point for all parts of a fully working implementation

...

- git clone DS
- mkdir MyDSLib
- cd MyDSLib
- npm install

### Command lines
- npm test
- tsc (when you have typescript installed global)
  - tsc builds to js directory there is no clean up
  - adjust CompilerOptions to meet your needs a) outDir b) target

### Known issues
- library is still in development and not ready for production
- linkedList: still has some circular references in the secondary pointers, working to fix that
- linkedList: as part of exploring the pattern it does not follow the classic pattern, that may change over time.... 8^) still some things to prove out to myself here

#### Thanks for coming to the show, come on back when the full band is here
