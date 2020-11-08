---
title: 《C++17 STL Cookbook》读书笔记（三）
intro: 继续接上篇。
comments: true
date: 2020-07-31 21:19:12
tags:
- C++
---

继续接上篇。

### Chapter 5: STL Algorithm Basics

<h5>容器拷贝算法</h5>

* std::copy 相关 STL 算法会选择使用不同的内部方式（**std::memcopy** / **std::memmove** / **loop**）来优化算法的执行；
* **std::copy 与 std::ostream_iterator 相结合来输出元素内容**是一种常用的方式；
* **std::copy 相关 STL 算法与 std::inserter 相结合来转移某个容器元素到另一种类型的容器**中，也是一种常用方式；

```cpp
namespace std {
  ostream& operator<<(ostream &os, const pair<int, string> &p) {
    return os << "(" << p.first << ", " << p.second << ")";
  }
}
int main(int argc, char **argv) {
  std::vector<std::pair<int, std::string>> v {
    {1, "one"}, {2, "two"}, {3, "three"}
  };
  std::map<int, std::string> m;
  // using std::insert_iterator adapter (returned by std::inserter);
  std::copy_n(std::begin(v), 3, 
    std::inserter(m, std::begin(m)));
  auto shellIt (std::ostream_iterator<std::pair<int, std::string>>{std::cout, ", "});
  std::copy(std::begin(m), std::end(m), shellIt);
  m.clear();
  std::move(std::begin(v), std::end(v), std::inserter(m, std::begin(m)));
  return 0;
}
```

<h5>容器排序算法</h5>

* std::sort；
* std::is_sorted；
* std::shuffle；
* std::partial_sort；
* std::partition；

<h5>从容器中移除特定元素</h5>

* std::remove；
* std::replace；
* std::remove_copy：
* std::replace_copy；
* std::copy_if；
* **std::erase** (since C++20)；
* **std::erase_if** (since C++20)；

```cpp
int main(int argc, char **argv) {
  std::vector v {1, 2, 3, 4, 5, 6, 7, 8};
  {
    const auto newEnd(std::remove(std::begin(v), std::end(v), 2));
    v.erase(newEnd, std::end(v));
  }
  // std::erase(v, 2);  // works since C++20, same as above;
  return 0;
}
```

<h5>转换容器中的元素</h5>

* std::transform；

```cpp
int main(int argc, char **argv) {
  std::vector v {1, 2, 3, 4, 5};
  std::transform(std::begin(v), std::end(v), std::ostream_iterator<int>{std::cout, ", "}, 
    [](int i) { return i * i; });
  return 0;
}
```

<h5>在有序/无序容器中查找元素</h5>

* std::find；
* std::find_if；
* std::binary_search；
* std::lower_bound；
* std::upper_bound；
* std::equal_range；

```cpp
struct City {
  std::string name;
  unsigned population;
};
bool operator==(const City &x, const City &y) {
  return x.name == y.name && x.population == y.population;
}
std::ostream& operator<<(std::ostream& os, const City& c) {
  return os << "{" << c.name << ", " << c.population << "}";
}
template<typename T>
static auto optPrint(const T& c) {
  return [endIt(std::end(c))] (const auto& item) {
    if (item != endIt) {
      std::cout << *item << std::endl;
    } else {
      std::cout << "<end>\n";
    }
  };
}
int main(int argc, char **argv) {
  const std::vector<City> c {
    {"Aachen", 246000},
    {"Berlin", 3502000},
    {"Braunschweig", 251000},
    {"Cologne", 1060000}
  };
  auto printCity (optPrint(c));

  // std::find (rely on the operator==).
  auto foundCologne (std::find(std::begin(c), std::end(c), City{"Cologne", 1060000}));
  printCity(foundCologne);

  // std::find_if (comparing with a predicate).
  auto foundAachen (std::find_if(std::begin(c), std::end(c), 
    [](const auto& item) {
      return item.name == "Aachen";
    }));
  printCity(foundAachen);

  // std::binary_search.
  const std::vector v {1, 2, 3, 4, 5, 6};
  bool ifContains {std::binary_search(std::begin(v), std::end(v), 6)};

  // std::equal_range -> scope [), the same as using std::lower_bound and std::upper_bound;
  auto [lowerIt, upperIt] (std::equal_range(std::begin(v), std::end(v), 6));
  std::cout << *lowerIt << std::endl;

  return 0;
}
```

