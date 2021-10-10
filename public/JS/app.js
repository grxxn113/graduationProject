var currentWater = 700;
// currentWater 변수는 즉각 반응하여 바껴야 하므로 전역변수로 설정해줘야 한다.

class App {
    constructor(){
        this.canvas = document.querySelector('.canvas');
        this.ctx = this.canvas.getContext('2d');
        
        window.addEventListener('resize', this.resize.bind(this));
        this.wave = new Wave();
        this.resize();

        requestAnimationFrame(this.animate.bind(this));
    }

    resize(){
        const bowl = document.getElementById('waterRise');
        this.stageWidth = document.getElementById('waterRise').clientWidth;
        this.stageHeight = document.getElementById('waterRise').clientHeight;

        this.canvas.setAttribute('width', `${bowl.clientWidth*2}px`);
        this.canvas.setAttribute('height', `${bowl.clientHeight*2}px`);
        this.ctx.scale(2, 2);

        this.wave.resize(this.stageWidth, this.stageHeight, currentWater);
    }

    animate(t){
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
        this.wave.draw(this.ctx);
        requestAnimationFrame(this.animate.bind(this))
    }
}

window.onload = ()=>{
    new App();
}

class Point {
    constructor(index, x, y){
        this.x = x;
        this.y = y;
        this.fieldY = y;
        this.speed = 0.07;
        this.cur = index;
        this.max = Math.random() * 100 + 30;
    }
    update(){
        this.cur += this.speed;
        this.y = this.fieldY + Math.sin(this.cur) * this.max;
    }
}

class Wave {
    constructor(color){
        this.color = color;
        this.points = [];
        this.totalPoints = 5;
    }

    resize(stageWidth, stageHeight, currentWater){
        // const currentWater;
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        this.centerX = stageWidth / 2;
        this.currentY = currentWater;
        this.pointGap = this.stageWidth / (this.totalPoints - 1);

        this.init();
    }
    init(){
        for(let i = 0; i < this.totalPoints; i++){
            this.points[i] = new Point(i, this.pointGap * i, this.currentY);
        }
    }
    draw(ctx){
        ctx.beginPath();

        // 곡선을 위해 이전의 좌표 기억하기
        let prevX = this.points[0].x;
        let prevY = this.points[0].y;

        ctx.moveTo(prevX, prevY);

        for(let i = 0; i < this.totalPoints; i++){
            const cx = (prevX + this.points[i].x) / 2;
            const cy = (prevY + this.points[i].y) / 2;

            ctx.quadraticCurveTo(prevX, prevY, cx, cy);

            prevX = this.points[i].x;
            prevY = this.points[i].y;

            if(i != 0 && i != this.totalPoints-1){
                this.points[i].update();
            }
        }

        ctx.lineTo(prevX, prevY);
        ctx.lineTo(this.stageWidth, this.stageHeight);
        ctx.lineTo(0, this.stageHeight);
        ctx.lineTo(this.points[0].x, this.points[0].y);

        ctx.fillStyle = "rgba(0, 146, 199, 0.4)";
        ctx.fill();
        ctx.closePath();
    }
}




// 현재 마신 물의 양을 계산해 wave에 적용시켜 wave 높이를 바꿔준다.
(()=>{
    function storeWater(e){
        var goal = document.getElementById('goal').value;
        var waterIn = document.getElementById('waterIn').value;
        var totalWater = document.querySelector('.totalWater');
        // 총 마신 물 양을 html로 보내주는 역할, 계속해서 더해줘야 함
        var addWater = 0;
        var remainWater = document.querySelector('.remainWater');
        // 남은 물 양. 목표양 - 총 마신 양
        var remain = 0;
        var remainText = document.querySelector('.remain');
        var submitWater = document.querySelector('.submitWater');

        if(waterIn){
            // waterIn에 입력이 있다면 실행
            addWater = parseInt(totalWater.innerText) + parseInt(waterIn);
            totalWater.textContent = addWater;
            remain = parseInt(remainWater.innerText) - parseInt(waterIn);
            remainWater.textContent = remain;

            // 목표를 달성한 경우 (마신 물 양 = 목표량)
            if(parseInt(goal) === parseInt(addWater)){
                alert("목표를 달성하였습니다 !")
                remainText.textContent = '오늘의 목표를 달성하셨네요 !'
            } else if(parseInt(goal) < parseInt(addWater)){
                // 목표량보다 더 많이 마신 경우 remain의 내용을 바꿔준다.
                remainText.textContent = '오늘의 목표를 달성하셨네요 !'
            }
        }

        // Wave의 높이를 바꿔주기 위한 코드
        // 모든 계산이 끝나고 적용된 뒤 currentRatio을 계산
        const h = document.getElementById('waterRise').clientHeight;
        const currentRatio = parseInt(addWater) / parseInt(goal) ;
        console.log(h - (h * currentRatio));
        
        while(currentRatio){
            currentWater = h - (h * currentRatio)
            new App();
            break;
        }
    }

    window.addEventListener('submit', (e)=>{
        var recStoreForm = document.querySelector('.recStoreForm');

        e.preventDefault();

        if (e.target === recStoreForm){
            // record.html 하단에 있는 마신 물 양 저장 함수
            storeWater();
            // waveWater();
        }
    })
})();
