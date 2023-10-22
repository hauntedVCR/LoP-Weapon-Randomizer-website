//initalize the spinner
function initSpin(){
    //variables for the 2 pools
    const shuffledHandles={

        arr: sHandles,
        handleLen: sHandles.length-1,
        cName: ".box1",
        reel:".boxes1",
        loopCount: 0,
        loops: 4,
        height:parseInt($(".boxes1").css("height")),
        endNum: 0,
        time: 3000
    };
    shuffledHandles.speed= shuffledHandles.time/shuffledHandles.loops;
    shuffledHandles.listHeight=shuffledHandles.arr.length *shuffledHandles.height;
    
    const shuffledBlades={

        arr: sBlades,
        bladeLen: sBlades.length-1,
        cName: ".box2",
        reel:".boxes2",
        loopCount: 0,
        loops: 4,
        height:parseInt($(".boxes2").css("height")),
        endNum: 0,
        time: 3000
    };
    shuffledBlades.speed= shuffledBlades.time/shuffledBlades.loops;
    shuffledBlades.listHeight= shuffledBlades.arr.length*shuffledBlades.height;


    //check if there r any boxes and remove for new subsequent spins
    if($(shuffledHandles.cName).length>0){
        $(shuffledHandles.cName).remove();
    }

    if($(shuffledBlades.cName).length>0){
        $(shuffledBlades.cName).remove();

    }

    var targetLen;
    //determine which one has the longer array length
    if(shuffledHandles.arr.length>=shuffledBlades.arr.length){
        targetLen=shuffledHandles.arr.length;
    }

    else{
        targetLen=shuffledBlades.arr.length;
    }

    while(targetLen>-1){

        //add blades
        if(shuffledHandles.handleLen>-1){
            $(".boxes1").append("<div class='box1'><img src='"+shuffledHandles.arr[shuffledHandles.handleLen]+"'class=\"weaponImg\"></div>");
            shuffledHandles.handleLen--;

        }
        //add handles
        if(shuffledBlades.bladeLen>-1){

            $(".boxes2").append("<div class='box2'><img src='"+shuffledBlades.arr[shuffledBlades.bladeLen]+"' class=\"weaponImg\"></div>");
            shuffledBlades.bladeLen--;
        }
        targetLen--;
    }

        //this is for making the animation a lot more smoother
        cloneBoxes(shuffledBlades, shuffledHandles);

        //do the spin if the array has more than 2 items
        if(shuffledBlades.arr.length>1){
            startSpin(shuffledBlades);
        }
        
        if(shuffledHandles.arr.length>1){
            startSpin(shuffledHandles);
        }
    
}


function cloneBoxes(shuffledHandles,shuffledBlades){
    var box1= $(shuffledHandles.cName).first();
    var box2= $(shuffledBlades.cName).first();

    //clone first and append to last for smoother animation
    box1.clone().appendTo(shuffledHandles.reel);
    box2.clone().appendTo(shuffledBlades.reel);

}

function endSpin(token){

    if(token.endNum == 0 ){
        token.endNum= Math.floor(Math.random()*(1+token.arr.length))+1;
    }

    //if it goes out of range
    if(token.endNum < 0 || token.endNum > token.arr.length){
        token.endNum = 1;
    }

    var finalPos = -((token.height *token.endNum) - token.height);
    var finalSpeed = ((token.speed * 1.5) * (token.arr.length)) / token.endNum;
    $(token.reel).css({"top": -token.listHeight,"filter": "blur(0px)"}).
    animate({
        top: finalPos
    }, finalSpeed, "swing",()=>{
        //need some more work here, look at the example code for further assistance
        //clean up the cloned row  
       $(token.cName).last().remove();
      // $(token.reel).css({"filter": "blur(0px)"});
    });
}

function speedUp(token){

    token.loopCount++;
    if(token.loopCount<token.loops){
        startSpin(token);
    }
    //add the end function
    else{
        endSpin(token);
        
    }
}

function startSpin(token) {

    $(token.reel).css({"top": -token.listHeight,"filter": "blur(0.75px)"}).
    animate({
        top: 0
    }, token.speed, "linear", ()=>{
        //call it again to loop through
        speedUp(token);
    });
}



function spin()
{
    //check if either of them is empty
   if(handles.length === 0 || blades.length === 0){
    alert("Please select atleast 1 Blade and 1 Handle.");
   }

   //If we are only dealing with 1 thing just do this
   else if(handles.length === 1 && blades.length === 1){
    //remove the old stuff
    $(".box1").remove();
    $(".box2").remove();
    //reset the reels
    $(".boxes1").css({"top": 0});
    $(".boxes2").css({"top": 0});
    //load imgs and append to boxes
    $(".boxes1").append("<div class='box1'><img src='"+handles[0]+"'class=\"weaponImg\"></div>");
    $(".boxes2").append("<div class='box2'><img src='"+blades[0]+"' class=\"weaponImg\"></div>");
    
   }

   //do the animation thing
   else {
    //prevents button spam
    if($(".boxes1").is(":animated") || $(".boxes2").is(":animated"))return;
    //spin!!
    arrShuffle();
    initSpin();
   }
        
}

/*I can't believe this works.*/ 
function init(){
    //go through the document and load the buttons/array
    $(".Choices").each((i)=>{
        //button choices
        var tButton=$(".Choices").eq(i).children().children();
        switch(i){    
        //blades    
        case 0:
            tButton.each((c1)=>{
            if(tButton[c1].className === "handleChoice"){
                handles.push($(tButton[c1]).children().children().attr("src"));
                stayClicked(tButton[c1]);              
                } 
            });
        //handles
        case 1:
            tButton.each((c2)=>{
            if(tButton[c2].className === "bladeChoice"){
 
                blades.push($(tButton[c2]).children().children().attr("src"));
                stayClicked(tButton[c2]);
                }
            });
        }
    })

    //error handling
    if(blades.length!=0 && handles.length!=0 ){
        arrShuffle();
        //this is just for display
        $(".boxes1").append("<div class='box1'><img src='"+sHandles[0]+"'class=\"weaponImg\"></div>");
        $(".boxes2").append("<div class='box1'><img src='"+sBlades[0]+"'class=\"weaponImg\"></div>");
    }
}