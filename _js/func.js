$(document).ready(function (){
  //localStorage.clear()
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
    item.times.forEach(function(time, index){
      times += "<button onclick=\"movieSelected(\'"+item.id+"\',\'"+index+"\',\'"+time.hour+"\')\" >"+time.hour+"</button>"
    })

    //console.log("onclick=\"setModalInfos(\""+item.Movie_name+"\")\"");
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

  $("#md-title").html("")
  $("#md-title").html(name)

  $("#md-body").html("")
  $("#md-body").html(synopsis)
}

function movieSelected(id, timeIndex, hour){
  localStorage.setItem("id",id)
  localStorage.setItem("hour",hour)
  localStorage.setItem("timeIndex",timeIndex)
  window.location.href = 'seats'
}
