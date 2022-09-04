---
title: Zoomage.js 正式版 V1.0.0 核心原理介绍
intro: 经过了几周时间的思考和实践，Zoomage.js 的正式版本（V1.0.0）今天终于发布了。在这个正式版本中，我们加入了对图片的“平移”、“旋转”、“缩放”三种手势动作的完整支持。同时对缩放的"边界缓动"效果进行了调整，使整个缩放动作更加缓和，自然和流畅。基于两套不同的动作处理方案为浏览器兼容性带来了保障。本文将简单介绍这几个功能的实现要点。
comments: false
date: 2016-09-16 14:47:54
tags:
- JavaScript
- Library
---

经过了几周时间的思考和实践，Zoomage.js 的正式版本（V1.0.0）今天终于发布了。在这个正式版本中，我们加入了对图片的“**平移**”、“**旋转**”、“**缩放**”三种手势动作的完整支持。同时对缩放的"边界缓动"效果进行了调整，使整个缩放动作更加缓和，自然和流畅。基于两套不同的动作处理方案为浏览器兼容性带来了保障。本文将简单介绍这几个功能的实现要点。

> [Zoomage.js - Github Repository](https://github.com/Becavalier/Zoomage.js)

#### 一、支持动作：

1. 双击缩放：

![](https://github.com/Becavalier/Zoomage.js/raw/master/images/preview-dbclick.gif?raw=true)

2. 双指手势缩放：

![](https://github.com/Becavalier/Zoomage.js/raw/master/images/preview-zoom.gif?raw=true)

3. 单指手势拖拽：

![](https://github.com/Becavalier/Zoomage.js/raw/master/images/preview-drag.gif?raw=true)

4. 双指手势旋转：

![](https://github.com/Becavalier/Zoomage.js/raw/master/images/preview-rotate.gif?raw=true)

#### 二、核心原理：

对于 DOM 元素的“平移”，“缩放”和“旋转”这三种类型的基本动作，我们在 Zoomage.js 中使用了两套不同的方案来实现。第一种方案是基于 Canvas 对象的 `drawImage` 方法来实现的；第二种则是基于 CSS3 的 `transform` 属性来实现的。

这两种方法有各的优点和缺点。首先，使用 Canvas 对象可以让我们不用再去考虑当图像处在绘图边界时的情况（即图像不会脱离 Canvas 绘图区域）。当图像处于 “Offscreen Canvas” 区域时会被 Canvas 自动隐藏，这也正是我们需要达到的效果。但对于使用 "transform" 方案时，绘图边界的情况则需要另行处理，在正常情况图片超过 "transform" 容器时是不会被隐藏的。

另一方面，在使用 Canvas 方案时对图像的旋转操作会出现特殊情况，Canvas 本身并不能只对其上绘制的图像进行旋转，所以只能将整个 Canvas 画布进行旋转来模拟图像旋转的效果，但是这样带来的问题是当 Canvas 画布和画布容器由于旋转导致不再重合时，“Offscreen Canvas” 区域的图像便不能被清除，这样最终导致图像的移动轨迹全部留在了屏幕上。而使用 "transform" 便不用考虑类似 Canvas 的重绘问题，只需要考虑如何计算元素的移动轨迹即可，这也是相对于 Canvas 方案，"transform" 所独有的优点。因此，当用户选择开启图像旋转支持时，Zoomage.js 会自动使用 "transform" 方案来支持图像的旋转操作。

另一个需要解决的问题是如何对用户的触摸操作进行精准的手势识别。HTML5 自带了 "touchstart"，"touchmove"，"touchend" 三个触摸监听的方法，所有的手势识别过程均需要在这里完成。通过上述三个的监听事件中 Event 对象的 "touches" 和 "targetTouches" 数组我们可以获得当前触摸在屏幕上的触摸点数量，以及每一个触摸点的具体坐标。那么通过这些坐标我们便不难判断出用户的三种基本手势动作：一个点的位移变化控制拖拽，两个点的距离变化控制缩放，两个点组成的向量相对于 X/Y 轴的夹角变化来控制旋转。
