// 绑定侧导航，鼠标移上对应的弹出框弹出
let sidenav = document.getElementsByClassName("sidenav");
for (var i = 0; i < sidenav.length; i++) {
    sidenav[i].onmouseenter = function () {
        child = this.children;
        child[1].style.display = "block";
    }
    sidenav[i].onmouseleave = function () {
        child = this.children;
        child[1].style.display = "none";
    }
}
// 轮播图
var liList = $("#imgWrap li");
var dotWrap = $("#dotWrap")[0];
var wrap = $("#wrap");
// 当前在第几张上
var n = 0;
// 当前动画是否正在执行
var isAnimation = false;

// 动态生成小圆点
for (var i = 0; i < liList.length; i++) {
    var span = document.createElement('li')
    span.setAttribute("data-index", i)
    dotWrap.appendChild(span)
    if (i === 0) {
        span.className = "focus"
    }
}

var dotList = $("#dotWrap li")

function changeImg() {
    // 隐藏所有图片 
    for (var i = 0; i < liList.length; i++) {
        liList[i].className = ""
        dotList[i].className = ""
    }

    dotList[n].className = "focus";
    // 显示第n张图片
    liList[n].className = "show";
    liList[n].style.opacity = 0;
    isAnimation = true;
    var fade = setInterval(function () {
        var o = parseFloat(liList[n].style.opacity);
        if (o >= 1) {
            clearInterval(fade);
            isAnimation = false;
            return;
        }
        liList[n].style.opacity = o + 0.02;
    }, 16)

}


bindEvent(dotList, "onclick", function () {
    if (isAnimation) {
        return;
    }
    n = this.getAttribute("data-index");
    changeImg()
})

// 购物车加减效果
        let add = document.getElementsByClassName("buy-add")[0];
        let sub = document.getElementsByClassName("buy-del")[0];
        let del = document.getElementsByClassName("book-del")[0];
        let subprice= document.getElementsByClassName("sp_price")[0];
        let totalcount = document.getElementById("buy_num");
        let totalprice = document.getElementById("total");
        // 暂时购物车只有一件东西
        // for (let i = 0; i < add.length; i++) {
        //     let count = add[i].parentNode.querySelector(".count");
        //     let subtotal = add[i].parentNode.parentNode.querySelector(".subtotal");
        //     let subprice = add[i].parentNode.parentNode.querySelector(".subprice");
            // 绑定+,点击数字增加
            add.onclick = function () {
                totalcount.innerHTML = parseInt(totalcount.innerHTML) + 1;
                totalprice.innerHTML = (totalcount.innerHTML) * parseFloat(subprice.innerHTML);
                computed()
            }
            // 绑定-,点击数字减小
            sub.onclick = function () {
                let iscount = parseInt(totalcount.innerHTML);
                if (iscount > 0) {
                    totalcount.innerHTML = iscount - 1;
                    totalprice.innerHTML = (totalcount.innerHTML) * parseFloat(subprice.innerHTML);
                }
                computed()
            }
            // 点击删除动画整行消失
            del.onclick = function () {
                let tr = this.parentNode.parentNode;
                tr.style.opacity = 1;
                let fade = setInterval(function () {
                    let o = parseFloat(tr.style.opacity);
                    tr.style.opacity = o - 0.05;
                    if (o < 0) {
                        clearInterval(fade);
                        tr.remove();
                        computed();
                        return;
                    }
                }, 16)
            }
        // 页脚的数量和价格
        function computed() {
            let count1 = 0;
            let price1 = 0;
            for (let i = 0; i < add.length; i++) {
                count1 = count1 + parseInt(add[i].parentNode.querySelector(".count").innerHTML);
                price1 = price1 + parseFloat(add[i].parentNode.parentNode.querySelector(".subtotal").innerHTML);
                totalcount.innerHTML = count1;
                totalprice.innerHTML = price1;
            }
        }
