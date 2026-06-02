-- 11 CSS quiz cards, one per topic.

INSERT INTO questions (title, content, category, difficulty, tags, answer_hint) VALUES

-- ─────────────────────────────────────────────────────────────────────────────
-- 1. Flex
-- ─────────────────────────────────────────────────────────────────────────────
(
  'CSS · Flex Layout · 主轴 / 交叉轴 / 容器 vs 项目',
$content$
## 核心心智

**主轴** + **交叉轴**，所有属性都围绕这两个轴展开。

```
flex-direction: row     → 主轴水平、交叉轴垂直
flex-direction: column  → 主轴垂直、交叉轴水平
```

---

## 容器属性（控制子元素排列）

### 主轴方向

- **`flex-direction`** —— `row` / `row-reverse` / `column` / `column-reverse`
- **`flex-wrap`** —— 主轴放不下时是否换行（默认 `nowrap`）

### 主轴对齐

- **`justify-content`** —— 主轴对齐方式：`flex-start | flex-end | center | space-between | space-around | space-evenly`

### 交叉轴对齐

- **`align-items`** —— 交叉轴上**每行**的对齐：`stretch | flex-start | flex-end | center | baseline`
- **`align-content`** —— 多行时**整体**的对齐（**单行无效**）

### gap（现代写法）

```css
.flex { display: flex; gap: 16px; }    /* 不再需要 margin: 0 -8px hack */
```

---

## 子元素属性（控制自身表现）

- **`flex-grow`** —— 剩余空间怎么分（放大）；默认 0
- **`flex-shrink`** —— 空间不足时怎么缩（缩小）；默认 1
- **`flex-basis`** —— 主轴上的初始大小；默认 `auto`（看内容）
- **`flex`** —— 以上三者的简写
- **`align-self`** —— 覆盖父元素的 `align-items`
- **`order`** —— 排列顺序（默认 0）

### flex 简写常见值

```css
flex: 1;          /* = 1 1 0%  —— 平分剩余空间 */
flex: auto;       /* = 1 1 auto —— 按内容尺寸分，再分剩余空间 */
flex: none;       /* = 0 0 auto —— 完全固定，不增不减 */
flex: 0 1 200px;  /* basis 200px，不放大但可缩小 */
```

**`flex: 1` vs `flex: auto` 区别**：前者从 0 开始平分，后者从内容尺寸开始平分。"等分宽度"用 `flex: 1`。

---

## 记忆技巧

- **`justify` 永远管主轴**，**`align` 永远管交叉轴**
- **`items` 管单行**，**`content` 管多行**
- **`grow / shrink / basis`** 对应**多 / 少 / 初始**

---

## 经典布局

### 水平垂直居中

```css
.center { display: flex; justify-content: center; align-items: center; }
```

### 左右两端 + 中间填充

```css
.nav { display: flex; justify-content: space-between; align-items: center; }
.spacer { flex: 1; }   /* 用空 spacer 占满中间 */
```

### Navbar 例子

```css
<nav class="navbar">
  <div class="logo">Logo</div>
  <ul class="menu">
    <li>Home</li><li>Product</li><li>About</li>
  </ul>
  <button class="cta">Contact us</button>
</nav>

.navbar {
  display: flex;
  gap: 16px;
  justify-content: space-between;
  align-items: center;
}
.menu { display: flex; gap: 24px; flex: 1; justify-content: center; }
```

### 等分网格（旧时代用 flex）

```css
.row { display: flex; gap: 12px; }
.col { flex: 1; }   /* 每个 col 平分宽度 */
```

> 真正的二维网格用 Grid，不要硬用 Flex 拼。
$content$,
  'quiz', 'medium',
  ARRAY['frontend','css','layout','flex'],
  NULL
),

