$(document).ready(function(){
   const URL='https://api.thingspeak.com/channels/629279/feeds.json?api_key=0EQHJXM6M0CPWY0R&results=100';
    let myChart=document.getElementById('myChart').getContext('2d');
    let hisChart=document.getElementById('hisChart').getContext('2d');
    let HumiChart=document.getElementById('HumiChart').getContext('2d');
    let myHumChart=document.getElementById('myHumChart').getContext('2d');
    let lefthome=$("#left-home");
    let rightHome=$("#right-home");
    let HomeImg=$("#HomeImg");
    let leftBottom=$("#right-bottom")
    let eplace=$("#exp-place");
    let etime=$("#exp-time");
    firsth1=$("#first-exp-h1");
    secondh1=$("#second-exp-h1");
    thirdh1=$("#third-exp-h1");
    fourthh1=$("#fourth-exp-h1");
    fifthh1=$("#fifth-exp-h1");
    sixthh1=$("#sixth-exp-h1");
    firstimg=document.getElementById("first-exp-img");
    secondimg=document.getElementById("second-exp-img");
    thirdimg=document.getElementById("third-exp-img");
    fourthimg=document.getElementById("fourth-exp-img");
    fifthimg=document.getElementById("fifth-exp-img");
    sixthimg=document.getElementById("sixth-exp-img");
    ExpImg=document.getElementById("ExpImg");

    var object={
        
            "id":0,
            "name":"Chetan Jain",
            "place":"JIIT",
            "coords":{
                "lat":28.694583,
                "lng":77.364065
            },
            "temp":[10,12,4,5,6,3],
            "hum":[13,24,32,15,8,28],
            "time":[0,10,20,30,40,50],
            "message":"jaypee",
            "user":"chetan"
        
    }
    displayBlocks(object);


    mineInfo();
    hisInfo();

    let search=$("#search");
    let input=$("#input");

    Chart.defaults.global.defaultFontFamily='Lato',
    Chart.defaults.global.defaultFontSize=16;

    //search result
    search.click(function() {
        $.ajax({
            url:'/searchDisplay',
            method:'post',
            data:{place:input.val()},
            success:function(dataTemp){
                displayBlocks(dataTemp);
             }
        })
     
    })

    function hisInfo(){
        $.ajax({
            url:'/hisInfo',
            method:'post',
            success:function(dataTemp){
                displayHis(dataTemp);
            }
        })
    }
    function mineInfo(){
        $.ajax({
            url:URL,
            method:'GET',
            success:function(dataTemp){
                lefthome.append('<h1>'+dataTemp.feeds[99].created_at[0]+dataTemp.feeds[99].created_at[1]+dataTemp.feeds[99].created_at[2]+dataTemp.feeds[99].created_at[3]+dataTemp.feeds[99].created_at[4]+dataTemp.feeds[99].created_at[5]+dataTemp.feeds[99].created_at[6]+dataTemp.feeds[99].created_at[7]+dataTemp.feeds[99].created_at[8]+dataTemp.feeds[99].created_at[9]+'</h1>'),
                rightHome.append('<h1>'+dataTemp.feeds[99].field1+'</h1>');
                displayPic(dataTemp.feeds[99].field1);
                displayMine(dataTemp);
            }
        })
    }
    function displayMine(dataTemp){
        console.log(dataTemp.feeds[0].created_at[0],dataTemp.feeds[0].created_at[1],dataTemp.feeds[0].created_at[2],dataTemp.feeds[0].created_at[3],dataTemp.feeds[0].created_at[4]);
        console.log(dataTemp.feeds[0].created_at)
        let barchart=new Chart(myChart,{
            type:'line',//bar,hori bar, pie line, doughnuts ,polar,radar
            data:{
                labels:[0,1,2,3,4,5],
                    // dataTemp.feeds[0].created_at,
                    //     dataTemp.feeds[1].created_at,
                    //     dataTemp.feeds[2].created_at,
                    //     dataTemp.feeds[3].created_at,
                    //     dataTemp.feeds[4].created_at,
                    //     dataTemp.feeds[5].created_at]
                datasets:[{
                    label:'temperature',
                    data:[
                        dataTemp.feeds[0].field1,
                        dataTemp.feeds[1].field1,
                        dataTemp.feeds[2].field1,
                        dataTemp.feeds[3].field1,
                        dataTemp.feeds[4].field1,
                        dataTemp.feeds[5].field1
                    ],
                borderWidth:9,
                borderColor:"black",
                hoverBorderColor:"gold",
                }]
            },
            options:{
                title:{
                    display:true,
                    text:'temperature',
                    fontSize:25
                },
                legend:{
                    position:'right',
                    display:false
                },
                layout:{
                    padding:{
                        left:50,
                        right:0
    
                    }
                },
                tooltips:{
                    enabled:true
                }
            }
        });
        let neweChart=new Chart(myHumChart,{
            type:'line',//bar,hori bar, pie line, doughnuts ,polar,radar
            data:{
                labels:[0,10,20,30,40,50],
                datasets:[{
                    label:'humidity',
                    data:[
                    dataTemp.feeds[0].field2,
                    dataTemp.feeds[1].field2,
                    dataTemp.feeds[2].field2,
                    dataTemp.feeds[3].field2,
                    dataTemp.feeds[4].field2,
                    dataTemp.feeds[5].field2
                    ],
                    borderWidth:9,
                    borderColor:"black",
                    hoverBorderColor:"gold",
                    }]
                },
                options:{
                    title:{
                        display:true,
                        text:'humidity',
                        fontSize:25
                    },
                    legend:{
                        position:'right',
                        display:false
                    },
                    layout:{
                        padding:{
                            left:50,
                            right:0
                        }
                    },
                    tooltips:{
                        enabled:true
                    }
                }
            });
    }
   
    
    function displayHis(dataTemp){
        let barchart=new Chart(hisChart,{
            type:'bar',//bar,hori bar, pie line, doughnuts ,polar,radar
            data:{
                labels:[dataTemp.time[0],
                        dataTemp.time[1],
                        dataTemp.time[2],
                        dataTemp.time[3],
                        dataTemp.time[4],
                        dataTemp.time[5]
                    ],
                datasets:[{
                    label:'temperature',
                    data:[
                        dataTemp.temp[0],
                        dataTemp.temp[1],
                        dataTemp.temp[2],
                        dataTemp.temp[3],
                        dataTemp.temp[4],
                        dataTemp.temp[5]
                    ],
                    borderWidth:9,
                    borderColor:"black",
                    hoverBorderColor:"gold",
                    }]
                },
                options:{
                    title:{
                        display:true,
                        text:'temperature',
                        fontSize:25
                    },
                    legend:{
                        position:'right',
                        display:false
                    },
                    layout:{
                        padding:{
                            left:50,
                            right:0
                        }
                    },
                    tooltips:{
                        enabled:true
                    }
                }
            });
            let newChart=new Chart(HumiChart,{
                type:'bar',//bar,hori bar, pie line, doughnuts ,polar,radar
                data:{
                    labels:[dataTemp.time[0],
                            dataTemp.time[1],
                            dataTemp.time[2],
                            dataTemp.time[3],
                            dataTemp.time[4],
                            dataTemp.time[5]
                        ],
                    datasets:[{
                        label:'temperature',
                        data:[
                            dataTemp.hum[0],
                            dataTemp.hum[1],
                            dataTemp.hum[2],
                            dataTemp.hum[3],
                            dataTemp.hum[4],
                            dataTemp.hum[5]
                        ],
                        borderWidth:9,
                        borderColor:"black",
                        hoverBorderColor:"gold",
                        }]
                    },
                    options:{
                        title:{
                            display:true,
                            text:'humidity',
                            fontSize:25
                        },
                        legend:{
                            position:'right',
                            display:false
                        },
                        layout:{
                            padding:{
                                left:50,
                                right:0
                            }
                        },
                        tooltips:{
                            enabled:true
                        }
                    }
                });
        }
    function displayPic(data){
        if(data>100){
            document.getElementById("HomeImg").src="hightempreal.jpg";
        }
        else if(data>90)
        {
            document.getElementById("HomeImg").src="sunnyreal.jpg";
        }
        else if(data>80){  document.getElementById("HomeImg").src="cloudyreal.jpg";}
        else{
            document.getElementById("HomeImg").src="winterreal.jpg";
        }
    }
    function displayBlocks(data){
        firsth1.empty();
        secondh1.empty();
        thirdh1.empty();
        fourthh1.empty();
        fifthh1.empty();
        sixthh1.empty();
        etime.empty();
        eplace.empty();
        // $("#exp-time").append()
       


        if(data.temp[0]>11){firstimg.src="hightemp.jpg";}
        else if(data.temp[0]>9){firstimg.src="sunny.jpg";}
        else if(data.temp[0]>5){firstimg.src="happycloud.jpg";}
        else{firstimg.src="winter.jpg";}
        
        if(data.temp[1]>11){secondimg.src="hightemp.jpg";}
        else if(data.temp[1]>9){secondimg.src="sunny.jpg";}
        else if(data.temp[1]>5){secondimg.src="happycloud.jpg";}
        else{secondimg.src="winter.jpg";}

        
        if(data.temp[2]>11){thirdimg.src="hightemp.jpg";}
        else if(data.temp[2]>9){thirdimg.src="sunny.jpg";}
        else if(data.temp[2]>5){thirdimg.src="happycloud.jpg";}
        else{thirdimg.src="winter.jpg";}

        
        if ( data.temp[3] > 11){fourthimg.src="hightemp.jpg";}
        else if (data.temp[3] >9){ fourthimg.src="sunny.jpg";}
        else if ( data.temp[3] >5){ fourthimg.src="happycloud.jpg";}
        else { fourthimg.src="winter.jpg";}

        
        if ( data.temp[4] > 11){fifthimg.src="hightemp.jpg";}
        else if (data.temp[4] >9){ fifthimg.src="sunny.jpg";}
        else if ( data.temp[4] >5){ fifthimg.src="happycloud.jpg";}
        else { fifthimg.src="winter.jpg";}

        if(data.temp[5] > 11){sixthimg.src="hightemp.jpg";
        ExpImg.src="hottempback.jpg";}
        else if (  data.temp[5] > 9){
            console.log(data.temp[4]);
            ExpImg.src="sunnyback.jpg";
            sixthimg.src="winter.jpg";
        }
        else if ( data.temp[5] > 5){
             sixthimg.src="happycloud.jpg";
             ExpImg.src="cloudyback.jpg"
            }
        else{ sixthimg.src="winter.jpg";
        ExpImg.src="winterback.jpg"}

        firsth1.append(`</h1>${data.temp[0]}</h1><br><h3>${data.time[0]}</h3>`);
        secondh1.append('</h1>'+data.temp[1]+'</h1><br><h3>'+data.time[1]+'</h3>');
        thirdh1.append('</h1>'+data.temp[2]+'</h1><br><h3>'+data.time[2]+'</h3>');
        fourthh1.append('</h1>'+data.temp[3]+'</h1><br><h3>'+data.time[3]+'</h3>');
        fifthh1.append('</h1>'+data.temp[4]+'</h1><br><h3>'+data.time[4]+'</h3>');
        sixthh1.append('</h1>'+data.temp[5]+'</h1><br><h3>'+data.time[5]+'</h3>');
        eplace.append(data.place);
        etime.append(data.time[5]);
    }
    })