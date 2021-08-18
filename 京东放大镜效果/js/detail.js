window.addEventListener('load', function () {
    var preview_img = document.querySelector('.preview_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');

    //1.鼠标移进显示遮挡层和大图片,mouseover事件
    preview_img.addEventListener('mouseover', function () {
        mask.style.display = 'block';
        big.style.display = 'block';
    });
    //鼠标离开隐藏遮挡层和大图片，mouseout事件
    preview_img.addEventListener('mouseout', function () {
        mask.style.display = 'none';
        big.style.display = 'none';
    });
    //2.鼠标移动让遮挡层跟着鼠标
    preview_img.addEventListener('mousemove', function (e) {
        let x = e.pageX - this.offsetLeft;
        let y = e.pageY - this.offsetTop;
        //让鼠标放盒子中间，让遮挡层移动一半宽度
        maskX = x - mask.offsetWidth / 2;
        maskY = y - mask.offsetWidth / 2;
        //把遮挡层限制在预览图片内，在四个方向做限制
        maskMax = preview_img.offsetWidth - mask.offsetWidth;
        if (maskX < 0) {
            maskX = 0;
        }
        else if (maskX > maskMax) {
            maskX = maskMax;
        }
        if (maskY < 0) {
            maskY = 0;
        }
        else if (maskY > maskMax) {
            maskY = maskMax;
        }
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        // 3. 移动黄色遮挡层，大图片跟随移动功能。
        // 大图片的移动距离 = 遮挡层移动距离 * 大图片最大移动距离 / 遮挡层的最大移动距离。成比例
        var bigIMg = document.querySelector('.bigImg');
        bigMax = big.offsetWidth - bigIMg.offsetWidth;

        bigX = maskX * bigMax / maskMax;
        bigY = maskY * bigMax / maskMax;

        bigIMg.style.left = bigX + 'px';
        bigIMg.style.top = bigY + 'px';
    })
})