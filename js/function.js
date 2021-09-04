//상단 슬라이드
$(function(){
    //top-슬라이드
    var $slides=$(".h_container>.top_sbn>.top_slide>ul");
    var $slide_container=$("header>.h_container>.top_sbn");
    var $prevBtn=$(".h_container>.top_sbn>.top_slide_navigation>a.prev");
    var $nextBtn=$(".h_container>.top_sbn>.top_slide_navigation>a.next");
    var nowIdx=1;
    var oldIdx=nowIdx;
    var aniChk=false;
    
    var move=function(direction){
        $slides.stop().animate({
            "left":-150*nowIdx
        },2000,function(){
			if(direction=="next"){
				nextSlide();
			}else{
				prevSlide();
			}
			aniChk=false;
		});
    };
    
    var nextSlide=function(){
		if(nowIdx>10){
			var $temp=$slides.children().slice(2,9).remove();
			$slides.children().slice(2,9).appendTo($slides);
			$slides.append($temp).css({
				"left":-150
			});
			nowIdx=1;	
		}
	};
    
    var prevSlide=function(){
		if(nowIdx<1){
			var $temp=$slides.children().slice(0,10).remove();
			$slides.children().slice(0,10).prependTo($slides);
			$slides.prepend($temp).css({
				"left":-150*10
			});
			nowIdx=10;
		}
	};
    
    //다음버튼
    $nextBtn.on("click",function(evt){
        evt.preventDefault();
        if(aniChk==false){
			aniChk=true;
			oldIdx=nowIdx;
			nowIdx++;
			move("next");
		}	
    });
	
    //이전버튼
	$prevBtn.on("click",function(evt){
		evt.preventDefault();
		if(aniChk==false){
			aniChk=true;
			oldIdx=nowIdx;
			nowIdx--;
			move("prev");
		}
	});
    
    //윈도우 로드
    $(window).on("load",function(){
        topSlide=setInterval(function(){
           if(aniChk==false){
               aniChk=true;
               oldIdx=nowIdx;
               nowIdx++;
               move("next");
           }
        },2000);
    });
    
    //마우스엔터,리브
    $slide_container.on("mouseenter",function(){
       clearInterval(topSlide); 
    });

    $slide_container.on("mouseleave",function(){
       topSlide=setInterval(function(){
           if(aniChk==false){
               aniChk=true;
               oldIdx=nowIdx;
               nowIdx++;
               move("next");
           }
       },2000);
    });    
});

//브랜드 카테고리
$(function(){
    var $brandTab=$(".brand>.tab_container>.brand_tab>ul>li>a");
    var $tabList=$(".brand>.tab_container>.tab_list1>.category>ul>li>a");
    var $tabList2=$(".brand>.tab_container>.tab_list1>.category>ul>li");
    var $list=$(".brand>.tab_container>.tab_list1>.category_list>ul>li");
    var listIdx=0;
    
    $(window).on("load",function(){
        $tabList.eq(0).trigger("click"); 
    }); 
    
    //브랜드 클릭
    $("header>.nav_container .brand>a").on("click",function(){
        $(this).toggleClass("open");
        $("header>.nav_container .brand>.tab_container").slideToggle();
    });
    
    //브랜드 탭 버튼(카테고리순,ABC순)
    $brandTab.on("click",function(evt){
        evt.preventDefault();
        var tabidx=$brandTab.index(this);  
        $brandTab.eq(tabidx).parent().addClass("on").siblings().removeClass("on");
        $(".brand>.tab_container>div").not(".brand_tab,.brand_close").eq(tabidx).show().siblings().not(".brand_tab,.brand_close").hide();  
    });
    
    //중카테고리(스킨케어,메이크업...)
    $tabList.on("click",function(evt){
        evt.preventDefault();
        listIdx=$(this).parent().index();      
        $tabList.eq(listIdx).parent().addClass("on").children("ul").show();
        $tabList.eq(listIdx).parent().siblings().removeClass("on").children("ul").hide();
    });
    
    //ABC순
    var $abcTab=$(".brand>.tab_container>.tab_list2>.abc_tab>ul>li>a");
    var abcIdx=0;
    
    $abcTab.on("click",function(evt){
        evt.preventDefault();
        abcIdx=$abcTab.index(this);
        $abcTab.eq(abcIdx).parent().addClass("on").siblings().removeClass("on");
    });
    
    //닫기
    $(".brand>.tab_container>.brand_close>a").on("click",function(evt){
        evt.preventDefault();
        $("header>.nav_container .brand>.tab_container").slideUp();
    });
});