<h5>使用 std::clamp 约束容器元素的可取值范围</h5>

```cpp
static auto norm(int min, int max, int newMax) {
  const double diff (max - min);
  return [=] (int val) {
    return int((val - min) / diff * newMax);
  };
}
static auto clampVal(int min, int max) {
  return [=] (int val) -> int {
    return std::clamp(val, min, max);
  };
}

int main(int argc, char **argv) {
  std::vector v {0, 1000, 5, 250, 300, 800, 900, 321};
  std::vector<int> vNorm;
  vNorm.reserve(v.size());
  const auto [minIt, maxIt] (std::minmax_element(std::begin(v), std::end(v)));
  std::transform(
    std::begin(v), 
    std::end(v), 
    std::back_inserter(vNorm),
    norm(*minIt, *maxIt, 255));  // normalize values;
  std::transform(
    std::begin(v), 
    std::end(v), 
    std::back_inserter(vNorm),
    clampVal(0, 255));  // limit the range of value;
  return 0;
}
```

<h5>使用 std::search 定位字符串中的特定模式</h5>

* **Boyer-Moore 算法**：（计算步骤如下）

![](1.png)

* Boyer-Moore-Horspool 算法：Boyer-Moore 的简化版；

```cpp
template<typename T>
static void print(T it, size_t chars) {
  std::copy_n(it, chars, std::ostream_iterator<char>{std::cout});
  std::cout << '\n';
}

int main(int argc, char **argv) {
  const std::string str {"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod."};
  const std::string needle {"eli"};
  {
    auto match (std::search(std::begin(str), std::end(str), std::begin(needle), std::end(needle)));
    print(match, 5);
  }
  {
    // be able to change different searcher dynamically, like std::boyer_moore_searcher.
    auto match (std::search(std::begin(str), std::end(str), 
      std::default_searcher(std::begin(needle), std::end(needle))));
    print(match, 5);
  }
  return 0;
}
```

<h5>对存有大量元素的 std::vector 进行采样</h5>

* std::sample；

```cpp
int main(int argc, char **argv) {
  const size_t dataPoints {100000};
  const size_t samplePoints {100};
  const int mean {10};
  const size_t dev {3};

  std::random_device rd;
  std::mt19937 gen {rd()};
  std::normal_distribution<> d {mean, dev};

  std::vector<int> v;
  v.reserve(dataPoints);
  
  std::generate_n(std::back_inserter(v), dataPoints, 
    [&] { return d(gen); });
  std::vector<int> samples;
  v.reserve(samplePoints);
  // sampling;
  std::sample(std::begin(v), std::end(v), 
    std::back_inserter(samples),
    samplePoints, 
    std::mt19937{std::random_device{}()});
  // draw hist;
  std::map<int, size_t> hist;
  for (int i : samples) {
    ++hist[i];
  }
  for (const auto &[value, count] : hist) {
    std::cout << std::setw(2) << value << " " << std::string(count, '*') << std::endl;
  }
  return 0;
}
```

<h5>生成输入序列的所有可能排列组合（Permutation）</h5>

* std::next_permutation 会根据给定序列的**词典顺序**（Lexicographical Order）来寻找可能的排列组合；
* 算法步骤：
 - 找到最大的索引 i，使得 v[i - 1] < v[i]。若无则返回 false；
 - 找到最大的索引 j，使得 j >= i 并且 v[j] > v[i - 1]；
 - 交换位置 j 与 i - 1 的值；
 - 将从位置 i 到结尾的元素排列顺序翻转；
 - 返回 true；

