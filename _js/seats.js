outseats = []  //arry to save the seats slecteds
letters = ["A","B","C","D","E","F","G","H"] //auxiliary array with alphabet

$(document).ready(function(){
  seats = [[true,false,true,true,false],[true,false,true,true,false],[true,false,true,true,false],[true,false,true,true,false]]

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
})

function setNumbers(size){
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
        console.log(outseats);
      })
    }else{
      //add invalid seat
      $("#"+letter).append("<svg id=\""+letter+i+"\" class=\"circle\" height=\"36\" width=\"36\">"+
      "<circle cx=\"18\" cy=\"18\" r=\"15\" fill=\"#c70515\" /> </svg>")
    }
  }
}