-- ─────────────────────────────────────────────────────────────────────────────
-- 2. Grid
-- ─────────────────────────────────────────────────────────────────────────────
(
  'CSS · Grid Layout · 显式行列 / fr / repeat / template-areas',
$content$
## 核心心智

**显式定义行列**，然后控制对齐和放置。

---

## 第一步：定义网格结构（容器）

```css
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;   /* 定义列 */
  grid-template-rows: 100px 200px;      /* 定义行 */
  gap: 10px;                            /* 间距 */
}
```

**`fr`** = 剩余空间按比例分配，类比 `flex-grow`。

### `repeat()` 简写

```css
grid-template-columns: repeat(12, 1fr);                       /* 12 等分 */
grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));  /* 响应式 */
```

### `minmax(min, max)`

```css
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
/* 每列最小 200px，最大 1fr —— 屏幕宽时列数多，窄时少 */
```

---

## 第二步：对齐方式（和 flex 完全对应 + 多两个）

| | 主轴（行方向） | 交叉轴（列方向） |
|---|---|---|
| 整体 | `justify-content` | `align-content` |
| 单元格内 | **`justify-items`** | **`align-items`** |
| 子元素自身 | **`justify-self`** | `align-self` |

flex 只有 `justify` / `align`，**grid 多了 `justify-items` / `justify-self`** —— 因为 grid 每个单元格都有可能放不满，需要再分配。

### `place-*` 简写

```css
place-content: center;            /* = align-content + justify-content */
place-items: center;              /* = align-items + justify-items */
place-self: end start;            /* = align-self + justify-self */
```

---

## 第三步：子元素放置

### 用线号

```css
.item { grid-column: 1 / 3; grid-row: 1 / 2; }  /* 从第1线到第3线 = 跨2列 */
```

### 用 span

```css
.item { grid-column: span 2; }   /* 跨 2 列 */
```

### 用命名区域

```css
.layout {
  grid-template-areas:
    "header header header"
    "nav    main    aside"
    "footer footer  footer";
  grid-template-columns: 160px 1fr 120px;
  grid-template-rows: 48px 1fr 40px;
}
.header { grid-area: header; }
.nav    { grid-area: nav; }
.main   { grid-area: main; }
```

---

## 实战例子

### Holy Grail Layout

```css
.layout {
  display: grid;
  grid-template-columns: 160px 1fr 120px;
  grid-template-rows: 48px 1fr 40px;
  grid-template-areas:
    "header header header"
    "nav    main   aside"
    "footer footer footer";
}
```

### 12 栅格

```css
.grid-12 {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 8px;
}
.col-6 { grid-column: span 6; }
.col-4 { grid-column: span 4; }
/* grid-auto-flow: dense;  源码顺序放不下时往前回填小元素 */
```

### 居中

```css
.center { display: grid; place-items: center; height: 160px; }
```

### 响应式自适应

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
}
```

- **`auto-fit`** —— 自动决定列数，空列**折叠**
- **`auto-fill`** —— 自动决定列数，空列**保留**

→ 容器固定宽 + 数据少时差异大：`auto-fit` 让内容撑满，`auto-fill` 保留空列位置。

---

## Subgrid（Chrome 117+ / Firefox 71+）

子元素也能继承父网格的轨道，避免嵌套对齐问题：

```css
.parent { display: grid; grid-template-columns: repeat(4, 1fr); }
.child {
  display: grid;
  grid-template-columns: subgrid;   /* 继承父级 4 列 */
  grid-column: span 4;
}
```

---

## 记忆技巧

- **先定义结构（columns / rows）**，再控制对齐，最后放置子元素
- 对齐规律和 flex 一样，多记 `items` / `self` 的区别
- `1fr` 就是"**剩余空间的一份**"
$content$,
  'quiz', 'medium',
  ARRAY['frontend','css','layout','grid'],
  NULL
),

-- ─────────────────────────────────────────────────────────────────────────────
-- 3. Box Model
-- ─────────────────────────────────────────────────────────────────────────────
(
  'CSS · Box Model · box-sizing / 外边距折叠',
$content$
## box-sizing 属性

| 值 | 含义 |
|---|---|
| **`content-box`**（默认） | `width` / `height` **仅为内容区** |
| **`border-box`** | `width` / `height` **包含 border + padding** |

### 现代项目的全局重置

```css
*, *::before, *::after { box-sizing: border-box; }
```

→ 让 width/height 等于"我看到的盒子大小"，符合直觉。**几乎所有 CSS reset / Tailwind 等都这样做**。

---

## 盒子的 4 层

从内到外：

```
┌─────────────────────────────────┐
│  margin（外边距，不属于盒子）    │
│  ┌───────────────────────────┐  │
│  │  border（边框）            │  │
│  │  ┌─────────────────────┐  │  │
│  │  │  padding（内边距）  │  │  │
│  │  │  ┌───────────────┐  │  │  │
│  │  │  │  content      │  │  │  │
│  │  │  └───────────────┘  │  │  │
│  │  └─────────────────────┘  │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

---

## 外边距折叠（Margin Collapse）

**相邻块级元素的垂直外边距**会合并成一个：

### 折叠规则

1. **相邻兄弟**：取**较大**那个
   ```html
   <p style="margin-bottom: 30px">A</p>
   <p style="margin-top: 20px">B</p>
   <!-- 间距 = max(30, 20) = 30px，不是 50 -->
   ```

2. **父子元素**：父没有 `border` / `padding` / `BFC` 阻隔时，子的 margin-top 会"穿透"到父
   ```html
   <div style="background: red">
     <p style="margin-top: 20px">Hello</p>
   </div>
   <!-- 父元素整体下移 20px，背景没贴到 p 上 -->
   ```

3. **空块**：自身上下 margin 合并

4. **都是负值**：取**绝对值大**的（即更负的胜出）

5. **一正一负**：直接**相加**

### 何时不折叠

- 水平 margin **不折叠**（只在垂直方向有这事）
- 行内元素、浮动、绝对定位的盒子**不参与**
- 父元素是 **BFC**（`display: flow-root` / `overflow: hidden` 等）
- 父元素有 **border** 或 **padding** 阻隔

### 阻止父子穿透的常见手法

```css
.parent { display: flow-root; }     /* 现代标准做法 */
.parent { overflow: hidden; }       /* 老套路 */
.parent { padding-top: 1px; }       /* 物理阻隔 */
```

---

## 一句话总结

> 现代项目无脑 `box-sizing: border-box`；遇到诡异间距 → 第一时间想是不是垂直 margin 折叠。
$content$,
  'quiz', 'easy',
  ARRAY['frontend','css','box-model','layout'],
  NULL
),

