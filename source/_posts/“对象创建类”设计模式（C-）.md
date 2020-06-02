---
title: “对象创建类”设计模式（C++）
intro: 通过“对象创建”模式绕开 new，来避免对象创建（new）过程中所导致的紧耦合（依赖具体类），从而支持对象创建的稳定。它是接口抽象之后的第一步工作。
comments: true
date: 2020-06-01 17:17:37
tags:
- 设计模式
- C++
---

通过“对象创建”模式绕开 new，来避免对象创建（new）过程中所导致的紧耦合（依赖具体类），从而支持对象创建的稳定。**它是接口抽象之后的第一步工作**。

### 工厂模式（Factory Method）

在软件系统中，经常面临着创建对象的工作；由于需求的变化，需要创建的对象的具体类型经常变化。如何应对这种变化？如何绕过常规的对象创建方法，提供一种“封装机制”来避免客户程序和这种“具体对象创建工作”的紧耦合？

![](1.png)

模式定义：定义一个用于创建对象的接口，让子类决定实例化哪一个类。工厂模式使得一个类的实例化延迟（目的：解耦，手段：虚函数）到子类。

```cpp
struct Strategy {
  ~Strategy() {}
  virtual void strategy() = 0;
};
struct StrategyFactory {
  ~StrategyFactory() {}
  virtual std::shared_ptr<Strategy> createStrategy() = 0;
};
struct StrategyA : public Strategy {
  void strategy() {
    std::cout << "[StrategyA]" << std::endl;
  };
};
struct StrategyFactoryA : public StrategyFactory {
  std::shared_ptr<Strategy> createStrategy() {
    return std::make_shared<StrategyA>();
  };
};
class Application {  // 策略模式 + 工厂模式；
  std::shared_ptr<StrategyFactory> strategyFactory;
  std::shared_ptr<Strategy> strategy;
 public:
  Application(std::shared_ptr<StrategyFactory> strategyFactory) : 
    strategyFactory(strategyFactory), 
    strategy(strategyFactory->createStrategy())  {}
  void run() {
    strategy->strategy();
    std::cout << "[Application]" << std::endl;
  }
};
int main(int argc, char** argv) {
  auto strategyFactoryA = std::make_shared<StrategyFactoryA>();
  Application app(strategyFactoryA);
  app.run();
  return 0;
}
```

总结：
* 工厂模式用于隔离类对象的使用者和具体类型之间的耦合关系。面对一个经常变化的具体类型，紧耦合关系（new）会导致软件的脆弱；
* 工厂模式通过 OOP，将所要创建的具体对象工作延迟到子类，从而实现一种**扩展（而非更改）**的策略，较好地解决了这种紧耦合关系；
* 工厂模式解决“单个对象”的需求变化。缺点在于要求创建方法/参数相同；

总的来看，思路还是**将静态的部分（具体的工厂、策略以及需要用到哪些）留给用户代码去决定**。其余都用动态代码组成。 

### 抽象工厂模式（Abstract Factory Method）

在软件系统中，经常面临着“**一系列相互依赖的对象**”的创建工作；同时，由于需求变化，往往存在更多系列对象的创建工作。如何应对这种变化？如何绕过常规的对象创建方法，提供一种“封装机制”来避免客户端程序和这种“多系列具体对象创建工作”的紧耦合？

![](2.png)

模式定义：提供一个接口，**让该接口负责创建一系列“相关或者相互依赖的对象”**，无需指定它们具体的类。

```cpp
struct StrategyInit {  // 稳定；
  ~StrategyInit() {}
  virtual void strategyInit() = 0;
};
struct StrategyFinish {  // 稳定；
  ~StrategyFinish() {}
  virtual void strategyFinish() = 0;
};
struct StrategyFactory {  // 稳定；一簇相互依赖的对象（StrategyInit，StrategyFinish）；
  ~StrategyFactory() {}
  virtual std::shared_ptr<StrategyInit> createStrategyInit() = 0;
  virtual std::shared_ptr<StrategyFinish> createStrategyFinish() = 0;
};
struct StrategyInitA : public StrategyInit {
  void strategyInit() {
    std::cout << "[StrategyInit A]" << std::endl;
  };
};
struct StrategyFinishA : public StrategyFinish {
  void strategyFinish() {
    std::cout << "[StrategyFinish A]" << std::endl;
  };
};
struct StrategyFactoryA : public StrategyFactory {
  std::shared_ptr<StrategyInit> createStrategyInit() {
    return std::make_shared<StrategyInitA>();
  };
  std::shared_ptr<StrategyFinish> createStrategyFinish() {
    return std::make_shared<StrategyFinishA>();
  };
};
class Application {  // 策略模式 + 抽象工厂模式；
  std::shared_ptr<StrategyFactory> strategyFactory;
 public:
  Application(std::shared_ptr<StrategyFactory> strategyFactory) : 
    strategyFactory(strategyFactory) {}
  void run() {
    strategyFactory->createStrategyInit()->strategyInit();
    strategyFactory->createStrategyFinish()->strategyFinish();
    std::cout << "[Application]" << std::endl;
  }
};
int main(int argc, char** argv) {
  auto strategyFactoryA = std::make_shared<StrategyFactoryA>();
  Application app(strategyFactoryA);
  app.run();
  return 0;
}
```

总结：
* 如果没有应对“**多系列对象构建**”的需求变化，则没有必要使用该模式，这时候使用简单的工厂模式即可以；
* “系列对象”指的是在某一特定系列下的对象之间有相互依赖、或作用的关系。不同系列的对象之间不能相互依赖；
* 抽象工厂模式主要在于应对“新系列”的需求变动。**其缺点在于难以应对“新对象”的需求变动**。
