var a=[1,2];
var b=[2,3];
var c=[];
c=new Array(a.length);

for(var i=0;i<c.length;i++){
c[i]=new Array(a[i].length);
for (var j=0;j<b[i].length;j++){
c[i][j]=a[i][j]+b[i][j];
}
}
console.log(c);