-- ─────────────────────────────────────────────────────────────────────────────
-- 4. BFC
-- ─────────────────────────────────────────────────────────────────────────────
(
  'CSS · BFC · 块级格式上下文 · 清浮动 / 阻折叠',
$content$
## BFC（Block Formatting Context）

**块级格式上下文** —— 一个独立的渲染区域，**内部布局不影响外部，外部也不影响内部**。

> "划一块独立的小世界" —— BFC 内的盒子按 normal flow 排列，但和外面的世界隔绝。

---

## 触发方式

| 触发条件 | 推荐度 |
|---|---|
| `display: flow-root` | **⭐ 推荐 —— 专门用于触发 BFC，没有副作用** |
| `display: flex` / `grid` / `inline-block` / `table-cell` | 顺便触发 |
| `overflow` 非 `visible`（`auto` / `hidden` / `scroll`） | 老牌 hack，但有 overflow 副作用 |
| `float` 非 `none` | 顺便触发 |
| `position: absolute` / `fixed` | 脱流的副作用大 |
| `column-count` / `column-width` | 多列布局 |
| `contain: layout` / `paint` | 现代版隔离 |

→ **新代码用 `display: flow-root`**，老代码看到 `overflow: hidden` 大概率是用来清浮动的。

---

## 三大作用

### 1. 清除浮动 / 解决高度塌陷

子元素全 float 时，父元素高度变 0：

```html
<div class="parent">
  <div class="child">Floating</div>
</div>
```
```css
.parent { border: 2px solid red; display: flow-root; }
.child { float: left; height: 100px; }
```

→ `flow-root` 让 parent 包裹住浮动子元素，**不塌陷**。

### 2. 阻止垂直外边距折叠

父子之间默认会 margin collapse。父加 BFC 阻止：

```css
.parent { display: flow-root; }  /* 子的 margin-top 不再"穿透" */
```

### 3. 避免文字环绕浮动元素

```html
<img style="float: left" />
<p>这段文字会环绕图片...</p>
```

让 `<p>` 形成 BFC 后**不再环绕**：

```css
p { display: flow-root; }
```

→ 经典的"侧栏 + 主内容"两栏布局可以这样实现（虽然现代用 flex / grid 更优）。

---

## BFC vs IFC vs FFC vs GFC

CSS 里有多种 formatting context：

| Context | 触发 | 用途 |
|---|---|---|
| **BFC**（Block） | `display: block` 等 | 块级元素布局 |
| **IFC**（Inline） | 容器内只有 inline 子元素 | 行内排版（详见 line-height 卡） |
| **FFC**（Flex） | `display: flex` | flex 布局 |
| **GFC**（Grid） | `display: grid` | grid 布局 |

→ flex / grid 容器本身也是一种 formatting context，自然就有 BFC 的"隔离"特性。

---

## 一句话总结

> BFC = "**这块区域是独立的小宇宙**"。
> 现代代码触发用 `display: flow-root`，看到 `overflow: hidden` 多半是来清浮动。
$content$,
  'quiz', 'medium',
  ARRAY['frontend','css','layout','bfc'],
  NULL
),

-- ─────────────────────────────────────────────────────────────────────────────
-- 5. Position
-- ─────────────────────────────────────────────────────────────────────────────
(
  'CSS · Position · static / relative / absolute / fixed / sticky',
$content$
## 5 种 position 对比

| 值 | 定位基准 | 脱离文档流 | 保留占位 | 备注 |
|---|---|---|---|---|
| **`static`**（默认） | — | ❌ | ❌ | 不参与层叠（z-index 无效）；top 等无效 |
| **`relative`** | 自身原始位置 | ❌ | ✅ | top 等生效；**创建定位上下文**（子 absolute 以它为基准） |
| **`absolute`** | 最近**非 static** 祖先 | ✅ | ❌ | 没有非 static 祖先则相对 `<html>`；随该祖先滚动 |
| **`fixed`** | **视口** | ✅ | ❌ | 不随页面滚动；**但祖先有 `transform` / `filter` / `perspective` / `will-change: transform` 时会以该祖先为基准**（经典坑）|
| **`sticky`** | 滚动容器 | 条件性 | ✅ | 需配 `top/bottom`；**滚到阈值前像 relative，后像 fixed**；粘性范围在父容器内 |

---

## 绝对定位居中

```css
div {
  position: absolute;
  inset: 0;                /* = top:0; right:0; bottom:0; left:0 */
  margin: auto;
  width: 100px; height: 100px;
}
```

或者更通用：

```css
div {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
}
```

---

## z-index 的几个坑

### 1. 子元素不能绘制在父元素背后

```html
<div class="parent">
  <div class="child" style="z-index: -1">Behind</div>
</div>
```

→ Child 仍然在 parent 之前绘制，z-index 在**不同堆叠上下文里独立**。

### 2. 堆叠上下文是"相对"的

不同的堆叠上下文之间不直接比较 z-index。比如：

```html
<div style="position: relative; z-index: 1">  <!-- 堆叠上下文 A -->
  <div style="z-index: 9999">A 的子，高 z</div>
</div>
<div style="position: relative; z-index: 2">  <!-- 堆叠上下文 B，比 A 高 -->
  <div style="z-index: 1">B 的子，低 z</div>
</div>
```

**B 的子永远在 A 的子上方**，因为 B 整个堆叠上下文比 A 高。`9999` 在 A 内部无意义。

### 3. 创建新堆叠上下文的条件

- `position: relative/absolute/fixed/sticky` + `z-index !== auto`
- `opacity < 1`
- `transform` / `filter` / `perspective` / `clip-path` 非默认值
- `isolation: isolate`（现代专用）
- `will-change` 列了上面任意属性
- `mix-blend-mode` / `mask` 非默认

→ 想强制隔离 z-index 影响但不动其他样式：**`isolation: isolate`** 是最干净的。

---

## sticky 实战

```css
h2 { position: sticky; top: 0; background: white; }
```

- 滚动时每个 `h2` 粘在视口顶部
- **粘性范围限制在其父容器内** —— 父容器离开视口后一起消失（这就是"分组标题栏"效果）
- **父容器不能 `overflow: hidden`** —— 否则 sticky 不生效
- **必须显式设置 `top` / `bottom` / `left` / `right` 之一** —— 否则 sticky 不工作

### sticky 不生效的常见原因

1. 父级有 `overflow: hidden / auto / scroll`（除非那就是你想要的滚动容器）
2. 自身没设 `top` / `bottom`
3. 父容器自身高度 = sticky 元素高度，没有"粘性空间"

---

## 一句话总结

> position 选型：
> - 流内偏移 + 占位：**relative**
> - 脱流贴祖先：**absolute**
> - 脱流贴视口：**fixed**（小心 transform 祖先陷阱）
> - 滚动到顶部停住：**sticky**
$content$,
  'quiz', 'medium',
  ARRAY['frontend','css','layout','position'],
  NULL
),

