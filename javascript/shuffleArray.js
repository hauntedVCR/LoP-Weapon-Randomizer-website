//GLOBAL ARRAYS
//shuffled weapon handle
var sHandles=handles;
//shuffled weapon head
var sBlades=blades;


//shuffle time
function arrShuffle(){

    var l1=handles.length-1;
    var l2=blades.length-1;

    while(true){     
        var randIndex1= Math.floor(Math.random()*(l1));
        var randIndex2 =Math.floor(Math.random()*(l2));

        //dump them into shuffled array
        if(l1>-1){
            [sHandles[l1],sHandles[randIndex1]] = [handles[randIndex1],handles[l1]];
            l1--;
        }
        
        if(l2>-1){
            [sBlades[l2],sBlades[randIndex2]] = [blades[randIndex2],blades[l2]];
            l2--;

        }
      
        //break out of the loop once everything has been shuffled
        if(l1==-1 && l2==-1){
            //return shuffled array
            break;
        }
    }

}

