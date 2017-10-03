var a=[
    [1,2],
    [2,2]
]
var b=[
    [1,2],
    [2,4]
]
    var result=[];
    result=new Array(a.length);
    for(var i=0;i<result.length;i++){
        result[i]=new Array(b[i].length);
        for(var j=0;j<a.length;j++){
            for(let k=0;k<b.length;k++){
                result[i][j]=0;
            result[i][j]+=a[i][j]*b[i][j];
        }
    }
    }
    


console.log(result);
    