-- ─────────────────────────────────────────────────────────────────────────────
-- 6. Selector & Specificity
-- ─────────────────────────────────────────────────────────────────────────────
(
  'CSS · 选择器 / 特指度 / 级联优先级',
$content$
## 特指度（Specificity）

```
行内 (1,0,0,0)  >  ID (0,1,0,0)  >  类/伪类/属性 (0,0,1,0)  >  元素/伪元素 (0,0,0,1)
```

### 计算示例

| 选择器 | Specificity |
|---|---|
| `*` | `0,0,0,0` |
| `div` | `0,0,0,1` |
| `.foo` | `0,0,1,0` |
| `.foo.bar` | `0,0,2,0` |
| `#id` | `0,1,0,0` |
| `div.foo` | `0,0,1,1` |
| `style="..."` | `1,0,0,0` |
| `!important` | 凌驾所有 |

⚠️ **`!important` 不算特指度** —— 它是另一套规则（凌驾），但 `!important` 之间还是比 specificity。

---

## 层叠优先级（Cascade）

```
!important > 来源 > 特指度 > 声明顺序（后面胜出）
```

### "来源" 的顺序

1. 用户代理（浏览器默认）
2. 用户（浏览器扩展 / accessibility）
3. **作者**（你写的 CSS）
4. 作者 `!important`
5. 用户 `!important`
6. **用户代理 `!important`**（最高）

实际开发只需要记住：**同来源下，`!important` > 普通；普通规则按 specificity → 声明顺序**。

---

## LVFHA 顺序（LoVe Fears HAte）

链接相关伪类必须按这个顺序声明，否则后面的可能被前面的覆盖：

```
:link → :visited → :focus → :hover → :active
  L       V         F        H        A
```

---

## 现代选择器（特别提及）

### `:where()` —— 0 specificity

```css
:where(.btn, .button) { color: blue; }   /* 整体 specificity = 0,0,0,0 */
```

→ 写工具类 / 全局重置时**不污染** specificity，让用户更容易覆盖。

### `:is()` —— 取参数里**最高**的 specificity

```css
:is(.btn, #login) { color: red; }   /* specificity = id 的 (0,1,0,0) */
```

→ 简化重复选择器但**保留** specificity 行为。

### `:has()` —— 父选择器（终于来了！）

```css
li:has(.active) { background: yellow; }    /* 包含 .active 的 li 高亮 */
form:has(input:invalid) button { opacity: 0.5; }   /* 表单有错误就禁用按钮 */
```

→ **2023 年所有现代浏览器支持**，CSS 的关键升级。

### 选择器嵌套（Nesting，2023+）

```css
.card {
  padding: 16px;
  & .title { font-size: 18px; }   /* 等价 .card .title */
  &:hover { background: #f0f0f0; }
}
```

→ 原生支持嵌套，**不再需要 SCSS / Less** 这个特性。

---

## Cascade Layers (`@layer`)

```css
@layer reset, base, components, utilities;

@layer reset { * { margin: 0; padding: 0; } }
@layer utilities { .text-center { text-align: center; } }
```

层之间**按声明顺序**优先级递增，**完全跨越 specificity** —— `utilities` 层里的任意规则都会覆盖 `reset` 层的，无论 specificity 如何。

→ **设计系统 / 组件库**的现代组织方式。Tailwind v4、shadcn 都用。

---

## 一句话总结

> 写选择器先看 **specificity 数 4 位**，再看声明顺序。
> 现代加分：用 `:where()` 写低权重默认值；用 `@layer` 组织覆盖关系；少用 `!important`。
$content$,
  'quiz', 'medium',
  ARRAY['frontend','css','selector','specificity'],
  NULL
),

