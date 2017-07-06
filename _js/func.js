$(document).ready(function (){
  //Get the movies from the dataase
  $.ajax({
    url:"/movies",
    success: function(data){
      dt = JSON.parse(data)
      modelMovies(dt)
    }
  });
})

function modelMovies(movies){
  movies.forEach(function(item){
    times = ""
    console.log(item);
    //Create the a button element for each hour
    item.times.forEach(function(time, index){
      times += "<button onclick=\"movieSelected(\'"+item.id+"\',\'"+index+"\',\'"+time.hour+"\')\" >"+time.hour+"</button>"
    })

    //Create a element for each movie
    $("#conteiner-movies").append(
      "<div class=\"movie\">"+
				"<button type=\"button\" onclick=\"setModalInfos(\'"+item.movie_name+"\',\'"+item.synopsis+"\')\" class=\"movie-button\" data-toggle=\"modal\" data-target=\"#myModal\">"+
					"<img class=\"movie-img\" src=\""+item.movie_img+"\" alt=\"Movie Name\"/>"+
				"</button>"+
				"<p class=\"movie-name\">"+item.movie_name+"</p>"+
				"<p class=\"movie-screen\">"+item.screen+"</p>"+
				"<div class=\"times\">"+
					times+
				"</div>"+
			"</div>"
    )
  })
}

function setModalInfos(name, synopsis){
  //Edit the modal with the movie informations
  $("#md-title").html("")
  $("#md-title").html(name)

  $("#md-body").html("")
  $("#md-body").html(synopsis)
}

function movieSelected(id, timeIndex, hour){
  //Set the auxiliar data for the next page
  localStorage.setItem("id",id)
  localStorage.setItem("hour",hour)
  localStorage.setItem("timeIndex",timeIndex)
  window.location.href = 'seats'
}
