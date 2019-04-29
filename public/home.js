$(document).ready(function(){
    
    let datalist=$("#datalist");
    display()
    function display(){
        $.ajax({
            url:'/display',
            method:'post',
            success:function(data){
                for(let i=0;i<data.length;++i){
                    datalist.append(`<option value="${data[i].place}">`)
                }
            }
        })
    }
   
})