//메뉴 호버
$(function(){
    var $mnu=$("header>.nav_container>nav>.mnu>li>a");
    var $mnuList=$("header>.nav_container>nav>.mnu>li>.mnu_list");
    var nowIdx=0;
    
    $mnu.on("mouseenter",function(){
        nowIdx=$(this).parent().index();
        $mnu.eq(nowIdx).parent().addClass("on");
        $mnuList.eq(nowIdx).stop().show();
    });
    
    $mnuList.on("mouseenter",function(){
        $mnu.eq(nowIdx).parent().addClass("on");
        $mnuList.eq(nowIdx).stop().show();
    });
    
    $mnu.on("mouseleave",function(){
        $mnu.eq(nowIdx).parent().removeClass("on");
        $mnuList.eq(nowIdx).stop().hide();
    });
    
    $mnuList.on("mouseleave",function(){
        $mnu.eq(nowIdx).parent().removeClass("on");
        $mnuList.eq(nowIdx).stop().hide();
    });
});

//메인 슬라이드
$(function(){
    var $slide=$("#main>.main_slide>ul>li>dl>dt");
    var $mainImg=$("#main>.main_slide>ul>li>dl>dd>img");
    var $container=$("#main>.main_slide>ul>li");
    var $nextBtn=$("#main>.main_slide>.main_slide_navigation>a.next");
    var $prevBtn=$("#main>.main_slide>.main_slide_navigation>a.prev");
    var $slideIdx=$("#main>.main_slide>.main_slide_navigation>p>span.now");
    var hoverIdx=0;
    var nowIdx=4;
    var oldIdx=nowIdx;
    
    var move=function(){
        $container.eq(nowIdx).addClass("on").siblings().removeClass("on");
        
        if(nowIdx>-1){
			$container.eq(nowIdx-5).appendTo($("#main>.main_slide>ul"));
        }
        
        if(nowIdx<16){
			$container.eq(nowIdx-4).prependTo($("#main>.main_slide>ul"));
        }
        
        $slideIdx.text(nowIdx+1);
    };
    
    $(window).on("load",function(){
        mainSlide=setInterval(function(){
            nowIdx++;
            move();
            if(nowIdx==16){
                nowIdx=-1;
            }
        },1700);
    });
    
    $nextBtn.on("click",function(evt){
        evt.preventDefault();
        nowIdx++;
        move();
        if(nowIdx==16){
            nowIdx=-1;
        }
    });
    
    $prevBtn.on("click",function(evt){
		evt.preventDefault();
		nowIdx--;
        move();
        if(nowIdx==-1){
            nowIdx=16;
            $slideIdx.text(17);
        }
	});
    
    $slide.on("mouseenter",function(){
        clearInterval(mainSlide);
        hoverIdx=$slide.index(this);
        $container.eq(nowIdx).removeClass("on");
        $container.eq(hoverIdx).addClass("ative");
    });
    
    $slide.on("mouseleave",function(){
        mainSlide=setInterval(function(){
            nowIdx++;
            move();
            if(nowIdx==16){
                nowIdx=-1;
            }
        },1700);
        
        $container.removeClass("ative");
        $container.eq(nowIdx).addClass("on");  
    });
    
    $mainImg.on("mouseenter",function(){
        clearInterval(mainSlide);
    });
    
    $mainImg.on("mouseleave",function(){
        mainSlide=setInterval(function(){
            nowIdx++;
            move();
            if(nowIdx==16){
                nowIdx=-1;
            }
        },1700);
    });
});

