<template>
  <div class="ratings">
      <div class="ratings-content">
        <div class="overview">
          <div class="overview-left">
            <h1 class="score">3.5</h1>
            <div class="title">综合评分</div>
            <div class="rank">高于周边商家69.2%</div>
          </div>
          <div class="overview-right">
            <div class="score-wrapper">
              <span class="title">服务态度</span>
              <div class="star star-36">
                <!-- 星星组件 -->
                <span class="star-item on"></span>
                <span class="star-item on"></span>
                <span class="star-item on"></span>
                <span class="star-item on"></span>
                <span class="star-item off"></span>
              </div>
              <span class="score">4.1</span>
            </div>
            <div class="score-wrapper">
              <span class="title">商品评分</span>
              <div class="star star-36">
                <span class="star-item on"></span>
                <span class="star-item on"></span>
                <span class="star-item on"></span>
                <span class="star-item on"></span>
                <span class="star-item off"></span>
              </div>
              <span class="score">4.3</span>
            </div>
            <div class="delivery-wrapper">
              <span class="title">送达时间</span>
              <span class="delivery">28分钟</span>
            </div>
          </div>
        </div>
        <div class="split" style="pointer-events: auto;"></div>
        <div  class="ratingselect" style="pointer-events: auto;">
          <div  class="rating-type border-1px">
            <span  class="block positive active">
              全部<span  class="count">24</span>
            </span>
            <span  class="block positive">
              满意<span  class="count">18</span>
            </span>
            <span  class="block negative">
              不满意<span  class="count">6</span>
            </span>
          </div>
          <div  class="switch on">
            <span  class="iconfont icon-check_circle"></span>
            <span  class="text">只看有内容的评价</span>
          </div>
        </div>
        <div class="rating-wrapper">
          <ul>
            <li class="rating-item">
              <div class="avatar">
                <img width="28" height="28" src="http://static.galileo.xiaojukeji.com/static/tms/default_header.png">
              </div>
              <div class="content">
                <h1 class="name">3******c</h1>
                <div class="star-wrapper">
                  <div class="star star-24">
                    <span class="star-item on"></span>
                    <span class="star-item on"></span>
                    <span class="star-item on"></span>
                    <span class="star-item on"></span>
                    <span class="star-item on"></span>
                  </div>
                  <span class="delivery">30</span></div>
                <p class="text">不错,粥很好喝,我经常吃这一家,非常赞,以后也会常来吃,强烈推荐.</p>
                <div class="recommend"><span class="iconfont icon-thumb_up"></span> <span class="item">南瓜粥</span><span
                  class="item">皮蛋瘦肉粥</span><span class="item">扁豆焖面</span><span class="item">娃娃菜炖豆腐</span><span
                  class="item">牛肉馅饼</span></div>
                <div class="time">2016-07-23 21:52:44</div>
              </div>
            </li>
            <li class="rating-item">
              <div class="avatar"><img width="28" height="28"
                                       src="http://static.galileo.xiaojukeji.com/static/tms/default_header.png"></div>
              <div class="content"><h1 class="name">2******3</h1>
                <div class="star-wrapper">
                  <div class="star star-24"><span class="star-item on"></span><span class="star-item on"></span><span
                    class="star-item on"></span><span class="star-item on"></span><span class="star-item off"></span>
                  </div>
                  <span class="delivery"></span></div>
                <p class="text">服务态度不错</p>
                <div class="recommend"><span class="iconfont icon-thumb_up"></span> <span class="item">扁豆焖面</span></div>
                <div class="time">2016-07-23 18:54:24</div>
              </div>
            </li>
            <li class="rating-item">
              <div class="avatar"><img width="28" height="28"
                                       src="http://static.galileo.xiaojukeji.com/static/tms/default_header.png"></div>
              <div class="content"><h1 class="name">1******c</h1>
                <div class="star-wrapper">
                  <div class="star star-24"><span class="star-item on"></span><span class="star-item on"></span><span
                    class="star-item on"></span><span class="star-item on"></span><span class="star-item on"></span>
                  </div>
                  <span class="delivery">20</span></div>
                <p class="text">良心店铺</p>
                <div class="recommend"><span class="iconfont icon-thumb_up"></span></div>
                <div class="time">2016-07-23 16:17:44</div>
              </div>
            </li>
            <li class="rating-item">
              <div class="avatar"><img width="28" height="28"
                                       src="http://static.galileo.xiaojukeji.com/static/tms/default_header.png"></div>
              <div class="content"><h1 class="name">9******0</h1>
                <div class="star-wrapper">
                  <div class="star star-24"><span class="star-item on"></span><span class="star-item off"></span><span
                    class="star-item off"></span><span class="star-item off"></span><span class="star-item off"></span>
                  </div>
                  <span class="delivery">70</span></div>
                <p class="text">送货速度蜗牛一样</p>
                <div class="recommend"><span class="iconfont icon-thumb_down"></span></div>
                <div class="time">2016-07-23 10:46:04</div>
              </div>
            </li>
            <li class="rating-item">
              <div class="avatar"><img width="28" height="28"
                                       src="http://static.galileo.xiaojukeji.com/static/tms/default_header.png"></div>
              <div class="content"><h1 class="name">d******c</h1>
                <div class="star-wrapper">
                  <div class="star star-24"><span class="star-item on"></span><span class="star-item on"></span><span
                    class="star-item on"></span><span class="star-item on"></span><span class="star-item on"></span>
                  </div>
                  <span class="delivery">30</span></div>
                <p class="text">很喜欢的粥店</p>
                <div class="recommend"><span class="iconfont icon-thumb_up"></span></div>
                <div class="time">2016-07-23 07:59:24</div>
              </div>
            </li>
            <li class="rating-item">
              <div class="avatar"><img width="28" height="28"
                                       src="http://static.galileo.xiaojukeji.com/static/tms/default_header.png"></div>
              <div class="content"><h1 class="name">2******3</h1>
                <div class="star-wrapper">
                  <div class="star star-24"><span class="star-item on"></span><span class="star-item on"></span><span
                    class="star-item on"></span><span class="star-item on"></span><span class="star-item off"></span>
                  </div>
                  <span class="delivery"></span></div>
                <p class="text">量给的还可以</p>
                <div class="recommend"><span class="iconfont icon-thumb_up"></span></div>
                <div class="time">2016-07-23 05:01:04</div>
              </div>
            </li>
            <li class="rating-item">
              <div class="avatar"><img width="28" height="28"
                                       src="http://static.galileo.xiaojukeji.com/static/tms/default_header.png"></div>
              <div class="content"><h1 class="name">a******a</h1>
                <div class="star-wrapper">
                  <div class="star star-24"><span class="star-item on"></span><span class="star-item on"></span><span
                    class="star-item on"></span><span class="star-item on"></span><span class="star-item off"></span>
                  </div>
                  <span class="delivery"></span></div>
                <p class="text">孩子喜欢吃这家</p>
                <div class="recommend"><span class="iconfont icon-thumb_up"></span> <span class="item">南瓜粥</span></div>
                <div class="time">2016-07-22 23:39:24</div>
              </div>
            </li>
            <li class="rating-item">
              <div class="avatar"><img width="28" height="28"
                                       src="http://static.galileo.xiaojukeji.com/static/tms/default_header.png"></div>
              <div class="content"><h1 class="name">3******3</h1>
                <div class="star-wrapper">
                  <div class="star star-24"><span class="star-item on"></span><span class="star-item on"></span><span
                    class="star-item on"></span><span class="star-item on"></span><span class="star-item off"></span>
                  </div>
                  <span class="delivery"></span></div>
                <p class="text">粥挺好吃的</p>
                <div class="recommend"><span class="iconfont icon-thumb_up"></span></div>
                <div class="time">2016-07-22 20:41:04</div>
              </div>
            </li>
            <li class="rating-item">
              <div class="avatar"><img width="28" height="28"
                                       src="http://static.galileo.xiaojukeji.com/static/tms/default_header.png"></div>
              <div class="content"><h1 class="name">f******c</h1>
                <div class="star-wrapper">
                  <div class="star star-24"><span class="star-item on"></span><span class="star-item on"></span><span
                    class="star-item on"></span><span class="star-item on"></span><span class="star-item on"></span>
                  </div>
                  <span class="delivery">15</span></div>
                <p class="text">送货速度很快</p>
                <div class="recommend"><span class="iconfont icon-thumb_up"></span></div>
                <div class="time">2016-07-22 15:19:24</div>
              </div>
            </li>
            <li class="rating-item">
              <div class="avatar"><img width="28" height="28"
                                       src="http://static.galileo.xiaojukeji.com/static/tms/default_header.png"></div>
              <div class="content"><h1 class="name">u******b</h1>
                <div class="star-wrapper">
                  <div class="star star-24"><span class="star-item on"></span><span class="star-item on"></span><span
                    class="star-item on"></span><span class="star-item on"></span><span class="star-item off"></span>
                  </div>
                  <span class="delivery"></span></div>
                <p class="text">下雨天给快递小哥点个赞</p>
                <div class="recommend"><span class="iconfont icon-thumb_up"></span></div>
                <div class="time">2016-07-22 09:46:04</div>
              </div>
            </li>
            <li class="rating-item">
              <div class="avatar"><img width="28" height="28"
                                       src="http://static.galileo.xiaojukeji.com/static/tms/default_header.png"></div>
              <div class="content"><h1 class="name">s******c</h1>
                <div class="star-wrapper">
                  <div class="star star-24"><span class="star-item on"></span><span class="star-item on"></span><span
                    class="star-item on"></span><span class="star-item on"></span><span class="star-item off"></span>
                  </div>
                  <span class="delivery"></span></div>
                <p class="text">好</p>
                <div class="recommend"><span class="iconfont icon-thumb_up"></span></div>
                <div class="time">2016-07-22 06:59:24</div>
              </div>
            </li>
            <li class="rating-item">
              <div class="avatar"><img width="28" height="28"
                                       src="http://static.galileo.xiaojukeji.com/static/tms/default_header.png"></div>
              <div class="content"><h1 class="name">z******3</h1>
                <div class="star-wrapper">
                  <div class="star star-24"><span class="star-item on"></span><span class="star-item on"></span><span
                    class="star-item on"></span><span class="star-item on"></span><span class="star-item on"></span>
                  </div>
                  <span class="delivery"></span></div>
                <p class="text">吃了还想再吃</p>
                <div class="recommend"><span class="iconfont icon-thumb_up"></span></div>
                <div class="time">2016-07-22 04:01:04</div>
              </div>
            </li>
            <li class="rating-item">
              <div class="avatar"><img width="28" height="28"
                                       src="http://static.galileo.xiaojukeji.com/static/tms/default_header.png"></div>
              <div class="content"><h1 class="name">n******b</h1>
                <div class="star-wrapper">
                  <div class="star star-24"><span class="star-item on"></span><span class="star-item on"></span><span
                    class="star-item on"></span><span class="star-item off"></span><span class="star-item off"></span>
                  </div>
                  <span class="delivery"></span></div>
                <p class="text">发票开的不对</p>
                <div class="recommend"><span class="iconfont icon-thumb_down"></span></div>
                <div class="time">2016-07-22 01:26:04</div>
              </div>
            </li>
            <li class="rating-item">
              <div class="avatar"><img width="28" height="28"
                                       src="http://static.galileo.xiaojukeji.com/static/tms/default_header.png"></div>
              <div class="content"><h1 class="name">m******c</h1>
                <div class="star-wrapper">
                  <div class="star star-24"><span class="star-item on"></span><span class="star-item on"></span><span
                    class="star-item on"></span><span class="star-item on"></span><span class="star-item on"></span>
                  </div>
                  <span class="delivery">30</span></div>
                <p class="text">好吃</p>
                <div class="recommend"><span class="iconfont icon-thumb_up"></span></div>
                <div class="time">2016-07-21 22:39:24</div>
              </div>
            </li>
            <li class="rating-item">
              <div class="avatar"><img width="28" height="28"
                                       src="http://static.galileo.xiaojukeji.com/static/tms/default_header.png"></div>
              <div class="content"><h1 class="name">l******3</h1>
                <div class="star-wrapper">
                  <div class="star star-24"><span class="star-item on"></span><span class="star-item on"></span><span
                    class="star-item on"></span><span class="star-item on"></span><span class="star-item on"></span>
                  </div>
                  <span class="delivery">40</span></div>
                <p class="text">还不错吧</p>
                <div class="recommend"><span class="iconfont icon-thumb_up"></span></div>
                <div class="time">2016-07-21 19:41:04</div>
              </div>
            </li>
            <li class="rating-item">
              <div class="avatar"><img width="28" height="28"
                                       src="http://static.galileo.xiaojukeji.com/static/tms/default_header.png"></div>
              <div class="content"><h1 class="name">3******p</h1>
                <div class="star-wrapper">
                  <div class="star star-24"><span class="star-item on"></span><span class="star-item on"></span><span
                    class="star-item on"></span><span class="star-item on"></span><span class="star-item off"></span>
                  </div>
                  <span class="delivery"></span></div>
                <p class="text">很喜欢的粥</p>
                <div class="recommend"><span class="iconfont icon-thumb_up"></span></div>
                <div class="time">2016-07-21 14:19:24</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
  export default{}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