-- ─────────────────────────────────────────────────────────────────────────────
-- 7. Transition & Animation
-- ─────────────────────────────────────────────────────────────────────────────
(
  'CSS · Transition / Animation · 性能 / GPU 合成层',
$content$
## 过渡（transition）核心属性

```css
div {
  transition: opacity 300ms ease 0s;
  /*          property duration timing-function delay */
}
```

- 多个属性：`transition: opacity 200ms, transform 300ms;`
- **正向 / 反向过渡可分别设置**（写在各自选择符下）
- 监听完成：**`transitionend`** 事件（React: `onTransitionEnd`）

### timing-function

- `linear` —— 匀速
- `ease`（默认）/ `ease-in` / `ease-out` / `ease-in-out`
- **`cubic-bezier(x1, y1, x2, y2)`** —— 自定义贝塞尔曲线
- **`steps(n, end|start)`** —— 阶跃（像素图标雪碧动画用）

---

## 动画（animation）核心属性

```css
@keyframes fadeout {
  from { opacity: 1; }
  to   { opacity: 0; }
}

div {
  animation: fadeout 500ms linear 0s 1 forwards;
  /*         name    duration timing delay count fill-mode */
}
```

### keyframes 百分比

```css
@keyframes bounce {
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-20px); }
  100% { transform: translateY(0); }
}
```

### 关键参数

| 属性 | 值 |
|---|---|
| `animation-direction` | `normal` / `reverse` / `alternate` / `alternate-reverse` |
| `animation-fill-mode` | `none` / `forwards` / `backwards` / `both` |
| `animation-iteration-count` | 数字 / `infinite` |
| `animation-play-state` | `running` / `paused` |

**`fill-mode: forwards`** —— 动画结束后保持最后一帧（否则跳回初始）。

---

## 性能：GPU 合成层

### 优先对 transform / opacity 做动画

```css
.box { transition: transform 300ms; }
.box:hover { transform: translateY(-4px); }   /* ✅ GPU */
```

- **GPU 执行，不触发 Reflow 和 Repaint**
- 浏览器把元素提升为**独立合成层**，GPU 直接对合成层做变换，**不需要重新绘制像素**

### 避免对 width / height / margin / top 做动画

```css
.box { transition: width 300ms; }       /* ❌ 每帧 reflow */
.box { transition: top 300ms; }         /* ❌ reflow */
```

→ 这些属性会触发**布局重算**，整个文档树连锁更新，性能差。

### `will-change` 强制提升

```css
.modal {
  will-change: transform, opacity;
}
```

- 浏览器提前把元素提升到独立合成层
- **别滥用** —— 每个合成层吃显存（典型一层占几 MB）；动画结束后**移除** `will-change` 释放

---

## Reflow vs Repaint

| | Reflow（重排） | Repaint（重绘） |
|---|---|---|
| 触发 | **几何位置 / 尺寸变化** | **视觉样式变化**（背景色 / visibility） |
| 性能代价 | 高（连锁影响其他元素） | 中 |
| 例子 | width / height / margin / position | background / color / box-shadow |

### Composite-only properties（最快）

只触发**合成**（不 reflow 不 repaint）：

- **`transform`** —— `translate` / `rotate` / `scale` / `skew`
- **`opacity`**
- **`filter`**（部分）

→ 动画首选这两个。

---

## View Transition API（现代加分）

跨页面 / 跨状态的"自动 morph"动画（Chrome 111+）：

```js
document.startViewTransition(() => {
  // 改 DOM
});
```

```css
::view-transition-old(root) { animation: fade-out 200ms; }
::view-transition-new(root) { animation: fade-in 200ms; }
```

SPA 路由切换 / 列表 → 详情页 的丝滑动画现在能用纯 CSS 写。

---

## Scroll-driven Animations（CSS scroll-timeline）

```css
@keyframes growShadow {
  to { box-shadow: 0 4px 12px rgba(0,0,0,0.3); }
}
.header {
  animation: growShadow linear;
  animation-timeline: scroll();   /* 用滚动驱动 */
  animation-range: 0 200px;
}
```

→ "滚动到第几像素，动画进度多少" 这种以前必须 JS 写的现在纯 CSS。Chromium 已支持。

---

## 一句话总结

> 动画首选 **transform + opacity**（GPU 合成层）；想自定义节奏用 **cubic-bezier**；现代加分：**View Transitions** 和 **Scroll-Driven Animations**。
$content$,
  'quiz', 'medium',
  ARRAY['frontend','css','animation','transition','performance'],
  NULL
),

-- ─────────────────────────────────────────────────────────────────────────────
-- 8. Line Height & IFC
-- ─────────────────────────────────────────────────────────────────────────────
(
  'CSS · line-height / 行内格式上下文 (IFC)',
$content$
## 概念链

```
font-size → 字体框
line-height - font-size = 行距（上下各一半）
字体框 + 行距 = 行内框（元素独有）
所有行内框最高/最低点 = 行框（整行共享）
```

---

## 最佳实践：line-height 用纯数字

子元素继承相对**比例系数**而非计算结果值：

```css
/* ❌ 父 font-size: 16px, line-height: 1.5em = 24px (计算值被冻结) */
.parent { font-size: 16px; line-height: 1.5em; }
.child  { font-size: 24px; }
/* 子继承的是 24px，不是 1.5em → 行高对子来说太挤了 */

/* ✅ 父 line-height: 1.5 (无单位，继承"系数") */
.parent { font-size: 16px; line-height: 1.5; }
.child  { font-size: 24px; }
/* 子继承 1.5 → 自身计算成 24 × 1.5 = 36px，自动适配 */
```

---

## 非置换行内元素

`span` / `a` / `em` 这类：

- `padding` / `border` / `margin` **不参与行高计算**
- **外边距仅左右生效**（垂直 margin 对行内无效）

```css
span { margin: 20px 0; padding: 20px 0; }
/* 不影响整行高度，但视觉上"溢出"了 */
```

---

## 置换行内元素（`<img>` 等）

`img` / `video` / `iframe` / `input` 这类外部嵌入的：

- `padding` / `border` / `margin` **影响**行高
- 默认底边与**基线**对齐 → 图片下方有 ~5px 莫名其妙的空隙

### 经典坑：图片下方空隙

```html
<div><img src="..."></div>
<!-- div 高度 = img 高度 + 一点空隙（因为基线对齐留出 descender 空间） -->
```

**对策**：

```css
img { display: block; }              /* 不再是行内 → 没基线问题 */
/* 或 */
img { vertical-align: bottom; }      /* 底对齐 */
/* 或 */
.parent { font-size: 0; line-height: 0; }   /* 黑魔法 */
```

---

## IFC（Inline Formatting Context）

**块级容器内只有行内元素时自动建立 IFC**。

### 布局规则

- **水平方向从左到右排列**，放不下时自动换行
- 垂直方向用 **`vertical-align`** 对齐
- **行内元素不能设置宽高**
- `padding` / `border` / `margin` 水平有效，垂直不参与行高计算
- **行框高度** 由这一行里**最高的行内框顶部到最低的行内框底部**决定

### vertical-align 取值

| 值 | 对齐 |
|---|---|
| `baseline`（默认） | 基线对齐 |
| `top` / `bottom` | 行框顶 / 底 |
| `middle` | 父字体的中线（**不是几何中心**） |
| `text-top` / `text-bottom` | 父文本框的顶 / 底 |
| 数值 / 百分比 | 相对基线偏移 |

> `vertical-align: middle` 经常达不到想象中的"垂直居中"—— 它对齐的是父元素**字体的中线**，不是几何中心。

---

## 一句话总结

> `line-height` 写数字不写单位；图片底部空隙用 `display: block` 解决；
> 行内元素垂直 margin/padding/border **不参与行高**，要垂直布局别用 inline。
$content$,
  'quiz', 'medium',
  ARRAY['frontend','css','typography','line-height','ifc'],
  NULL
),