//메인 스몰 슬라이드
$(function(){
    var $slides=$("#main>.main_small_slide>.slide_container>ul");
    var $slide_container=$("#main>.main_small_slide>.slide_container");
    var $slide_page=$("#main>.main_small_slide>.main_small_slide_control>.page>span.now");
    var $prevBtn=$("#main>.main_small_slide>.main_small_slide_control>.navigation>a.prev");
    var $nextBtn=$("#main>.main_small_slide>.main_small_slide_control>.navigation>a.next");
    var nowIdx=1;
    var oldIdx=nowIdx;
    var aniChk=false;
    
    var move=function(direction){
        $slides.stop().animate({
            "left":-252*nowIdx
        },2000,function(){
			if(direction=="next"){
				nextSlide();
			}else{
				prevSlide();
			}
			aniChk=false;
		});
        
        $slide_page.text(nowIdx);
        if(nowIdx==14){
            $slide_page.text(1);
        }
        if(nowIdx==0){
            $slide_page.text(13);
        }
    };
    
    var nextSlide=function(){
		if(nowIdx>13){
			var $temp=$slides.children().slice(0,15).remove();
			$slides.append($temp).css({
				"left":-252
			});
			nowIdx=1;	
		}
	};
    
    var prevSlide=function(){
		if(nowIdx<1){
			var $temp=$slides.children().slice(0,15).remove();
			$slides.prepend($temp).css({
				"left":-252*13
			});
			nowIdx=13;
		}
	};
    
    //다음버튼
    $nextBtn.on("click",function(evt){
        evt.preventDefault();
        if(aniChk==false){
			aniChk=true;
			oldIdx=nowIdx;
			nowIdx++;
			move("next");
		}	
    });
	
    //이전버튼
	$prevBtn.on("click",function(evt){
		evt.preventDefault();
		if(aniChk==false){
			aniChk=true;
			oldIdx=nowIdx;
			nowIdx--;
			move("prev");
		}
	});
    
    //윈도우 로드
    $(window).on("load",function(){
        mainSmallSlide=setInterval(function(){
           if(aniChk==false){
               aniChk=true;
               oldIdx=nowIdx;
               nowIdx++;
               move("next");
           }
        },2000);
    });
    
    //마우스엔터,리브
    $slide_container.on("mouseenter",function(){
       clearInterval(mainSmallSlide); 
    }); 
    
    $slide_container.on("mouseleave",function(){
       mainSmallSlide=setInterval(function(){
           if(aniChk==false){
               aniChk=true;
               oldIdx=nowIdx;
               nowIdx++;
               move("next");
           }
       },2000);
    });
});

