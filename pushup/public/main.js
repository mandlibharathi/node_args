var form=document.getElementById('vote-form');
var event;

form.addEventListener('submit',e=>{
    const choice=document.querySelector('input[name=os]:checked').value;
    const data={os:choice};

    fetch("http://localhost:8080/poll",{
        method:'post',
        body:JSON.stringify(data),
        headers: new Headers({
            'Content-Type':'application/json'
        })
        }).then(res=>res.json())
    .then(data=>console.log(data))
    .catch(err=>console.log(err))
  e.preventDefault();
});

fetch("http://localhost:8080/poll")
.then(res=>res.json())
.then(data=>{
const votes=data.votes;
let totalVotes=votes.length
//create values
document.querySelector('#chartTitle').textContent = `Total Votes: ${totalVotes}`;

        let voteCounts = {
            Windows: 0,
            MacOS: 0,
            Linux: 0
        };
//count vote points
 voteCounts = votes.reduce((acc, vote) => (
    (acc[vote.os] = (acc[vote.os] || 0) + parseInt(vote.points)), acc),
    {}
);
      
        var dataPoints=[
            {label:'Windows',y:voteCounts.Windows},
            {label:'Macos',y:voteCounts.Macos},
            {label:'Linux',y:voteCounts.Linux},
            ];
            const chartContainer=document.querySelector('#chartContainer')
            
            if(chartContainer){
                
                
                const chart=new CanvasJS.Chart('chartContainer',{
                    animationEnabled: true,
                    theme: "theme3",
                    title:{
                        text:'os results'
                    },
                    data:[
                              {
                         type:'column',
                            dataPoints:dataPoints
                        }
                    ]
                })
                
                Pusher.logToConsole = true;
                
                    var pusher = new Pusher('3bab4e48c2b67cb4735e', {
                      cluster: 'ap2',
                      forceTLS: true
                    });
                
                    var channel = pusher.subscribe('os-poll');
                    channel.bind('os-vote', function(data) {
                
    dataPoints.map(x=>{
        if(x.lebel==data.os){
 x.y +=data.points;
 return x;
        }
        else{
            return x
        }
    })               
                      chart.render();
                    });
            
                    
            }
            
    


        })