```cpp
int main(int argc, char **argv) {
  std::vector<std::string> v {std::istream_iterator<std::string>{std::cin}, {}};
  std::sort(std::begin(v), std::end(v));
  // print all permutations;
  do {
    std::copy(std::begin(v), std::end(v), 
      std::ostream_iterator<std::string>{std::cout, ", "});
    std::cout << std::endl;
  } while (std::next_permutation(std::begin(v), std::end(v)));
  return 0;
}
```
<h5>实现一个字典合并工具</h5>

* std::merge（接受两个**已经 sorted** 的迭代器区间）；
* std::inplace_merge；

```cpp
using dictEntry = std::pair<std::string, std::string>;
namespace std {
  std::ostream& operator<<(std::ostream &os, const dictEntry p) {
    return os << p.first << " " << p.second;
  }
  std::istream& operator>>(std::istream& is, dictEntry& p) {
    return is >> p.first >> p.second;
  }
}
template<typename T>
std::deque<dictEntry> fromIter(T&& is) {
  std::deque<dictEntry> d {std::istream_iterator<dictEntry>{is}, {}};
  std::sort(std::begin(d), std::end(d));
  return d;
}

int main(int argc, char **argv) {
  const auto dictX (fromIter(std::ifstream{"dict.txt"}));
  const auto dictY (fromIter(std::cin));
  std::merge(std::begin(dictX), std::end(dictX), std::begin(dictY), std::end(dictY),
    std::ostream_iterator<dictEntry>{std::cout, "\n"});
  return 0;
}
```

### Chapter 6: Advanced Use of STL Algorithms

（略）

### Chapter 7: Strings, Stream Classes, and Regular Expressions

![](2.png)

<h5>创建、拼接以及转换字符串</h5>

* std::string_view 在内部维护的字符串通常**不是 C-null-terminted 字符串**，因此不要直接使用它（通过 data() 方法获取的内部字符数组）与其他 std::string 字符串进行拼接操作；

```cpp
using std::operator""s;
using std::operator""sv;

int main(int argc, char **argv) {
  // constructing std::string by copying;
  std::string strA {"Hello, "};
  auto strB ("world!"s);

  // std::string_view;
  std::string_view strC{"I'm "};
  auto strD ("Jason."sv);

  std::cout << strA + strB << std::endl;
  std::cout << strA + std::string{strD} << std::endl;

  // std::ostringstream;
  std::ostringstream o;
  o << strA << strB;
  auto concatenated (o.str());
  std::cout << concatenated << std::endl;

  // std::transform;
  std::transform(concatenated.begin(), concatenated.end(),
    concatenated.begin(), [](unsigned char c) { return std::toupper(c); });
  std::cout << concatenated << std::endl;
  return 0;
}
```

<h5>修剪字符串两段的空白字符</h5>

* std::basic_string::find_first_not_of；
* std::basic_string::find_last_not_of；
* std::basic_string::substr；

```cpp
std::string trimStrSpaces(const std::string& s) {
  const char whitespaces[] {" \t\n"};
  const size_t first (s.find_first_not_of(whitespaces));
  if (std::string::npos == first) {
    return {};
  }
  const size_t last (s.find_last_not_of(whitespaces));
  // by copying;
  return s.substr(first, (last - first + 1));
}

int main(int argc, char **argv) {
  std::string s {" \t\n string surrounded by ugly whitespace \t\n "};
  std::cout << trimStrSpaces(s) << std::endl;
  return 0;
}
```

<h5>使用 std::string_view 避免字符串拷贝</h5>

* 要注意 std::string_view 在使用**自动变量（栈上）**作为所指向的底层字符串资源时，需要**确保该自动变量的生存期要大于等于 std::string_view 对象自身的生存期**。而对于其他诸如全局变量、静态变量以及 const 常量（位于 .data / .rodata），则无需担心此问题；

