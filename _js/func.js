$(document).ready(function (){
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
    item.Times.forEach(function(time, index){
      times += "<button onclick=\"movieSelected(\'"+item.id+"\',\'"+index+"\')\" >"+time.Hour+"</button>"
    })

    //console.log("onclick=\"setModalInfos(\""+item.Movie_name+"\")\"");
    $("#conteiner-movies").append(
      "<div class=\"movie\">"+
				"<button type=\"button\" onclick=\"setModalInfos(\'"+item.Movie_name+"\',\'"+item.Synopsis+"\')\" class=\"movie-button\" data-toggle=\"modal\" data-target=\"#myModal\">"+
					"<img class=\"movie-img\" src=\""+item.Movie_img+"\" alt=\"Movie Name\"/>"+
				"</button>"+
				"<p class=\"movie-name\">"+item.Movie_name+"</p>"+
				"<p class=\"movie-screen\">"+item.Screen+"</p>"+
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

function movieSelected(id, timeIndex){
  localStorage.setItem("id",id)
  localStorage.setItem("timeIndex",timeIndex)
  window.location.href = 'seats'
}
