var reporter={
    beforeSession: function (config, capabilities, specs) {
      require('@babel/register');
    },

    specStarted: function(result) {
       // await somethingAsync();
        console.log('Spec started: '+ result.fullName);
      },
    
      specDone: function(result) {
        console.log('Spec Result: ' + result.description + ' was ' + result.status);
    
        for(var i = 0; i < result.failedExpectations.length; i++) {
          console.log('Failure: ' + result.failedExpectations[i].message);
          console.log(result.failedExpectations[i].stack);
        }
    
        console.log(result.passedExpectations.length);
      }
}

module.exports=reporter