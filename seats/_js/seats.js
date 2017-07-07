outseats = []  //arry to save the seats slecteds
letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N"] //auxiliary array with alphabet

ID = localStorage.id
HOUR = localStorage.hour
TIMEINDEX = localStorage.timeIndex

$(document).ready(function(){
  //console.log(localStorage);
  //Get the seats states of the selected movie from the database
  $.ajax({
    url:"/getSeats",
    method:"POST",
    data:{"id":ID,"timeIndex":TIMEINDEX},
    success: function(data){
      //console.log(data);
      setTotal();
      seats = JSON.parse(data).seats;

      for(var i = 0; i < seats.length; i++){
        outseats[i] = Array(seats[0].length)
        for(var j = 0; j < seats[0].length; j++){
          outseats[i][j] = false //filling the array
        }
      }

      setNumbers(seats[0].length)  //set the numbers of columns on the conteiner

      for(var i = seats.length-1; i >= 0;i--){
        setseats(letters[i],seats[i])  //set each row of seats
      }

      $("#numbers").attr("style","width: "+$("#seats").width()+"px; text-align: center") //ddjust in the numbers div width
    }
  })
})

function setNumbers(size){
  //Set the numbers for seat location
  var nums = ""
  //first element only for equality the columns
  $("#numbers").append("<svg height=\"36\" width=\"36\">"+
                    "<text x=\"18\" y=\"23\" fill=\"#F91E32\" text-anchor=\"middle\">X</text></svg>")

  for (var i = 1; i <= size; i++){
    nums += "<p style=\"display: inline; width: 36px; margin-bottom: 0;\">"+i+"</p>"
  }

  $("#numbers").append(nums)
}

function setseats(letter,seats){
  //Set all the seats in the screen
  $("#seats").append("<div id=\""+letter+"\"></div>")  //create a new div for each row
  $("#"+letter).append("<svg height=\"36\" width=\"36\">"+
                    "<text x=\"18\" y=\"23\" fill=\"white\" text-anchor=\"middle\">"+letter+"</text></svg>")  //add the the letter of this row

  for (var i = 0; i < seats.length; i++){
    if (seats[i]){
      //if the seat is free
      $("#"+letter).append("<svg id=\""+letter+i+"\" class=\"circle seat-free\" height=\"36\" width=\"36\">"+
      "<circle cx=\"18\" cy=\"18\" r=\"15\" fill=\"#66ff66\" /> </svg>")

      $("#"+letter+i).click(function(){ //only click event in free seats
        id = $(this).attr("id")
        row = letters.indexOf(id[0])
        p = parseInt(id.slice(1));

        if (!outseats[row][p]){   //if the seat is select
          $("#"+id+" circle").attr("fill","#3999A5")  //change to blue
          outseats[row][p] = true
        }else{  //if deselected
          $("#"+id+" circle").attr("fill","#66ff66")  //return to green
          outseats[row][p] = false
        }
        setTotal()
        console.log(outseats);
      })
    }else{
      //add invalid seat
      $("#"+letter).append("<svg id=\""+letter+i+"\" class=\"circle\" height=\"36\" width=\"36\">"+
      "<circle cx=\"18\" cy=\"18\" r=\"15\" fill=\"#c70515\" /> </svg>")
    }
  }
}

function setTotal(){
  //Show the total value for the purchase
  var cont = 0
  for (var i = 0; i < outseats.length; i++){
    for(var j = 0; j < outseats[0].length; j++){
      if(outseats[i][j]) cont++;
    }
  }

  $("#total").html("Total: $ "+cont*10+".00");  //the default value is $10
}

function buy(){
  //Function to buy the selecteds seats
  st = JSON.stringify(outseats) //convert the outseats array to JSON format in string
  $.ajax({
    url:"/buy",
    method:"POST",
    data:{"id":ID,"hour":HOUR,"timeIndex":TIMEINDEX,"seats":st},
    success: function(data){
      if (data === "ok"){
        alert("OK");
        window.location.href = '../'
      }else{
        alert("Error! Reload the page!")
        location.reload()
      }
    }
  })
}