//오늘의 럭키딜
$(function(){
    //남은시간
    function dailyMissionTimer(duration) {

        var timer = duration * 3600;
        var hours, minutes, seconds;
        var interval = setInterval(function(){
            hours	= parseInt(timer / 3600, 10);
            minutes = parseInt(timer / 60 % 60, 10);
            seconds = parseInt(timer % 60, 10);

            hours 	= hours < 10 ? "0" + hours : hours;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            $('#time-hour').text(hours);
            $('#time-min').text(minutes);
            $('#time-sec').text(seconds);
            if (--timer < 0) {
                timer = 0;
                clearInterval(interval);
            }
        }, 1000);
    }

    dailyMissionTimer(24);	// hour base
    
    //스와이프
    var swiper = new Swiper('.swiper-container', { 
        slidesPerView: "auto",
        spaceBetween: 30,
        slidesPerGroup: 1,
        centeredSlides: true,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
});

//wide 슬라이드
$(function(){
    var $slide=$("#wide>.wide_container>ul");
    var $slide_container=$("#wide>.wide_container");
    var $slide_page=$("#wide>.wide_control>.page>span.now");
    var $prev=$("#wide>.wide_control>.navigation>a.prev");
    var $next=$("#wide>.wide_control>.navigation>a.next");
    var nowIdx=1;
    var aniChk=false;
    
    var move=function(direction){
        $slide.stop().animate({
           "left":-1080*nowIdx
        },2000,function(){
            if(direction=="next"){
                nextSlide();
            }else{
                prevSlide();
            }
            aniChk=false;
        });
        
        $slide_page.text(nowIdx);
        if(nowIdx==17){
            $slide_page.text(1);
        }
        if(nowIdx==0){
            $slide_page.text(16);
        }
    };
    
    var nextSlide=function(){
        if(nowIdx>16){
            var $temp=$slide.children().slice(0,18).remove();
			$slide.append($temp).css({
				"left":-1080
			});
			nowIdx=1;
        }
    };
    
    var prevSlide=function(){
        if(nowIdx<1){
            var $temp=$slide.children().slice(0,18).remove();
            $slide.prepend($temp).css({
                "left":-1080*16
            });
            nowIdx=16;
        }
    }
    
    $next.on("click",function(evt){
        evt.preventDefault();
        if(aniChk==false){
            aniChk=true;
            nowIdx++;
            move("next");
        }
    });
    
    $prev.on("click",function(evt){
        evt.preventDefault();
        if(aniChk==false){
            aniChk=true;
            nowIdx--;
            move("prev");
        }
    });
    
    $(window).on("load",function(){
        Slide=setInterval(function(){
            if(aniChk==false){
                aniChk=true;
                nowIdx++;
                move("next");
            }
        },2000);
    });
    
    $slide_container.on("mouseenter",function(){
        clearInterval(Slide);
    });
    
    $slide_container.on("mouseleave",function(){
        Slide=setInterval(function(){
            if(aniChk==false){
                aniChk=true;
                nowIdx++;
                move("next");
            }
        },2000);
    });
});

//curation
$(function(){
    var $list=$("#curation>.curation_container>.curation_list>ul>li");
    var $hover=$("#curation>.curation_container>.curation_list>ul>li>.hover");
    var $price=$("#curation>.curation_container>.curation_list>ul>li>.product>a.txt>p.price");
    var nowIdx=0;
    
    $list.on("mouseenter",function(){
        nowIdx=$(this).index();        
        $list.eq(nowIdx).addClass("on").siblings().removeClass("on");
        $hover.eq(nowIdx).show();
        $price.eq(nowIdx).hide();
    });
    
    $list.on("mouseleave",function(){
        $list.removeClass("on");
        $hover.hide();
        $price.show();
    });
});

//content
$(function(){
    //plan
    var $slide=$("#content>.plan>.big>.big_slide>ul");
    var $slide_container=$("#content>.plan>.big>.big_slide");
    var $slide_page=$("#content>.plan>.big>.big_control>.page>span.now");
    var $prev=$("#content>.plan>.big>.big_control>.navigation>a.prev");
    var $next=$("#content>.plan>.big>.big_control>.navigation>a.next");
    var nowIdx=1;
    var aniChk=false;
    
    var move=function(direction){
        $slide.stop().animate({
           "left":-540*nowIdx
        },2000,function(){
            if(direction=="next"){
                nextSlide();
            }else{
                prevSlide();
            }
            aniChk=false;
        });
        
        $slide_page.text(nowIdx);
        if(nowIdx==18){
            $slide_page.text(1);
        }
        if(nowIdx==0){
            $slide_page.text(17);
        }
    };
    
    var nextSlide=function(){
        if(nowIdx>17){
            var $temp=$slide.children().slice(0,19).remove();
			$slide.append($temp).css({
				"left":-540
			});
			nowIdx=1;
        }
    };
    
    var prevSlide=function(){
        if(nowIdx<1){
            var $temp=$slide.children().slice(0,19).remove();
            $slide.prepend($temp).css({
                "left":-540*17
            });
            nowIdx=17;
        }
    }
    
    $next.on("click",function(evt){
        evt.preventDefault();
        if(aniChk==false){
            aniChk=true;
            nowIdx++;
            move("next");
        }
    });
    
    $prev.on("click",function(evt){
        evt.preventDefault();
        if(aniChk==false){
            aniChk=true;
            nowIdx--;
            move("prev");
        }
    });
    
    $(window).on("load",function(){
        Slide=setInterval(function(){
            if(aniChk==false){
                aniChk=true;
                nowIdx++;
                move("next");
            }
        },2000);
    });
    
    $slide_container.on("mouseenter",function(){
        clearInterval(Slide);
    });
    
    $slide_container.on("mouseleave",function(){
        Slide=setInterval(function(){
            if(aniChk==false){
                aniChk=true;
                nowIdx++;
                move("next");
            }
        },2000);
    });
    
    //best
    var $best_cate=$("#content>.best>.best_category>ul>li>a");
    var $product_list=$("#content>.best>.product_list>.list");
    var $product_list2=$("#content>.best>.product_list>ul>li");
    var cateIdx=0;
    var listIdx=0;
    
    $best_cate.on("click",function(evt){
        evt.preventDefault();
        cateIdx=$best_cate.index(this);        
        $best_cate.eq(cateIdx).parent().addClass("on").siblings().removeClass("on");
        $product_list.eq(cateIdx).stop().show().siblings().stop().hide();
    });
    
    $product_list2.on("mouseenter",function(){
        listIdx=$product_list2.index(this);
        $product_list2.eq(listIdx).addClass("on");
    });
    
    $product_list2.on("mouseleave",function(){
        $product_list2.removeClass("on");
    });
    
});

//customer,footer
$(function(){
    var $bbsMnu=$("#customer>.customer_bbs>ul>li>a");
    var $bbsList=$("#customer>.customer_bbs>.bbs_list");
    var bbsIdx=0;
    
    $bbsMnu.on("click",function(evt){
        evt.preventDefault();
        bbsIdx=$bbsMnu.index(this);
        $bbsMnu.eq(bbsIdx).parent().addClass("on").siblings().removeClass("on");
        $bbsList.eq(bbsIdx).stop().show();
        $bbsList.eq(bbsIdx).siblings(".bbs_list").stop().hide();
    });
    
    var $family=$("footer>.footer_mnu>.family_site>a");
    var $list=$("footer>.footer_mnu>.family_site>.family_site_list");
    
    $family.on("click",function(evt){
        evt.preventDefault();
        $(this).toggleClass("on");
        $list.slideToggle();
    });
});









