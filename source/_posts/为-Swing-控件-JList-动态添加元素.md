---
title: 为 Swing 控件 JList 动态添加元素
intro: 最近在做的一些项目中用到了 JavaSE 中 Swing 扩展库的 JList 控件，在使用中逐渐发现 JList 很好用，我们可以更改其样式变成单行的下拉列表形式，或者变成显示多行的选择列表形式。并且还可以同时实现多项选择或者单项选择，也可以显示纯文字选项或者图片，甚至显示各种自定义的样式。
comments: false
date: 2015-03-22 00:33:01
tags:
- Java
---

最近在做的一些项目中用到了 JavaSE 中 Swing 扩展库的 JList 控件，在使用中逐渐发现 JList 很好用，我们可以更改其样式变成单行的下拉列表形式，或者变成显示多行的选择列表形式。并且还可以同时实现多项选择或者单项选择，也可以显示纯文字选项或者图片，甚至显示各种自定义的样式。

但最近遇到的一个问题是如何使 JList 可以动态的添加或者删除其列表中的元素，经过查询 API 文档以及各种 Google 搜索，现整理解决方案如下。

我们最常见的构造 JList 对象的方式是使用静态数组来构建，即如下代码所示的构建方法：

```java
String[] jlistData = { "DATA", "DATA", "DATA", "DATA" };
JList myJList = new JList(jlistData);
```

还有另一种方法即可以通过 `Vector` 来构建 JList，这种构造方法可以在生成 JList 对象之后再单独进行赋值，即如下代码所示的构建方法：

```java
Vector superClasses = new Vector();
Class rootClass = javax.swing.JList.class;
for (Class cls = rootClass; cls != null; cls = cls.getSuperclass()) {
  superClasses.addElement(cls);
}
JList myList = new JList(superClasses);
superClasses.addElement("DATA1"); 
superClasses.addElement("DATA2"); 
```

如果使用以上这些方式来构建 JList 对象，数据一旦添加后便不能够再次修改，删除或者增加 JList 列表中的内容。因此我们需要使用以下方法来构建 JList 对象能够动态添加或删除其中的数据。

```java
DefaultListModel dlmIns = new DefaultListModel();
dlmIns.addElement("DATA1");
dlmIns.addElement("DATA2");

// ...

JList jlist = new JList();
jlist.setModel(dlmIns);

// 删除元素；
dlmIns.clear();
jlist.setModel(dlmIns); 

// 添加元素；
dlmIns.addElement("DATA3");
dlmIns.addElement("DATA4");
jlist.setModel(dlmIns); 
```

各个类的继承关系如下：ListMode 接口 -> AbstractListMode 类 -> DefaultListModel 类。其实在整个 JList 的继承树中，DefaultListModel 类是负责对 JList 元素进行管理的。因此所有对于 JList 元素的操作均是基于此类实现的。