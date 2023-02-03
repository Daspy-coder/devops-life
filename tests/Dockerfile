FROM buildkite/puppeteer:v3.0.4

RUN  npm install mocha@7.2.0

ENV  PATH="${PATH}:/node_modules/.bin"

COPY . tests/

CMD [ "mocha", "--recursive", "/tests/spec", "--globals", "browser,page", "--file", "/tests/setup.js", "--timeout", "20000" ]