-- ─────────────────────────────────────────────────────────────────────────────
-- 9. Units / Transform / Float / Misc
-- ─────────────────────────────────────────────────────────────────────────────
(
  'CSS · 单位 / Transform / Float / Misc',
$content$
## CSS 单位

### 字体相对

- **`em`** —— 相对**当前元素**字体大小（嵌套时会**累乘**，容易爆炸）
- **`rem`** —— 相对**根元素**（`<html>`）字体大小 —— 现代首选

### 视口相对

- **`vw` / `vh`** —— 视口宽 / 高的 1%
- **`vmin` / `vmax`** —— 视口宽高中较小 / 较大值的 1%

### 移动端 viewport 单位（重要）

```css
.full { height: 100vh; }    /* ❌ iOS Safari 地址栏隐藏 / 显示时跳 */
.full { height: 100dvh; }   /* ✅ Dynamic Viewport Height — 自适应 */
```

- **`dvh` / `dvw`** —— **Dynamic** Viewport（地址栏变化时动态调）
- **`lvh` / `lvw`** —— **Large** Viewport（地址栏隐藏时的尺寸）
- **`svh` / `svw`** —— **Small** Viewport（地址栏显示时的尺寸）

### Container Query 单位

- **`cqw` / `cqh`** —— 相对**容器查询**容器的尺寸（不是视口）

```css
@container (min-width: 400px) {
  .card { width: 50cqw; }
}
```

---

## 响应式字体

```css
div {
  font-size: clamp(14px, 1.5vw, 18px);
  /* 小屏：1.5vw < 14px → 取 14px
     中屏：1.5vw 在 [14, 18] → 跟随视口
     大屏：1.5vw > 18px → 取 18px */
}
```

**`clamp(min, preferred, max)`** —— 现代响应式字号的标准写法。

---

## Transform

```css
div { transform: translateX(10px) rotate(45deg) scale(1.5); }
```

- **变形顺序影响最终结果**（先平移后旋转 ≠ 先旋转后平移）
- **不能用于普通行内元素**（`span`、`a` 等，除非 `display: inline-block`）
- **`transform-origin`** 默认为元素中心
- 处理时浏览器把元素提升到**独立合成层**，由 **GPU** 直接处理，跳过 Layout 和 Paint

### 现代单值写法

```css
div { translate: 10px 20px; rotate: 45deg; scale: 1.5; }
```

→ 不再需要 `transform` 简写 + 不会互相覆盖。

### 3D Transform

```css
.parent { perspective: 1000px; }
.card { transform-style: preserve-3d; }   /* 让子元素保持 3D 关系 */
```

---

## 浮动（float）

- **脱离文档流**，但影响周围内容（**文字环绕**）
- 浮动后自动生成块级框，**外边距不折叠**
- **非置换浮动元素需显式设置宽度**

```css
img { float: left; margin-right: 16px; }
p { /* 自动环绕 img */ }
```

> **现代 CSS 已经基本不用 float 做布局**（flex / grid 替代），但**文字环绕**这个原始用途仍然有效。

---

## 全局关键字

| 关键字 | 行为 |
|---|---|
| **`inherit`** | 强制继承父元素值 |
| **`initial`** | 重置为 CSS 规范默认值 |
| **`unset`** | 可继承则继承，否则用默认值 |
| **`revert`** | 还原为**浏览器默认样式** |
| **`revert-layer`** | 还原为上一 `@layer` 的值 |

---

## white-space

| 值 | 折叠空白 | 换行 |
|---|---|---|
| `normal` | ✅ | ✅ |
| `nowrap` | ✅ | ❌（强制单行） |
| `pre` | ❌（保留所有） | ❌ |
| `pre-wrap` | ❌ | ✅ |
| `pre-line` | ✅ | ✅（仅 `\n` 换行） |

---

## width / height 关键字

- **`max-content`** —— 内容完全展开所需宽度
- **`min-content`** —— 最长单词 / 不可换行内容的宽度
- **`fit-content`** —— 不超过父容器、尽量撑开
- **`fit-content(N)`** —— `fit-content` 的上限版

---

## 一句话总结

> 移动端 viewport 用 **`dvh`** 不用 `vh`；响应式字号用 **`clamp()`**；
> 现代 transform 用单值写法 `translate / rotate / scale`，不互相覆盖。
$content$,
  'quiz', 'medium',
  ARRAY['frontend','css','units','transform','responsive'],
  NULL
),

