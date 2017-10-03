function sum(){
var a = arguments;
results=[];
count=a[0].length;
L=a.length;
sum=0;
next=i;
while(next<count){
    sum=0;
    i=0;
    sum+=num(a[i++][next]);
}
result[next++]=sum;
}
var a=[1,2],b=[2,3];
console.log(sum(a,b));