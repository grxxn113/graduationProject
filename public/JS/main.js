(()=>{
    var body = document.querySelector('body');
    var menuState = false; // 메뉴창이 접혀있는 상태가 false, 펼쳐져있는 상태가 true


    function Checkmenu(e){
        // 메뉴창을 열고 닫는 기능 구현
        var menu = document.querySelector('.menuIcon');
        var mobileMenu = document.querySelector('.menuIcon.mobile');
        var menuList = document.querySelector('.menuList');
        var mobileMenuList = document.querySelector('.mobileMenuList');
        var closeBtn = document.querySelector('.closeBtn');
        var upBtn = document.querySelector('.upBtn');

        if(e.target === menu || e.target === mobileMenu){
            if(menuState === false) {
                // 메뉴가 닫혀있던 상태였다면 메뉴를 열어준다.
                menuList.style.visibility = 'visible';
                mobileMenuList.style.visibility = 'visible';
                menuState = true;
                if(matchMedia("screen and (max-width: 767px)").matches){
                    body.style.overflow = 'hidden';
                    upBtn.style.display = 'none';
                    menuState = true;
                }
            } else if (menuState === true) {
                // 메뉴가 열려있던 상태였다면 메뉴를 닫아준다.
                menuList.style.visibility = 'hidden';
                mobileMenuList.style.visibility = 'hidden';
                menuState = false;
            }
        } else {
            menuList.style.visibility = 'hidden';
            menuState = false;
            body.style.overflow = 'visible'
            upBtn.style.display = 'inline'
        }

        // mobile에서 close버튼이 눌리면 메뉴를 숨김
        if(e.target === closeBtn){
            mobileMenuList.style.visibility = 'hidden';
        }
    }

    function pageTop(e){
        // pageup 버튼을 누르면 웹페이지의 상단으로 이동한다.
        var upBtn = document.querySelector('.upBtnIcon');

        if(e.target === upBtn){
            window.scrollTo(0, 0);
        }
    }

    function lastArticle(){
        // 마지막 기사에 margin-bottom을 추가해준다.
        // article이 추가되어도 margin-bottom은 항상 마지막 기사에 추가됨.
        var articles = document.querySelectorAll('.article');
        var lastArticle = articles[articles.length-1];
        if(lastArticle){
            lastArticle.style.marginBottom = '180px';
        }
        
    }



    window.addEventListener('click', (e)=>{
        Checkmenu(e);
        pageTop(e);
    })

    window.addEventListener('load', ()=>{
        lastArticle();
    })
    
})()