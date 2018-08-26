/*轮播图开始*/
var timer;
var num = 0;
var dist = 627;
function exclusive() {/*指示排他*/
    if (num == 5) {
        $('.indicator li').eq(0).attr('class', 'current').siblings().removeAttr('class');
    } else {
        $('.indicator li').eq(num).attr('class', 'current').siblings().removeAttr('class');
    }
};
function go() {/*自动播放*/
    timer = setInterval(function () {
        num++;
        if (num > 5) {
            num = 0;
            $('.broadcast').css('left', '' + -num * dist + 'px');
            num = 1;
        }
        $('.broadcast').animate({'left': '' + -num * dist + 'px'}, 800);
        exclusive();
    }, 3500)
};
go();

$('.box').hover(function () {/*鼠标进入*/
    clearInterval(timer);
    $('.box>span').show();
}, function () {
    go();
    $('.box>span').hide();
});

$('.indicator li').click(function () {/*单击指示*/
    $(this).attr('class', 'current').siblings().removeAttr('class');
    num = $(this).index();
    $('.broadcast').animate({'left': '' + -num * dist + 'px'}, 800);
});
$('.previous').click(function () {/*单击前一张*/
    num--;
    if (num < 0) {
        num = 5;
        $('.broadcast').css('left', '' + -num * dist + 'px');
        num = 4;
    }
    $('.broadcast').animate({'left': '' + -num * dist + 'px'}, 800);
    exclusive();
});
$('.next').click(function () {/*单击下一张*/
    num++;
    if (num > 5) {
        num = 0;
        $('.broadcast').css('left', '' + -num * dist + 'px');
        num = 1;
    }
    $('.broadcast').animate({'left': '' + -num * dist + 'px'}, 800);
    exclusive();
});
/*轮播图结束*/

$('#search-input').focus(function () {/*搜索框聚焦*/
    if ($(window).width() < 1080) {
        $(this).animate({'width': '250px'}, 800);
    } else {
        $(this).animate({'width': '270px'}, 800);
    }
    $('#btn-search').addClass('onfocus');
    $('.search-hot').show();
});
$('#search-input').blur(function () {/*搜索框失去焦点*/
    $(this).animate({'width': '210px'}, 800);
    $('#btn-search').removeClass('onfocus');
});

function getArrayItems(arr, num) {/*在指定数组中取出num个不重复的元素*/
    //新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
    var temp_array = new Array();
    for (var index in arr) {
        temp_array.push(arr[index]);
    }
    //取出的数值项,保存在此数组
    var return_array = new Array();
    for (var i = 0; i < num; i++) {
        //判断如果数组还有可以取出的元素,以防下标越界
        if (temp_array.length > 0) {
            //在数组中产生一个随机索引
            var arrIndex = Math.floor(Math.random() * temp_array.length);
            //将此随机索引的对应的数组元素值复制出来
            return_array[i] = temp_array[arrIndex];
            //然后删掉此索引的数组元素,这时候temp_array变为新的数组
            temp_array.splice(arrIndex, 1);
        } else {
            //数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
            break;
        }
    }
    return return_array;
}

var are = ["小程序", "写作", "vue", "美食", "故事", "时间管理", "PHP", "教育", "交友", "Web前端开发", "我不是药神", "袁隆平", "贸易战",
    "UI设计", "美食", "思维导图", "PPT", "产品", "文学著作", "历史文化", "spring", "影视杂谈", "养生", "理财", "投稿", "外婆的澎湖湾", "AJAX"];
$(document).click(function (e) {        /*热门搜索*/
    if (e.target.className == 'change') {
        var json = getArrayItems(are, 10);
        $('.icon-refresh1').addClass('refresh');
        $('.search-list').html("");
        $.each(json, function (i, v) {
            if($("title").html()=="简书 - 创作你的创作"){
                $('.search-list').append('<li><a href="html/search.html" target="_blank">' + v + '</a></li>');
            }else{
                $('.search-list').append('<li><a href="../html/search.html" target="_blank">' + v + '</a></li>');
            }
        });
        setTimeout(function () {
            $('.icon-refresh1').removeClass('refresh');
        }, 200)
    } else if (e.target.id == 'font') {
        $('.mode').fadeToggle();
    } else if (e.target.className == 'select') {
        $('.select').children('span').css('transform', 'rotate(270deg)');
        $('.sort-list').fadeToggle();
    } else if (e.target.id == 'search-input') {
        $('.search-hot').show();
    } else if (e.target.id == 'share-article') {
        $('.side-tool-share').fadeToggle();
    } else if (e.target.className == 'more') {
        $('.more-share').fadeToggle();
    }  else if(e.target.className=='tips'){
        $('.dropdown-menu').fadeToggle();
    }else {
        setTimeout(function () {
            $('.search-hot').hide();
        }, 200);
        $('.sort-list').fadeOut();
        $('.select').children('span').css('transform', 'rotate(90deg)');
        $('.mode').hide();
        $('.more-share').hide();
        $('.side-tool-share').hide();
        $('.dropdown-menu').hide();
    }
});
/*表单提交*/
function checkInput() {
    if ($('#search-input').val() == "") {
        return false;
    } else {
        $('#search').submit();
    }
}