```cpp
using std::operator""s;
using std::operator""sv;

void print(std::string_view v) {
  const auto wordsBegin (v.find_first_not_of(" \t\n"));
  // std::basic_string::npos could be evaluated to size_type(-1),
  // which is a very large positive number.
  v.remove_prefix(std::min(wordsBegin, v.size()));
  const auto wordsEnd (v.find_last_not_of(" \t\n"));
  // number of characters to remove from the end of the view.
  v.remove_suffix(v.size() - wordsEnd - 1);
  std::cout << v << std::endl;
}

int main(int argc, char **argv) {
  char cs[] = {'\n', '\t', 'H', 'i', '!'};
  const char* s = "\t\tHello, world!\n";
  print(s);
  print({});
  print("\t\tHello, world!\n"s);
  print("\t\tHello, world!\n"sv);
  print(cs);
  print(std::string_view(cs, sizeof(cs)));
  return 0;
}
```

<h5>从标准输入流读取用户输入</h5>

* 当输入流遇到错误时，需要先清**除错误标志位**（std::cin.clear），然后**清空已读入缓冲区的无效数据**（std::cin.ignore）；

```cpp
int main(int argc, char **argv) {
  std::cout << "Please enter two numbers: \n";
  int x;
  double y;
  if (std::cin >> x >> y) {
    std::cout << "You entered: " << x << " and " << y << std::endl;
  } else {
    std::cout << "Oh no, that did not go well!\n";
    // clear the failure state.
    std::cin.clear();
    // drop all the input we received.
    std::cin.ignore(
      std::numeric_limits<std::streamsize>::max(), '\n'
    );
    std::cout << "now please enter some comma-separated names:\n> ";
    // use std::ws to discard leading spaces.
    for (std::string s; std::getline(std::cin >> std::ws, s, ',');) {
      if (s.empty()) {
        break;
      }
      std::cout << "name: \"" << s << "\"\n";
    }
  }
  return 0;
}
```

<h5>计算一个文件中的单词数量</h5>

* std::distance；

```cpp
template<typename T>
size_t wordCount(T &is) {
  return std::distance(std::istream_iterator<std::string>{is}, {});
}

int main(int argc, char **argv) {
  size_t wc;
  if (argc == 2) {
    std::ifstream ifs {argv[1]};
    wc = wordCount(ifs);
  } else {
    wc = wordCount(std::cin);
  }
  std::cout << "There are " << wc << " words\n";
  return 0;

```

<h5>使用 I/O 流操作符格式化输出</h5>

```cpp
using namespace std;

void printAligned(int val, size_t width, char fill = ' ') {
  cout << "================\n";
  cout << hex;  // show hexadecimal.
  cout << showbase;  // show base symbol (0x\0).
  cout << uppercase;
  // cout << setprecision(2);  // set the precision of floating-numbers.
  // cout << scientific;  // show floating-point numbers in a scientific way.
  // cout << showpoint;  // show decimal.
  // cout << boolalpha;  // show boolean value in a human readable format.
  cout << setfill(fill);
  cout << left << setw(width) << val << '\n';
  cout << right << setw(width) << val << '\n';
  cout << internal << setw(width) << val << '\n';
}

int main(int argc, char **argv) {
  printAligned(123, 15, '_');
  return 0;
}
```

<h5>从输入流输入初始化复杂对象</h5>

```cpp
struct City {
  std::string name;
  size_t population;
  double latitude;
  double longitute;
};
std::istream& operator>>(std::istream& is, City &c) {
  is >> std::ws;  // skip all the leading spaces;
  std::getline(is, c.name);
  is >> c.population >> c.latitude >> c.longitute;
  return is;
}

int main(int argc, char **argv) {
  std::vector<City> v;
  std::copy(std::istream_iterator<City>{std::cin}, {}, std::back_inserter(v));
  for (const auto& [name, pop, lat, lon] : v) {
    std::cout << std::left << std::setw(10) << name
       << " population=" << pop                   
       << " lat=" << lat                   
       << " lon=" << lon << '\n';
  }
  return 0;
}
```
<h5>使用 std::istream_iterator 填充容器</h5>

