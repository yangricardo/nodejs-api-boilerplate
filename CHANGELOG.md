# Changelog

## 2021-04-16

- Project started
- Add base typescripts dependencies `yarn add typescript tslib ts-node ts-node-dev tsconfig-paths`
- Typescript init configuration: `yarn tsc --init`
  - enable advanced options for typescript
- install express `yarn add express && yarn add -D @types/express`
- install reflect-metadata to enable typescript decorators: `yarn add reflect-metadata`
- install node typescript definitions
- build script
- dev / prod server application
- [Typescript / ESLINT / Jest / Prettier / Husky configuration](https://medium.com/@oxodesign/node-js-express-with-typescript-eslint-jest-prettier-and-husky-part-2-f129188ce404)
  - eslint start configuration
  - prettier configuration
  - editorconfig
- [Jest configuration](https://dev.to/ornio/node-js-express-with-typescript-eslint-jest-prettier-and-husky-part-3-1l8c)
- Express scalablle configuration
  - handle assync error middleware
  - celebrate / joi to request validations
  - AppError helper class to throw application errors
  - EnvironmentConfiguration to provide environement variables configuration
- typeorm configuration