-- ─────────────────────────────────────────────────────────────────────────────
-- 10. Variables / Theme
-- ─────────────────────────────────────────────────────────────────────────────
(
  'CSS · Variables · 主题切换 · @property / color-mix / light-dark',
$content$
## CSS Variables 基础

```css
:root { --bg: white; --text: black; }   /* 全局默认 */

[data-theme="dark"] {                    /* 覆盖全局变量值 */
  --bg: #1a1a1a;
  --text: white;
}

body {
  background: var(--bg);
  color: var(--text);
}
```

切换：

```js
document.documentElement.setAttribute('data-theme', 'dark');
```

### 几个关键事实

- **变量名 `--*`** 大小写敏感
- **`var(--name, fallback)`** —— 提供 fallback 值
- **作用域跟着 DOM 树**（不是文件）—— 子元素继承父级声明的变量
- **运行时可改** —— `el.style.setProperty('--bg', 'red')` 直接 hot reload

---

## `@property` 注册类型化变量（现代）

普通 CSS 变量在 JS / CSS 看来都是字符串。**`@property`** 让浏览器**类型化**：

```css
@property --gradient-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

.box {
  background: linear-gradient(var(--gradient-angle), red, blue);
  transition: --gradient-angle 1s;   /* ✅ 现在可以动画！ */
}
.box:hover { --gradient-angle: 180deg; }
```

**好处**：
- 可以**插值 / 过渡 / 动画**（默认 CSS 变量不能 transition）
- **类型校验**（值不合规直接拒绝）
- 触发渲染优化

---

## `color-mix()` 动态色彩混合

```css
:root { --primary: #3b82f6; }

.btn-hover { background: color-mix(in srgb, var(--primary) 80%, black); }
.btn-disabled { background: color-mix(in srgb, var(--primary) 50%, transparent); }
```

→ 一个 primary 色派生出 hover / active / disabled / muted，**无需手写一堆衍生色**。

---

## `light-dark()` 函数（2024+）

声明一组明暗双色，浏览器按用户偏好自动选：

```css
:root { color-scheme: light dark; }

.text {
  color: light-dark(black, white);
  background: light-dark(#fff, #1a1a1a);
}
```

比 `prefers-color-scheme` 媒体查询简洁很多。

---

## 主题切换 + 系统偏好结合

```css
:root {
  color-scheme: light dark;
  --bg: light-dark(#fff, #0a0a0a);
  --text: light-dark(#000, #fff);
}

/* 用户主动切换覆盖 */
[data-theme="light"] { color-scheme: light; }
[data-theme="dark"]  { color-scheme: dark; }
```

```js
// 切到跟随系统
document.documentElement.removeAttribute('data-theme');
// 强制亮色
document.documentElement.setAttribute('data-theme', 'light');
```

---

## `prefers-color-scheme` 媒体查询

```css
@media (prefers-color-scheme: dark) {
  :root { --bg: #1a1a1a; --text: white; }
}
```

→ 同样的效果，但写法更分散。能用 `light-dark()` 就用它。

---

## 防 FOUC 闪烁

主题切换的页面**首次加载**有概率闪一下错误主题，因为 CSS 加载完才知道用户偏好：

```html
<script>
  // 在 <head> 顶部尽早执行（同步阻塞）
  const t = localStorage.getItem('theme') ||
            (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', t);
</script>
```

→ 在 React 应用里通常通过 SSR 注入 `data-theme` 或一段 `<script>` blocking 来解决。

---

## 一句话总结

> CSS Variables 用 `var(--name, fallback)`；动画化变量用 `@property`；派生色用 `color-mix()`；明暗主题用 `light-dark()` 或 `prefers-color-scheme`。
$content$,
  'quiz', 'medium',
  ARRAY['frontend','css','variables','theming','dark-mode'],
  NULL
),

