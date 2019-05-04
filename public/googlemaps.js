$(document).ready(function() {
  display();
  function initMap(data) {
    //options
    var options = {
      zoom: 12,
      center: { lat: 28.611, lng: 77.409 }
    };
    //map
    var map = new google.maps.Map(document.getElementById("map"), options);
    google.maps.event.addListener(map, "click", function(event) {
      addMarker({ coords: event.LatLng });
    });

    //heatmap
    var heatmap = new google.maps.visualization.HeatmapLayer({
      data: getPoints(),
      radius: 55,
      map: map
    });

    function getPoints() {
      var location = [];
      for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        if (obj.temp[5] > 9) {
          location[i] = {
            location: new google.maps.LatLng(obj.coords.lat, obj.coords.lng),
            weight: 10
          };
        } else if (obj.temp[5] > 5) {
          location[i] = {
            location: new google.maps.LatLng(obj.coords.lat, obj.coords.lng),
            weight: 5
          };
        } else {
          location[i] = {
            location: new google.maps.LatLng(obj.coords.lat, obj.coords.lng),
            weight: 1
          };
        }
      }
      return location;
    }
    //add marker function
    for (var i = 0; i < data.length; ++i) {
      addMarker(data[i]);
    }

    function addMarker(props) {
      var marker = new google.maps.Marker({
        position: props.coords,
        map: map
      });
      if (props.iconImage) {
        marker.setIcon(props.iconImage);
      }
      if (props.place) {
        var infoWindow = new google.maps.InfoWindow({
          content: props.place
        });
        marker.addListener("click", function() {
          infoWindow.open(map, marker);
          console.log(props.id);
          drop(props);
        });
      }
    }
    function drop(dummy) {
      setInterval(function() {
        var t = [];
        var h = [];
        for (i = 0; i < 6; ++i) {
          t[i] = Math.floor(Math.random() * 31 + 70);
          h[i] = Math.floor(Math.random() * 31 + 40);
        }

        displayHis(dummy, t, h);
      }, 10000);
    }

    var input = document.getElementById("pac-input");
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", function() {
      searchBox.setBounds(map.getBounds());
    });

    searchBox.addListener("places_changed", function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }

        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  }

  function display() {
    $.ajax({
      url: "/mapgoogle",
      method: "post",
      success: function(data) {
        initMap(data);
      }
    });
  }

  const URL =
    "https://api.thingspeak.com/channels/629279/feeds.json?api_key=0EQHJXM6M0CPWY0R&results=20";
  let myChart = document.getElementById("myChart").getContext("2d");
  let hisChart = document.getElementById("hisChart").getContext("2d");
  let HumiChart = document.getElementById("HumiChart").getContext("2d");
  let myHumChart = document.getElementById("myHumChart").getContext("2d");
  let lefthome = $("#left-home");
  let rightHome = $("#right-home");
  let HomeImg = $("#HomeImg");
  let leftBottom = $("#right-bottom");
  let eplace = $("#exp-place");
  let etime = $("#exp-time");
  let firsth1 = $("#first-exp-h1");
  let secondh1 = $("#second-exp-h1");
  let thirdh1 = $("#third-exp-h1");
  let fourthh1 = $("#fourth-exp-h1");
  let fifthh1 = $("#fifth-exp-h1");
  let sixthh1 = $("#sixth-exp-h1");
  let firstimg = document.getElementById("first-exp-img");
  let secondimg = document.getElementById("second-exp-img");
  let thirdimg = document.getElementById("third-exp-img");
  let fourthimg = document.getElementById("fourth-exp-img");
  let fifthimg = document.getElementById("fifth-exp-img");
  let sixthimg = document.getElementById("sixth-exp-img");
  let ExpImg = document.getElementById("ExpImg");
  let ul0 = $("#ul0");
  let ul1 = $("#ul1");
  let ul2 = $("#ul2");
  let ul3 = $("#ul3");
  let ul4 = $("#ul4");
  let ul5 = $("#ul5");
  let ul6 = $("#ul6");

  var object = {
    id: 0,
    name: "Chetan Jain",
    place: "JIIT",
    coords: {
      lat: 28.694583,
      lng: 77.364065
    },
    temp: [10, 12, 4, 5, 6, 3],
    hum: [13, 24, 32, 15, 8, 28],
    time: [0, 10, 20, 30, 40, 50],
    message: "jaypee",
    user: "chetan"
  };
  displayBlocks(object);

  mineInfo();

  let search = $("#search");
  let input = $("#input");

  (Chart.defaults.global.defaultFontFamily = "Lato"),
    (Chart.defaults.global.defaultFontSize = 16);

  //search result
  search.click(function() {
    $.ajax({
      url: "/searchDisplay",
      method: "post",
      data: { place: input.val() },
      success: function(dataTemp) {
        displayBlocks(dataTemp);
      }
    });
  });

  function mineInfo() {
    setInterval(function() {
      $.ajax({
        url: URL,
        method: "GET",
        success: function(dataTemp) {
          lefthome.empty();
          rightHome.empty();
          lefthome.append(
            "<h1>" +
              dataTemp.feeds[19].created_at[0] +
              dataTemp.feeds[19].created_at[1] +
              dataTemp.feeds[19].created_at[2] +
              dataTemp.feeds[19].created_at[3] +
              dataTemp.feeds[19].created_at[4] +
              dataTemp.feeds[19].created_at[5] +
              dataTemp.feeds[19].created_at[6] +
              dataTemp.feeds[19].created_at[7] +
              dataTemp.feeds[19].created_at[8] +
              dataTemp.feeds[19].created_at[9] +
              "</h1>"
          ),
            rightHome.append("<h1>" + dataTemp.feeds[19].field1 + "</h1>");
          displayPic(dataTemp.feeds[19].field1);
          displayMine(dataTemp);
        }
      });
    }, 10000);
  }
  function displayMine(dataTemp) {
    console.log(dataTemp.feeds[0].created_at);
    let barchart = new Chart(myChart, {
      type: "line", //bar,hori bar, pie line, doughnuts ,polar,radar
      data: {
        labels: [
          dataTemp.feeds[10].created_at,
          dataTemp.feeds[11].created_at,
          dataTemp.feeds[12].created_at,
          dataTemp.feeds[13].created_at,
          dataTemp.feeds[14].created_at,
          dataTemp.feeds[15].created_at,
          dataTemp.feeds[16].created_at,
          dataTemp.feeds[17].created_at,
          dataTemp.feeds[18].created_at,
          dataTemp.feeds[19].created_at
        ],
        datasets: [
          {
            label: "Temperature",
            data: [
              dataTemp.feeds[10].field1,
              dataTemp.feeds[11].field1,
              dataTemp.feeds[12].field1,
              dataTemp.feeds[13].field1,
              dataTemp.feeds[14].field1,
              dataTemp.feeds[15].field1,
              dataTemp.feeds[16].field1,
              dataTemp.feeds[17].field1,
              dataTemp.feeds[18].field1,
              dataTemp.feeds[19].field1
            ],
            borderWidth: 9,
            borderColor: "black",
            hoverBorderColor: "gold"
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: "temperature",
          fontSize: 25
        },
        legend: {
          position: "right",
          display: false
        },
        layout: {
          padding: {
            left: 50,
            right: 0
          }
        },
        tooltips: {
          enabled: true
        }
      }
    });
    let neweChart = new Chart(myHumChart, {
      type: "line", //bar,hori bar, pie line, doughnuts ,polar,radar
      data: {
        labels: [
          dataTemp.feeds[10].created_at,
          dataTemp.feeds[11].created_at,
          dataTemp.feeds[12].created_at,
          dataTemp.feeds[13].created_at,
          dataTemp.feeds[14].created_at,
          dataTemp.feeds[15].created_at,
          dataTemp.feeds[16].created_at,
          dataTemp.feeds[17].created_at,
          dataTemp.feeds[18].created_at,
          dataTemp.feeds[19].created_at
        ],
        datasets: [
          {
            label: "humidity",
            data: [
              dataTemp.feeds[10].field2,
              dataTemp.feeds[11].field2,
              dataTemp.feeds[12].field2,
              dataTemp.feeds[13].field2,
              dataTemp.feeds[14].field2,
              dataTemp.feeds[15].field2,
              dataTemp.feeds[16].field2,
              dataTemp.feeds[17].field2,
              dataTemp.feeds[18].field2,
              dataTemp.feeds[19].field2
            ],
            borderWidth: 9,
            borderColor: "black",
            hoverBorderColor: "gold"
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: "humidity",
          fontSize: 25
        },
        legend: {
          position: "right",
          display: false
        },
        layout: {
          padding: {
            left: 50,
            right: 0
          }
        },
        tooltips: {
          enabled: true
        }
      }
    });
  }

  function displayHis(dataTemp, t, h) {
    let barchart = new Chart(hisChart, {
      type: "bar", //bar,hori bar, pie line, doughnuts ,polar,radar
      data: {
        labels: ["0:00", "0:10", "0:20", "0:30", "0:40", "0:50"],
        datasets: [
          {
            label: "temperature",
            data: [t[0], t[1], t[2], t[3], t[4], t[5]],
            borderWidth: 9,
            color: "black",
            borderColor: "black",
            hoverBorderColor: "gold"
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: "temperature",
          fontSize: 25
        },
        legend: {
          position: "right",
          display: false
        },
        layout: {
          padding: {
            left: 50,
            right: 0
          }
        },
        tooltips: {
          enabled: true
        }
      }
    });
    let newChart = new Chart(HumiChart, {
      type: "bar", //bar,hori bar, pie line, doughnuts ,polar,radar
      data: {
        labels: ["0:00", "0:10", "0:20", "0:30", "0:40", "0:50"],
        datasets: [
          {
            label: "temperature",
            data: [h[0], h[1], h[2], h[3], h[4], h[5]],
            borderWidth: 9,
            borderColor: "black",
            hoverBorderColor: "gold"
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: "humidity",
          fontSize: 25
        },
        legend: {
          position: "right",
          display: false
        },
        layout: {
          padding: {
            left: 50,
            right: 0
          }
        },
        tooltips: {
          enabled: true
        }
      }
    });
  }
  function displayPic(data) {
    if (data > 100) {
      document.getElementById("HomeImg").src = "hightempreal.jpg";
    } else if (data > 90) {
      document.getElementById("HomeImg").src = "sunnyreal.jpg";
    } else if (data > 80) {
      document.getElementById("HomeImg").src = "cloudyreal.jpg";
    } else {
      document.getElementById("HomeImg").src = "winterreal.jpg";
    }
  }
  function displayBlocks(data) {
    etime.empty();
    eplace.empty();
    eplace.append(data.place);
    etime.append(data.name);
    setInterval(function() {
      firsth1.empty();
      secondh1.empty();
      thirdh1.empty();
      fourthh1.empty();
      fifthh1.empty();
      sixthh1.empty();
      ul0.empty();
      ul1.empty();
      ul2.empty();
      ul3.empty();
      ul4.empty();
      ul5.empty();
      ul6.empty();
      // $("#exp-time").append()
      var t = [];
      var h = [];
      for (i = 0; i < 6; ++i) {
        t[i] = Math.floor(Math.random() * 41 + 70);
        h[i] = Math.floor(Math.random() * 31 + 40);
      }

      if (t[0] > 100) {
        firstimg.src = "hightemp.jpg";
      } else if (t[0] > 90) {
        firstimg.src = "sunny.jpg";
      } else if (t[0] > 80) {
        firstimg.src = "happycloud.jpg";
      } else {
        firstimg.src = "winter.jpg";
      }

      if (t[1] > 100) {
        secondimg.src = "hightemp.jpg";
      } else if (t[1] > 90) {
        secondimg.src = "sunny.jpg";
      } else if (t[1] > 80) {
        secondimg.src = "happycloud.jpg";
      } else {
        secondimg.src = "winter.jpg";
      }

      if (t[2] > 100) {
        thirdimg.src = "hightemp.jpg";
      } else if (t[2] > 90) {
        thirdimg.src = "sunny.jpg";
      } else if (t[2] > 80) {
        thirdimg.src = "happycloud.jpg";
      } else {
        thirdimg.src = "winter.jpg";
      }

      if (t[3] > 100) {
        fourthimg.src = "hightemp.jpg";
      } else if (t[3] > 90) {
        fourthimg.src = "sunny.jpg";
      } else if (t[3] > 80) {
        fourthimg.src = "happycloud.jpg";
      } else {
        fourthimg.src = "winter.jpg";
      }

      if (t[4] > 100) {
        fifthimg.src = "hightemp.jpg";
      } else if (t[4] > 90) {
        fifthimg.src = "sunny.jpg";
      } else if (t[4] > 80) {
        fifthimg.src = "happycloud.jpg";
      } else {
        fifthimg.src = "winter.jpg";
      }

      if (t[5] > 100) {
        sixthimg.src = "hightemp.jpg";
        ExpImg.src = "hottempback.jpg";
      } else if (t[5] > 90) {
        console.log(t[4]);
        ExpImg.src = "sunnyback.jpg";
        sixthimg.src = "sunny.jpg";
      } else if (t[5] > 80) {
        sixthimg.src = "happycloud.jpg";
        ExpImg.src = "cloudyback.jpg";
      } else {
        sixthimg.src = "winter.jpg";
        ExpImg.src = "winterback.jpg";
      }

      firsth1.append("</h1>" + t[0] + "</h1><br><h3>" + "0:00" + "</h3>");
      secondh1.append("</h1>" + t[1] + "</h1><br><h3>" + "0:10" + "</h3>");
      thirdh1.append("</h1>" + t[2] + "</h1><br><h3>" + "0:20" + "</h3>");
      fourthh1.append("</h1>" + t[3] + "</h1><br><h3>" + "0:30" + "</h3>");
      fifthh1.append("</h1>" + t[4] + "</h1><br><h3>" + "0:40" + "</h3>");
      sixthh1.append("</h1>" + t[5] + "</h1><br><h3>" + "0:50" + "</h3>");
      ul0.append("<h2>" + "humidity(%):" + "</h2>");
      ul1.append(h[0]);
      ul2.append(h[1]);
      ul3.append(h[2]);
      ul4.append(h[3]);
      ul5.append(h[4]);
      ul6.append(h[5]);
    }, 5000);
  }
});