function check() {
    for (var i = 0; i < $('.icon-renminbi').length; i++) {
        if ($('.icon-renminbi').eq(i).parent().text() == "") {
            $('.icon-renminbi').eq(i).hide();
        }
    }
}
$('.read-more').on('click',function(){ReadMore()});
function ReadMore() {
    $.getJSON('js/article.json', function (art) {
        $.each(art, function (i, v) {
            readMore(v);
        })
    });
    function readMore(item) {
        $('.note-list').append(`<li class="article-info">
                <a href="${item.link}" target="_blank"><img class="article-img" onerror="javascript:this.style.display='none'" src="${item.img}" alt=""></a>
                <a href="${item.link}" target="_blank" class="article-title">${item.title}</a>
                <p class="abstract">${item.abstract}</p>
                <span>
                    <a href="${item.author.link}" target="_blank">${item.author.name}</a>
                    <a href="${item.comments.link}" target="_blank"><i class="iconfont icon-comment"></i>${item.comments.num}</a>
                    <a><i class="iconfont icon-heart"></i>${item.like}</a>
                    <a><i class="iconfont icon-renminbi"></i>${item.money}</a>
                </span>
            </li>`);
        check();
    }
};

$('.down-app').hover(function () {
    $('.down-code').fadeIn();
}, function () {
    $('.down-code').fadeOut();
});

function reset() {
    var winth = $(window).width();
    if (winth > 1410) {
        $('.icon-navigation').show();
        $('.icon-app-download').show();
        $('.devi').show();
    }
    if (winth < 1410) {
        $('.icon-navigation').hide();
        $('.icon-app-download').hide();
        $('.devi').show();
    }
    if (winth < 1070) {
        $('.devi').hide();
        $('.icon-navigation').show();
        $('.icon-app-download').show();
    }
}
$(window).resize(function () {
    reset();
});
$(function () {
    reset();
    check();
});
$(window).scroll(function () {
    if ($(window).scrollTop() == 1000) {
        if($("title").html()=="简书 - 创作你的创作"){
            ReadMore();
        }
    }
    if ($(window).scrollTop() > 200) {
        $('.back-top').show();
    }
    if ($(window).scrollTop() <= 200) {
        $('.back-top').hide();
    }
    if ($(window).scrollTop() == 0) {
        $('.side-adv').css('top', 0);
        $('.left-side').css('top',0);
    } else {
        $('.side-adv').css('top', $(window).scrollTop());
        $('.left-side').css('top',$(window).scrollTop());
    }
    if ($(window).scrollTop() > 400) {
        $('.backtop').show();
    } else {
        $('.backtop').hide();
    }
});
$('.back-top').click(function () {
    $('html,body').animate({'scrollTop': '0px'}, 1000);
});

