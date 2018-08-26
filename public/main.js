(function(){
    const config={

        apiKey:"AIzaSyB0X-5Mmu1YiEMs9q9Uw96zZS5HUPQREsk",
        authDomain:"fire-demo-bd419.firebaseapp.com",
        databaseURL:"https://fire-demo-bd419.firebaseio.com",
        storageBucket:"fire-demo-bd419.appspot.com",
    };
    firebase.initializeApp(config);

    var lastPlayerRef = firebase.database().ref('server/users').limitToLast(1);
    lastPlayerRef.on("value",function(data){
        var k;
        for(var key in data.val())
            k=key;
        var n = (data.val()[k]);
        n = n['data'];
        var sensor_1 = n['globe'];	
        var sensor_2 = n['final'];
        console.log(+sensor_1 +"#"+sensor_2);
    })
    
}
    ());
