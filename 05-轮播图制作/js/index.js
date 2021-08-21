window.addEventListener('load', function () {
    // 1. 获取元素
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    let num = 0; //放到第几张图
    let circle = 0; //控制小圆圈变化
    // 2. 鼠标经过focus 就显示隐藏左右按钮
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
    });
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        //自动播放轮播图
        timer = setInterval(function () {
            arrow_r.click();
        }, 2000);
    });
    //3.动态生成小圆圈
    let ul = focus.querySelector('ul');//元素也有getElementById,querySelector这些方法
    let ol = focus.querySelector('.circle');
    for (let i = 0; i < ul.children.length; i++) {
        let li = document.createElement('li');
        li.setAttribute('index', i);//设置索引号
        ol.appendChild(li);
    }
    ol.children[0].className = 'current';

    //克隆第一张图片，写在生成小圆圈之后，这样就不会生成多余的小圆圈
    let first = ul.children[0].cloneNode(true);
    ul.appendChild(first);

    //4.小圆圈排他思想，让点击的小圆点变色
    for (let i = 0; i < ol.children.length; i++) {
        ol.children[i].addEventListener('click', function () {
            for (let j = 0; j < ol.children.length; j++) {
                ol.children[j].className = '';
            }
            this.className = 'current';
            //5.点击小圆圈切换图片，是ul不是li移动
            //移动的距离是小圆圈的索引号乘以图片的宽度
            let index = this.getAttribute('index');
            //点击小圆圈的索引同步给左右滑动模块
            num = index;
            //当我们点击某个小li，就要把li的索引给circle
            circle = index;
            let focusWidth = focus.offsetWidth;
            animate(ul, -index * focusWidth);
        })
    }

    //节流阀目的：当上一个函数动画内容执行完毕，再去执行下一个函数动画，让事件无法连续触发。
    let flag = true;
    //右侧按钮点击切换
    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false;//关闭节流阀
            //图片无缝滚动原理
            //如果走到克隆的最后一张图片时，此时我们的ul要快速复原left为0（回到第一张），这个变化肉眼看不来
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function () {
                flag = true; //动画结束后再打开节流阀
            });

            //点击按钮后，小圆圈也跟着变化
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            for (let j = 0; j < ol.children.length; j++) {
                ol.children[j].className = '';
            }
            ol.children[circle].className = 'current';
        }
    });
    //左侧按钮点击切换
    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag = false;//关闭节流阀
            if (num == 0) {
                ul.style.left = -(ul.children.length - 1) * focusWidth + 'px';
                num = ul.children.length - 1;
            }
            num--;
            animate(ul, -num * focusWidth, function () {
                flag = true; //动画结束后再打开节流阀
            });

            //点击按钮后，小圆圈也跟着变化
            circle--;
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            for (let j = 0; j < ol.children.length; j++) {
                ol.children[j].className = '';
            }
            ol.children[circle].className = 'current';
        }
    });

    //自动播放轮播图
    var timer = setInterval(function () {
        arrow_r.click();
    }, 2000);
})