$('.unfold').on("click", function () {
    event.preventDefault();
    if ($(this).children('p').text() == "展开更多") {
        $('.admin-list').css('height', 590 + 'px');
        $(this).children('p').text("收起");
        $(this).children('span').css('transform', 'rotate(270deg)');
        $('.anthology').css('height', 625 + 'px');
        $("body").css({ "overflow": "visible" });
    } else {
        $('.admin-list').css('height', 400 + 'px');
        $(this).children('p').text("展开更多");
        $(this).children('span').css('transform', 'rotate(90deg)');
        $('.anthology').css('height', 306 + 'px');
    }
});
$('.author-list li').hover(function () {
    $(this).children('.over').show();
}, function () {
    $(this).children('.over').hide();
});
$('.close').click(function () { /*关闭侧边广告*/
    $('.side-adv').hide();
});
$('.side-tool ol').children().hover(function () {
    $(this).children().eq(1).fadeIn('fast');
}, function () {
    $(this).children().eq(1).hide();
});
$('.side-tool-share').children().mouseenter(function () {
    $('.tool-tip').hide();
});
$('.icon-Backtop-Top').click(function () {
    $('html,body').animate({'scrollTop': ''}, 1000);
});
$('.ah-info span img').hover(function () {
    $(this).next().fadeIn('fast');
}, function () {
    $(this).next().fadeOut('fast');
});
$('.wechat').hover(function () {
    $(this).children().eq(1).fadeIn('fast');
}, function () {
    $(this).children().eq(1).fadeOut('fast');
});
$('.sina').hover(function () {
    $(this).children().eq(1).fadeIn('fast');
}, function () {
    $(this).children().eq(1).fadeOut('fast');
});
$('.picture').hover(function () {
    $('.qrcode').fadeIn();
}, function () {
    $('.qrcode').fadeOut();
});
$(".wechat").click(function () {
    $(".bg-modal").fadeTo(300,1);
    $("body").css({ "overflow": "hidden" });
});
$('.back-top').hover(function () {
    $(this).children('.tool-tip').fadeIn('fast');
}, function () {
    $(this).children('.tool-tip').fadeOut('fast');
});
$(".bg-modal").click(function () {hidemodal();});
$(".close-modal").click(function () {hidemodal();});
function hidemodal(){
    $(".bg-modal").hide();
    $("body").css({ "overflow": "visible" });
}
$('.sign a').click(function () {
    $(this).parent().remove();
    window.open('sign_in.html');
});
$('textarea').focus(function () {/*评论框聚焦事件*/
    $('.write-choice').fadeIn();
});
$('.cancel').click(function () {
    $('.write-choice').fadeOut();
});
function time(d) {/*调整时间格式月份,日,时分秒小于10时自动在前面补0*/
    if (d < 10) {
        d = '0' + d;
    }
    return d;
};
$('.sent').click(function () {/*发送按钮事件*/
    if ($('textarea').val().trim() == "") {
        alert("请输入评论!");
    } else {
        var myDate = new Date();
        var years = myDate.getFullYear();
        var month = myDate.getMonth() + 1;
        var dates = myDate.getDate();
        var hours = myDate.getHours();
        var minutes = myDate.getMinutes();
        var dateTime = years + '.' + time(month) + '.' + time(dates) + ' ' + time(hours) + ':' + time(minutes);
        var tag = $('.comments').eq(0);
        tag.after(tag.clone(true));
        tag.children('.author_info').children('p').children('.date').html(dateTime);
        tag.children('.comm_content').children('p').html($('textarea').val().trim());
        $('textarea').val("");
    }
});
$('.rec-search li a').hover(function () {
    $(this).children('.clear').show()
}, function () {
    $(this).children('.clear').hide()
});
$('.clear-all').on("click", function () {
    $('.rec-search').html("")
});
$('.clear').on("click", function () {
    $(this).parent().parent().remove()
});
$('.more_login li:last').children('a').click(function(){
    $(this).html(`<i class="iconfont icon-douban" onclick="newLink();"></i>`);
});
function newLink(){
    $('.more_login li:last').children('a').attr('href',"sign_up.html");
};
/*注册表单验证开始*/
function checkUser(){
    var ckeckUser = /^[a-zA-Z0-9_-]{2,15}$/;
    var userid=$('#userid').val();
    if (!ckeckUser.test(userid)){
        $('.error').eq(0).css('display','flex');
        return 1;
    }else{
        $('.error').eq(0).hide();
        return 0;
    }

};
function checkPhone(){
    var phone=$('#phone').val();
    var checkPhone = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
    if (!checkPhone.test(phone)){
        $('.error').eq(1).css('display','flex');
        $('.send-verify').css({'background':'rgb(157,220,147)','cursor':'not-allowed'});
        return 1;
    }else{
        $('.error').eq(1).hide();
        $('.wrap').eq(2).css('display','inline-block');
        $('.send-verify').removeAttr('disabled').css({'background':'#42c02e','cursor':'pointer'});
        return 0;
    }
};
$('#phone').focus(function(event){
    event.stopPropagation();
    $('.wrap').eq(2).css('display','inline-block');
});
function checkVerify(){
    var verify=$('#verify').val();
    var checkVerify=/^\d{6}$/;
    if (!checkVerify.test(verify)){
        $('.error').eq(2).css('display','flex');
        return 1;
    }else{
        $('.error').eq(2).hide();
        return 0;
    }
};
function checkPwd(){
    var pwd=$('#pass').val();
    var checkPwd=/^[a-zA-Z]\w{5,17}$/;
    if (!checkPwd.test(pwd)){
        $('.error').eq(3).css('display','flex');
        return 1;
    }else{
        $('.error').eq(3).hide();
        return 0;
    }
};
function checkReg(){
    if(checkUser()==checkPhone()==checkVerify()==checkPwd()==0){
        return true;
    }else{return false;}
};
/*注册表单验证结束*/