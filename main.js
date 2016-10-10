var content = $(".bl-list").clone();
var summary = $(".item").clone();
var current = 0;
$(document).ready(function(){
    add("Помідори");
    add("Печиво");
    add("Сир");

    $(".add-button").click(function(){
        var product = $("#search-field").val();
        if(product)
            add(product);
    });

    $("#search-field").keypress(function(e){
        if(e.which==13){
            var product = $("#search-field").val();
            if(product)
                add(product);
        }
    });


    $(".bl-left-column").on("click",".button-remove",function(){
        var bl_list=$(this).parents(".bl-list");
        var counter=$(bl_list).val()-1;
        $('.not-bought-items .item').eq(counter).remove();
        $(bl_list).remove();

    });

    $(".bl-left-column").on("click",".button-buy",function(){
        var bl_list= $(this).parents(".bl-list");
        $(bl_list).find(".bl-product-name").addClass("strike");
        $(bl_list).find(".bl-minus").addClass("invisible");
        $(bl_list).find(".bl-plus").addClass("invisible");
        $(bl_list).find(".button-remove").addClass("hidden");

        $(bl_list).find(".button-buy").removeClass("button-buy").addClass("button-buy-again").text("Не куплено");
        var counter=$(bl_list).val()-1;
        $(".bought-items").append($('.not-bought-items .item').eq(counter).clone())
        $('.not-bought-items .item').eq(counter).css("display","none");
    });


    $(".bl-left-column").on("click",".button-buy-again",function(){
        var bl_list= $(this).parents(".bl-list");
        $(bl_list).find(".bl-product-name").removeClass("strike");
        $(bl_list).find(".bl-minus").removeClass("invisible");
        $(bl_list).find(".bl-plus").removeClass("invisible");
        $(bl_list).find(".button-remove").removeClass("hidden");
        $(bl_list).find(".button-buy-again").removeClass("button-buy-again").addClass("button-buy").text("Куплено");
        var counter=$(bl_list).val()-1;
        $('.not-bought-items .item').eq(counter).css("display","inline-block");
        var counter=0;
        $(".bought-items .item").eq(counter).remove();
    });

    $(".bl-left-column").on("click",".bl-product-name",function(e){
        var input=$(this).parent(".bl-product").find(".new-name");
        input.addClass("block");
        $(this).addClass("hidden");
        var that=$(this);
        input.val($(this).text());

        $(input).focusout(function(){
            var text = input.val();
            $(that).removeClass("hidden").addClass("block").text(text);
            editName($(that).parents(".bl-list").val(),text);
            $(input).removeClass("block");
        });
    });

    function editName(v,text){
        var val=v-1;
        $(".not-bought-items .item").eq(val).find(".not-bought-item").text(text);
    }


    $(".bl-left-column").on("click",".bl-plus", function(){
        var bl_list = $(this).parents(".bl-list");
        var label=$(bl_list).find(".bl-label");
        var num = +$(label).text()+1;
        if(num===2)
            $(this).parents(".bl-list").find(".bl-minus").removeClass("disabled");
        $(label).text(num);
        var counter=$(bl_list).val();
        $('.item').eq(counter).find(".not-bought-item-number").text(num);
    });


    $(".bl-left-column").on("click",".bl-minus",function(){
        var bl_list = $(this).parents(".bl-list");
        var label=$(bl_list).find(".bl-label");
        var num = +$(label).text()-1;
        if($(this).hasClass("disabled")) return;
        if(num===1)
            $(this).parents(".bl-list").find(".bl-minus").addClass("disabled");
        $(label).text(num);
        var counter=$(bl_list).val();
        $('.item').eq(counter).find(".not-bought-item-number").text(num);
    });

});
var index=1;
function add(product){
    $(content).find(".bl-product-name").text(product);
    $(".bl-left-column").append(content.clone().val(index));
    $(summary).find(".not-bought-item").text(product);
    $(".not-bought-items").append(summary.clone().val(index++));
    $("#search-field").val("");
}
