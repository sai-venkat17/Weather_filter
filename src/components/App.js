import React, { Component } from "react";

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      by_date:false,
      by_location:false,
      liked_post:false,
      date_check_box:false,
      date_check_box1:false,
      location:"",
      results:"Enable GPS or Type a location above start with upper case letter example: Vellore"
    };
    this.handle_text_box=this.handle_text_box.bind(this);
  }

  getLocation() {
    console.log("called");
    const that=this;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position)
      {
        var key = '02d14ca9f3a4e3a3ca270185f5e14913';
  
const that2=that;

  fetch('https://api.openweathermap.org/data/2.5/weather?lat=' +position.coords.latitude+'&lon=' +position.coords.longitude+ '&appid=' + key+'&units=metric')  
  .then(function(resp) { return resp.json() }) // Convert data to json
  .then(function(data) {
    console.log(data);
    that2.setState({
      
      results:"Weather: "+data.weather[0].description+"\nMinimum temperature: "+data.main.temp_min+"\nMaximum temperature: "+data.main.temp_max
      
    })
      
    
  })
  .catch(function(error){
    console.log(error);
    that2.setState({results:"Enable GPS or Type a location start with upper case letter above example: Vellore"});
    
  })


      }
      );
    } else { 
      this.setState({results:"Geolocation is not supported by this browser."});
    }
  }
  
  NewlineText(s) {
    
    
    return s.split('\n').map(str => <p>{str}</p>);
  }

handle_likedpost(){

    this.setState({by_date:false,by_location:false,liked_post:!(this.state.liked_post),date_check_box:false,date_check_box1:false,location:"",results:"Enable GPS or Type a location above start with upper case letter example: Vellore"})
    if(!this.state.liked_post)
    this.getLocation();
  }
handle_date(){

    this.setState({by_date:!(this.state.by_date),by_location:false,liked_post:false,date_check_box:false,date_check_box1:false,location:"",results:"Enable GPS or Type a location above start with upper case letter example: Vellore"})
}
handle_location(){

    this.setState({by_date:false,by_location:!(this.state.by_location),liked_post:false,date_check_box:false,date_check_box1:false,location:"",results:"Enable GPS or Type a location above start with upper case letter example: Vellore"})

  }
handle_date_checkbox2(){
this.setState({by_date:this.state.by_date,by_location:false,liked_post:false,date_check_box:!(this.state.date_check_box)});
}
handle_date_checkbox1(){
  this.setState({by_date:this.state.by_date,by_location:false,liked_post:false,date_check_box:this.state.date_check_box,date_check_box1:!(this.state.date_check_box1)});
  }
handle_text_box(event){
 

  var key = '02d14ca9f3a4e3a3ca270185f5e14913';
  this.setState({location:event.target.value});
const that=this;
  fetch('https://api.openweathermap.org/data/2.5/weather?q=' +event.target.value+ '&appid=' + key+'&units=metric')  
  .then(function(resp) { return resp.json() }) // Convert data to json
  .then(function(data) {
    console.log(data);
    that.setState({
      
      results:"Weather: "+data.weather[0].description+"\nMinimum temperature: "+data.main.temp_min+"\nMaximum temperature: "+data.main.temp_max
      
    })
      
    
  })
  .catch(function(error){
    console.log(error);
    that.setState({results:"Enable GPS or Type a location start with upper case letter above example: Vellore"});
    
  })

}  
  

render() {
     return (
       <div>
        <div className="Filterby">
            <table>
                <tr>
<td>Filter By</td>
</tr>
<tr>
<td>by Date</td> 
<td style={{paddingLeft:100}}>
    <label className="switch">
  <input type="checkbox" checked={this.state.by_date} onChange={this.handle_date.bind(this)}></input>
  <span className="slider round"></span>
</label>
</td>
</tr>
<tr colSpan={2}>
<hr style={{height:1,width:250,backgroundColor:"#BEBEBE",position:"absolute"}}/>
</tr>
<tr><td colSpan={2}>
<div className={this.state.by_date?"date_options":"hidden"}>
  Descending Order  <label class="checkbox_container">
  <input type="checkbox" checked={this.state.date_check_box1} onClick={this.handle_date_checkbox1.bind(this)}/>
  <span class="checkmark"></span>
</label>

</div>
</td>
</tr>


<tr><td colSpan={2}>
<div className={this.state.by_date?"date_options":"hidden"}>
  Include past posts<label class="checkbox_container">
  <input type="checkbox" checked={this.state.date_check_box} onClick={this.handle_date_checkbox2.bind(this)}/>
  <span class="checkmark"></span>
</label>

</div>
</td>
</tr>
<tr colSpan={2} className={this.state.by_date?"date_options":"hidden"}>
  <td>
<hr style={{height:1,width:180,backgroundColor:"#BEBEBE",position:"absolute",marginLeft:80}}/>
</td>
</tr>


<br/>
<tr>
<td>by Location</td> 
<td style={{paddingLeft:100}}>
    <label className="switch">
  <input type="checkbox" checked={this.state.by_location} onChange={this.handle_location.bind(this)}></input>
  <span className="slider round"></span>
</label>
</td>
</tr>
<tr>
  <td colSpan={2}>
  <div className={this.state.by_location?"location_options":"hidden"}>
  <input type="text" placeholder="Enter location" onChange={this.handle_text_box.bind(this)} value={this.state.location}/>
  </div>
  </td>
  </tr>

<hr style={{height:1,width:250,backgroundColor:"#BEBEBE",position:"absolute"}}/>
<br/>
<tr>
<td>Enable GPS</td> 
<td style={{paddingLeft:100}}>
    <label className="switch">
  <input type="checkbox" checked={this.state.liked_post} onChange={this.handle_likedpost.bind(this)}></input>
  <span className="slider round"></span>
</label>
</td>
</tr>
<tr>
  <td >
<hr style={{height:1,width:250,backgroundColor:"#BEBEBE",position:"absolute"}}/>
</td>
</tr>

</table>
</div>
<div className="result">
  {this.NewlineText(this.state.results)}
</div>
</div>

          );
  }
}

export default App;
