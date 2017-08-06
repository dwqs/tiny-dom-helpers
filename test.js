let testsContext = require.context('./karma-test', true, /\.spec\.js$/);

testsContext.keys().forEach(testsContext);
