let a= [[1,2,3],[3,4,5]];
let b=[];
b= new Array(a[0].length);
for (let i=0;i<a[0].length;i++){
     b[i]=new Array(a.length)


    for(let j=0;j<b[i].length;j++){
        b[i][j]=a[j][i];
    }
}


console.log(b)