```cpp
struct Meme {
  std::string desc;
  size_t year;
};
std::istream& operator>>(std::istream& is, Meme& m) {
  return is >> std::quoted(m.desc) >> m.year;
}
std::istream& operator>>(std::istream& is, std::pair<std::string, Meme>& p) {
  return is >> std::quoted(p.first) >> p.second;
}

int main(int argc, char **argv) {
  std::map<std::string, Meme> m;
  std::copy(std::istream_iterator<std::pair<std::string, Meme>>{std::cin}, {}, std::inserter(m, std::end(m)));
  // formatting;
  size_t width {std::accumulate(std::begin(m), std::end(m), 0u, 
    [](size_t oldMax, const auto& b) {
      return std::max(oldMax, b.first.length());
    })};
  // print;
  for (const auto& [memeName, memeDesc] : m) {
    const auto& [desc, year] = memeDesc;
    std::cout << std::left << std::setw(width) << memeName
      << " : " << desc
      << ", " << year << '\n';
  }
  return 0;
}
```
<h5>使用 std::ostream_iterator 构建通用输出</h5>

```cpp
using std::operator""s;
std::string wordNum(int i) {
  std::unordered_map<int, std::string> m {
    {1, "one"}, {2, "two"}, {3, "three"}, {4, "four"}, {5, "five"},
  };
  const auto match (m.find(i));
  if (match == std::end(m)) {
    return "unknow";
  }
  return match->second;
}

struct Bork {
  int borks;
  Bork(int i) : borks(i) {}
  void print(std::ostream& os) const {
    std::fill_n(std::ostream_iterator<std::string>{os, " "}, borks, "bork!"s);
  }
};

std::ostream& operator<<(std::ostream &os, const Bork& b) {
  b.print(os);
  return os;
}

int main(int argc, char **argv) {
  const std::vector<int> v {1, 2, 3, 4, 5};
  std::transform(std::begin(v), std::end(v),
    std::ostream_iterator<std::string>{std::cout, " "},
    wordNum);
  std::cout << '\n';
  // Bork will be implicitly constructed.
  std::copy(std::begin(v), std::end(v), std::ostream_iterator<Bork>{std::cout, "\n"});
  return 0;
}
```

<h5>重定向标准输出 std::cout</h5>

* 输出流对象内部的**缓冲区可以互相交换**（std::basic_ios::rdbuf）；

```cpp
struct RedirectCoutRegion {
  using bufType = decltype(std::cout.rdbuf());
  std::ofstream ofs;
  bufType bufBackup;
  explicit RedirectCoutRegion(const std::string& fn) : 
    ofs{fn}, 
    bufBackup{ std::cout.rdbuf(ofs.rdbuf()) } {}
  RedirectCoutRegion() : 
    ofs{}, // old stream buf pointer would be saved.
    bufBackup{ std::cout.rdbuf(ofs.rdbuf()) } {}
  ~RedirectCoutRegion() {
    // will deactivate the cout buf since "bufBackup" here is invalid.
    std::cout.rdbuf(bufBackup);
  }
};

int main(int argc, char **argv) {
  std::cout << "Readable from normal stdout.\n";
  {
    RedirectCoutRegion _ {"output.txt"};
    std::cout << "Only visible in output.txt\n";
  }
  {
    RedirectCoutRegion _ {};
    std::cout << "This output will completely vanish.\n";
  }
  std::cout << "Readable from normal stdout again.\n";
  return 0;
}
```

<h5>创建自定义的字符串类</h5>

* 思路：**继承 std::char_traits，重新复写相关的 static 方法**；然后将新的 trait 作为模板参数来**特化**一个自定义的 **std::basic_string** 类型。
* std::basic_string 模板类的模板参数：

```cpp
template< 
    class CharT, 
    class Traits = std::char_traits<CharT>, 
    class Allocator = std::allocator<CharT>
> class basic_string;
```

简单实例：

