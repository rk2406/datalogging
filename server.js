var admin=require('firebase-admin')
var serviceAccount = require("./fire-demo-bd419-firebase-adminsdk-9387j-a9b5e9bb36.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fire-demo-bd419.firebaseio.com"
});
    var ref = admin.app().database().ref();
    var sensors = ref.child('server/users');
    let globe,final;
    setInterval(function(){
        globe=Math.floor((Math.random()*100)+1);
        final=Math.floor((Math.random()*100)+1);
        sensors.push({
            globe:globe,
            final:final
           });    
    },1000);
    
    

	

