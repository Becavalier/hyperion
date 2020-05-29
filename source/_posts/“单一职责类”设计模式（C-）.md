---
title: “单一职责类”设计模式（C++）
intro: 在软件组件的设计中，如果责任划分的不清晰，使用继承得到的结果往往是：随着需求的变化，子类急剧膨胀，同时充斥着重复代码的。而这时候的关键则是划清责任。
comments: true
date: 2020-05-29 15:37:37
tags:
- 设计模式
- C++
---

在软件组件的设计中，如果责任划分的不清晰，使用继承得到的结果往往是：随着需求的变化，子类急剧膨胀，同时充斥着重复代码的。而这时候的关键则是划清责任。

### 装饰模式（Decorator Method）

在某些情况下我们可能会“**过度地使用继承扩展对象的功能**”，由于继承为对象引入的静态特质，使得这种方式缺乏灵活性；并且随着子类的增多（扩展功能的增多），各种子类的组合（扩展功能的组合）会导致更多子类的膨胀。如何使“对象功能的扩展”能够根据需求来动态地实现？同时避免“扩展功能的增多”带来的子类膨胀问题？从而使得任何“功能扩展变化”所导致的影响降为最低？

![](1.jpg)


模式定义：动态（组合）地给一些对象增加一些额外的职责。就增加功能而言，装饰模式比生成子类（继承）更为灵活（消除重复代码+减少子类数量）。

```cpp
struct Component {
  virtual void foo() = 0;
  virtual ~Component() {}
};
// single responsibility;
struct ComponentA : public Component {
  void foo() {
    std::cout << "[Component A]" << std::endl;
  }
};
// decorator (用于基于原子功能进行扩展);
struct DecoratorComponent : public Component {  // 特征：对同一个类，即继承，又包含；
  DecoratorComponent(Component* component) : component(component) {}
 protected:
  Component* component;
};
struct DecoratorComponentA : public DecoratorComponent {
  DecoratorComponentA(Component* component) : DecoratorComponent(component) {}
  void foo() {
    component->foo();
    std::cout << "[DecoratorComponent A]" << std::endl;
  }
};
int main(int argc, char** argv) {
  auto componentA = new ComponentA();
  auto decoratorComponentA = new DecoratorComponentA(componentA);
  decoratorComponentA->foo();
  return 0;
}
```

总结：
* 通过采用组合而非继承的手法，装饰模式实现了在运行时动态扩展对象功能的能力，而且可以根据需要扩展多个功能。避免了使用继承带来的“灵活性差”和“多子类衍生问题”；
* Decorator 类在接口上表现为 is-a 的继承关系，即 Decorator 类继承了 Component 类所具有的接口。但在实现上又表现为 has-a 的组合关系，即 Decorator 类又使用了另外一个 Component 类；
* 装饰模式的目的并非解决“多子类衍生的多继承”问题，其要点在于解决“主体类在多个方向上的扩展功能” —— 是为“装饰”的含义；
