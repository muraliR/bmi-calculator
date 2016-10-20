App.controller('home', function (page) {

    $(page).delegate('.submit-button','click',function(){
        var weight = $('input[name="weight"]').val();
        var height = $('input[name="height"]').val();
        var age = $('input[name="age"]').val();
        var waist = $('input[name="waist"]').val();
        var hip = $('input[name="hip"]').val();
        var sex = $('input[name="gender"]').val();

        if(weight.length == 0){
            launchDialog("Weight");
            return false;
        }

        if(height.length == 0){
            launchDialog("Height");
            return false;
        }

        if(age.length == 0){
            launchDialog("Age");
            return false;
        }

        if(waist.length == 0){
            launchDialog("Waist");
            return false;
        }

        if(hip.length == 0){
            launchDialog("Hip");
            return false;
        }

        input_data = {
                "weight":{"value":weight,"unit":"kg"},
                "height":{"value":height,"unit":"cm"},
                "sex":sex,
                "age":age,
                "waist":waist,
                "hip":hip
            };

        $.ajax({
            url : '/calculate',
            type : 'GET',
            data : input_data,
            beforeSend: function(){
                $('.loading').show();
                $('.center-form').hide();
            },
            success : function(data){
                response_data = JSON.parse(data);
                if(response_data["success"] == true) {
                    App.load('result',response_data.result);    
                } else {
                    App.dialog({
                        title        : "Error!!",
                        text         : response_data["message"],
                        okButton     : 'Ok'
                    }, function (tryAgain) {
                        if (tryAgain) {
                            App.load('home');
                        }
                    });
                }
            }
        });
    })
});

App.controller('result', function (page, result) {
  console.log(result);

  $(page).delegate('.go-to-home','click',function(){
    App.load('home');
  })

  var heightObj = result.height;
  var weightObj = result.weight;
  var bmiObj = result.bmi;
  var bmrObj = result.bmr;
  var whrObj = result.whr;
  var whtrObj = result.whtr;

  var height_text = heightObj.cm + " cm <br>" + heightObj["ft-in"] + " feet-inches <br>" + heightObj.in + " inches <br>" + heightObj.m + " metres";
  var weight_text = weightObj.kg + " kilogram <br>" + weightObj.lb + " pounds <br>";
  var whr_text = " <b>" + whrObj.value +  " </b> (" + whrObj.status + ")";
  var whtr_text = " <b>" + whtrObj.value +  " </b> (" + whtrObj.status + ")";

  $(page).find('#height-result-data').html(height_text);
  $(page).find('#weight-result-data').html(weight_text);
  $(page).find('#whr-result-data').html(whr_text);
  $(page).find('#whtr-result-data').html(whtr_text);

  /*$(page).find('.height-result #cm').html(heightObj.cm);
  $(page).find('.height-result #ft-in').html(heightObj["ft-in"]);
  $(page).find('.height-result #in').html(heightObj.in);
  $(page).find('.height-result #m').html(heightObj.m);*/

  /*$(page).find('.weight-result #kg').html(weightObj.kg);
  $(page).find('.weight-result #lb').html(weightObj.lb);*/

  $(page).find('.bmi-result #prime').html(bmiObj.prime);
  $(page).find('.bmi-result #risk').html(bmiObj.risk);
  $(page).find('.bmi-result #status').html(bmiObj.status);
  $(page).find('.bmi-result #value').html(bmiObj.value);

  $(page).find('.bmr-result #value').html(bmrObj.value);

  /*$(page).find('.whr-result #status').html(whrObj.status);
  $(page).find('.whr-result #value').html(whrObj.value);*/

  /*$(page).find('.whtr-result #status').html(whtrObj.status);
  $(page).find('.whtr-result #value').html(whtrObj.value);*/

});

try {
    App.restore();
} catch (err) {
    App.load('home');
}


function launchDialog(input_name){
    App.dialog({
        text         : "Please Enter "+ input_name +"!!",
        okButton     : 'Got it!'
    });
}