-- ─────────────────────────────────────────────────────────────────────────────
-- 11. CSS Misc (Tailwind / Module / Preprocessor / CSS-in-JS / BEM)
-- ─────────────────────────────────────────────────────────────────────────────
(
  'CSS · 样式方案对比 · Tailwind / Module / 预处理器 / CSS-in-JS / BEM',
$content$
## Tailwind CSS

1. **原子化"实用类"** —— 一个类对应一个样式，组合实现各种样式
2. **代码即样式**，可读性高（看 HTML 就能预想效果）
3. 在配置中定义**统一的设计系统**（颜色 / 间距 / 字体 / 断点）
4. 内置响应式断点类，写法简单（`md:flex-row`）

```html
<div class="flex items-center gap-4 p-4 rounded-lg bg-white shadow hover:shadow-lg">
  <img class="w-12 h-12 rounded-full" src="..." />
  <span class="text-lg font-medium text-gray-900">Hello</span>
</div>
```

### Tailwind v4（2024 末）的变化

- **CSS-first 配置** —— 不再需要 `tailwind.config.js`，直接在 CSS 里用 `@theme`
- **基于 Rust 重写** —— 编译速度大幅提升
- **自动检测内容文件** —— 不用配 `content` 数组
- **现代 CSS feature** —— 使用 `@property` / `color-mix()` / cascade layers

### 优缺点

✅ 设计系统约束 / 不需要起类名 / 增量 CSS 自动 tree-shake / 调试时所见即所得
❌ HTML 类名长 / 学习曲线 / 编辑器需要插件 / 复用大量组件时仍需 `@apply` 或 React 组件封装

---

## CSS Module

为每个 CSS 类名生成一个**作用于当前模块的**唯一标识符，从而实现样式隔离。

### 工作流程

1. 编写 `*.module.css` 文件
2. 构建工具读取文件，为每个类名生成全局唯一类名（**hash 基于文件路径 / 类名 / 内容**）
3. 生成「原始类名 → 唯一类名」的映射对象
4. 在组件中通过原始类名嵌入唯一类名
5. 浏览器根据唯一类名找样式

```css
/* Button.module.css */
.primary { background: blue; }
```

```jsx
import styles from './Button.module.css';

<button className={styles.primary}>Click</button>
/* 实际渲染：<button class="Button_primary_a3f9d">Click</button> */
```

### 优缺点

✅ 真正的样式隔离 / 写法接近原生 CSS / 工具链成熟（Vite / Next 内置）
❌ 跨组件样式复用要导出工具类 / 不容易动态计算样式

---

## CSS Preprocessor（Sass / Less / Stylus）

让 CSS 更像程序语言一样**强大、可复用、结构清晰**：

```scss
$primary: #3b82f6;

.card {
  padding: 16px;
  .title { font-size: 18px; }   // 嵌套
  &:hover { background: lighten($primary, 10%); }
}

@mixin flex-center { display: flex; align-items: center; justify-content: center; }
.center { @include flex-center; }
```

### 现状（2026）

- **Sass / Less 仍然广泛使用**（旧项目 / 复杂主题）
- **新项目越来越少用** —— 因为：
  - 原生 CSS 嵌套已支持
  - CSS 变量替代了大部分预处理变量
  - `color-mix()` 替代了 `lighten()` / `darken()`
  - `@layer` 替代了组织复杂的 `@import`

---

## CSS-in-JS

把样式写在 JS 里，**和组件逻辑同文件**。

```jsx
// styled-components
const Button = styled.button`
  background: ${props => props.primary ? 'blue' : 'white'};
  color: ${props => props.primary ? 'white' : 'blue'};
  padding: 8px 16px;
`;

<Button primary>Submit</Button>
<Button>Cancel</Button>
```

### 优缺点

✅ 基于 JS 变量和逻辑的**动态样式** / **自动 scope** / 样式和组件同生命周期 / TypeScript 友好
❌ **运行时动态生成 + 插入样式**有性能成本 / 调试体验差 / SSR 配置麻烦 / **React 18 流式 SSR 适配差**

### 现状（2026）

**老牌 CSS-in-JS 衰落**：
- **styled-components v6 进入维护模式**（项目原作者另起 [Kuma UI](https://www.kuma-ui.com/) 等零运行时方案）
- **Emotion 仍在用**，但被新项目避开
- React 团队**官方不推荐运行时 CSS-in-JS** + RSC（Server Component）兼容性差

**新一代零运行时 CSS-in-JS**：
- **Vanilla Extract** —— 编译时生成静态 CSS，TS 友好
- **Panda CSS** —— 静态 + 类型化的 Tailwind 风格
- **Linaria** —— `styled` 语法但零运行时

→ "**编译时 CSS-in-JS**" 是新趋势 —— 拿 CSS-in-JS 的 DX，但产出静态 CSS。

---

## BEM (Block, Element, Modifier)

CSS 命名规范，目的是**可读性强、结构清晰、易维护**的类名。

```html
<!--
  .block                          块
  .block__element                 元素（块的子部分）
  .block--modifier                修饰符（块的状态）
  .block__element--modifier       元素的状态
-->
<div class="card card--featured">
  <h2 class="card__title">Title</h2>
  <p class="card__content">...</p>
</div>
```

### 优缺点

✅ 类名一眼看出层级和状态 / 无需嵌套选择器 / 团队规范化
❌ 类名长 / 重复 `card__` 前缀 / 现代有 CSS Module / Tailwind 替代

---

## 选型决策（2026 建议）

| 项目类型 | 推荐方案 |
|---|---|
| **新项目 / 设计系统已确定** | **Tailwind**（+ shadcn 组件） |
| **新项目 / 强类型 / 静态产物** | **Panda CSS** / Vanilla Extract |
| **复杂业务组件库** | **CSS Module** + CSS variables |
| **超动态样式 + 不在意运行时成本** | Emotion / styled-components（老项目） |
| **老项目维护** | 保持现状（Sass + BEM 等也 ok） |

---

## Container Queries（额外加分）

打破"媒体查询只能看视口"的限制，**根据容器自身宽度调整样式**：

```css
.card {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card__title { font-size: 24px; }
}
```

→ 真正的组件级响应式。Tailwind v4 也原生支持（`@container` 工具类）。

---

## 一句话总结

> 2026 的"主流"是 **Tailwind / Panda / Vanilla Extract**（编译时静态 CSS）+ **CSS Variables** + **Container Queries**。运行时 CSS-in-JS 在退潮；BEM / Sass 仍能用但已经不是"现代"方案。
$content$,
  'quiz', 'medium',
  ARRAY['frontend','css','tailwind','css-module','css-in-js','styling'],
  NULL
);
