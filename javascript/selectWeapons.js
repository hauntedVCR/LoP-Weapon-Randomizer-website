
//global arrays
var handles=[];
var blades=[];

//button toggles
function showToggle(button){
    //toggle handles div
    if (button.className.includes("1")){
            $(".handles").slideToggle("slow")
            .css({"display": "inline-grid"});
            $(button).toggleClass("open");
        
    }

    //toggles blades div
    else {
 
            $(".blades").slideToggle("slow")
            .css({"display": "inline-grid"});
            $(button).toggleClass("open");
        
    }

}

function stayClicked(button) {
   // console.log($(button));
    $(button).toggleClass("active");

}

function selectHandles(x){ 
  //just needs to contain active
   if($(x).hasClass("active")){
    //get the deselector and pass the string
    deselectHandles($(x).children().children().attr("src")); //yes ik this is complete jank but it works ;)
   }

   else{
    //add into array
    handles.push($(x).children().children().attr("src"));
    //console.log(handles);
   }
    //handles click active and makes sure selection stay pressed down or up
    $(x).click(stayClicked(x));
}

function selectBlades(x){
   if($(x).hasClass("active")){
    //get the deselector and pass the string
    deselectBlades($(x).children().children().attr("src"));
   }

   else{
    //add into array
    blades.push($(x).children().children().attr("src"));
   }

   //handles click active and makes sure selection stay pressed down
   $(x).click(stayClicked(x));
   // console.log(blades);
   
}

function deselectHandles(x){
    var index= handles.indexOf(x);
    //failsafe if unable to locate the img in index
    if(index>-1){
        //remove from 1 place
        handles.splice(index,1);
       // console.log(handles);
    }
}

function deselectBlades(x){
    var index= blades.indexOf(x);
    //failsafe if unable to locate the img in index
    if(index>-1){
        //remove from 1 place
        blades.splice(index,1);
        //console.log(blades);
    }

}

//select all button
function selectAll(x){
        var choice=$(x).parent().prev();
        //get button
        var tButton=$(choice).children().children();
        $(tButton).each((i1)=>{

           // if it matches the class name exactly push into the array
            if(tButton[i1].className === "handleChoice"){
                handles.push($(tButton[i1]).children().children().attr("src"));
                stayClicked(tButton[i1]);              
            }            
        });

        $(tButton).each((i2)=>{

            // if it matches the class name push into the array
             if(tButton[i2].className === "bladeChoice"){
 
                 blades.push($(tButton[i2]).children().children().attr("src"));
                 stayClicked(tButton[i2]);
           
             }            
         });
}

//deselect all button
function deSelectAll(x){
        var choice=$(x).parent().prev();
        //get button
        var tButton=$(choice).children().children();
        
        $(tButton).each((i1)=>{
            // if it matches the class name pop
             if(tButton[i1].className === "handleChoice active"){
                 handles.pop();
                 stayClicked(tButton[i1]);    
             }            
         });
 
        // console.log(handles);
        $(tButton).each((i2)=>{
 
             // if it matches the class name pop out of array
              if(tButton[i2].className === "bladeChoice active"){
                  blades.pop()
                  stayClicked(tButton[i2]);
              }            
          });
        
    
}

