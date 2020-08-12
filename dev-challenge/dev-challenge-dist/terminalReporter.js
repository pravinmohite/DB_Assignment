var jasmine=require('jasmine')
var reporter=require('./spec/support/customReporter')
var Jasmine=new jasmine();

//load config file
Jasmine.loadConfigFile('./spec/support/jasmine.json')

//clean default reporter
Jasmine.env.clearReporters();

//register the custom reporter
Jasmine.addReporter(reporter)

//execute
Jasmine.execute();