```cpp
static constexpr char tolow(char c) {
  switch (c) {
    case 'A'...'Z' : return c - 'A' + 'a';
    default: return c;
  }
}
class lcTraits : public std::char_traits<char> {
 public:
  static constexpr void assign(char_type& r, const char_type& a) {
    r = tolow(a);
  }
  static char_type* copy(char_type* dest, const char_type* src, size_t count) {
    std::transform(src, src + count, dest, tolow);
    return dest;
  }
  static constexpr bool eq(char_type a, char_type b) {
    return tolow(a) == tolow(b);
  }
  static constexpr bool lt(char_type a, char_type b) {
    return tolow(a) < tolow(b);
  }
  static constexpr int compare(const char_type* s1, const char_type* s2, size_t count) {
    for (; count; ++s1, ++s2, --count) {
      const char_type diff (tolow(*s1) - tolow(*s2));
      if (diff < 0) { return -1; }
      else if (diff > 0) { return +1; }
    }
    return 0;
  }
  static constexpr const char_type* find(
    const char_type* p,
    size_t count,
    const char_type& ch) {
      const char_type findC {tolow(ch)};
      for (; count != 0; --count, ++p) {
        if (findC == tolow(*p)) { return p; }
      }
      return nullptr;
    }
};
using lcString = std::basic_string<char, lcTraits>;
std::ostream& operator<<(std::ostream& os, const lcString& str) {
  return os.write(str.data(), str.size());
}

int main(int argc, char **argv) {
  std::cout << lcString{"YHSPY"} << std::endl;
  return 0;
}
```

<h5>使用正则表达式</h5>

![](3.png)

```cpp
template <typename InputIt>
void print(InputIt it, InputIt endIt) {
  while (it != endIt) {
    const std::string link {*it++};
    if (it == endIt) { break; }
    const std::string desc {*it++};
    std::cout << std::left << std::setw(28) << desc << " : " << link << '\n';
  }
}

int main(int argc, char **argv) {
  std::cin >> std::noskipws;
  const std::string in {std::istream_iterator<char>{std::cin}, {}};
  const std::regex linkReg {"<a href=\"([^\"]*)\"[^<]*>([^<]*)</a>"};
  std::sregex_token_iterator it {std::begin(in), std::end(in), linkReg, {1, 2}};
  print(it, {});
  return 0;
}
```

<h5>利用 RAII 实现一个 “Output-Formatting-Gurad”</h5>

* std::cout.flags：**设置/返回当前标准输出 std::cout 的格式化设置参数**；

```cpp
class formatGuard {
  decltype(std::cout.flags()) f {std::cout.flags()};
 public:
  ~formatGuard() {
    std::cout.flags(f);
  }
};
template<typename T>
struct scientificType {
  T value;
  explicit scientificType(T val) : value{val} {}
};
template<typename T>
std::ostream& operator<<(std::ostream& os, const scientificType<T>& w) {
  formatGuard _;
  os << std::scientific << std::uppercase << std::showpos;
  return os << w.value;
}

int main(int argc, char **argv) {
  {
    formatGuard _;
    std::cout << std::hex << std::scientific << std::showbase << std::uppercase;
    std::cout << "Numbers with special formatting:\n";
    std::cout << 0x123abc << '\n';
    std::cout << 0.123456789 << '\n';
  }
  std::cout << "Same numbers, but normal formatting again:\n";
  std::cout << 0x123abc << '\n';
  std::cout << 0.123456789 << '\n';
  // boxed value;
  std::cout << "Mixed formatting: " << 123.0 << " "
    << scientificType{123.0} << " "
    << 123.456 << '\n';
  return 0;
}
```

<h5>IO 流与异常处理</h5>

* 静态、线程本地的全局变量 `error` 通常会**被系统调用或其他库函数修改**，以提示发生了某种异常；可以通过 std::strerror 来得到详细的错误信息；

```cpp
int main(int argc, char **argv) {
  std::ifstream f;
  // enable exceptions for filesystem errors and parsing errors;
  f.exceptions(f.failbit | f.badbit);
  try {
    f.open("non_existant.txt");
    int i;
    f >> i;
    std::cout << "integer has value: " << i << '\n';
  } catch (std::ios_base::failure& e) {
    if (errno) {
      std::cerr << std::strerror(errno) << '\n';
    } else {
      std::cerr << e.what() << '\n';
    }
  }
  return 0;
}
```
