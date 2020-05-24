---
title: Android 以 Post 方式发送 HTTP 请求
intro: 网络通信日益发展的今天，出现了多种用于网络通信的标准，HTTP 作为应用层协议无法保持状态，每一次数据发送都无法获知此次发送与前一次发送之间的关系。但是在 C/S 模式中还是有他自己的优势的。无连接，无状态，但是却很灵活。那么，移动端如果想要与服务器进行交互，就可以选择 HTTP 协议。
comments: true
date: 2014-12-24 23:23:06
tags:
- Android
---

网络通信日益发展的今天，出现了多种用于网络通信的标准，HTTP 作为应用层协议无法保持状态，每一次数据发送都无法获知此次发送与前一次发送之间的关系。但是在 C/S 模式中还是有他自己的优势的。无连接，无状态，但是却很灵活。那么，移动端如果想要与服务器进行交互，就可以选择 HTTP 协议。

在安卓开发中，想要以 Post 方式发送 HTTP 请求非常简单，首先生成一个 `HttpPost` 对象，构造函数中传入发送 HTTP 请求的服务器地址。

```java
// point to a server-side endpoint;
String url = \"http://www.xxx.com/server.php\";  
HttpPost httpRequest = new HttpPost(url);  
```

接下来通过一个 `ArrayList` 向 `HttpPost` 对象传入参数，这些参数可以在服务器端通过 POST 数组的方式取出来。

```java
List<NameValuePair> params = new ArrayList<NameValuePair>();  
params.add(new BasicNameValuePair(\"param0\", \"content0\"));  
params.add(new BasicNameValuePair(\"param1\", \"content1\"));  
params.add(new BasicNameValuePair(\"param1\", \"content2\"));  
```

然后在“try...catch”块中生成 httpEntity 实体，并设置数据的编码方式，然后将实体赋给 `HttpPost` 对象。这样就构造好了一个完整的 HTTP 请求实体。

```java
HttpEntity httpEntity = new UrlEncodedFormEntity(params, \"utf-8\");  
httpRequest.setEntity(httpEntity);  
```

接下来生成一个 HTTP 客户端，通过客户端的 `execute` 方法即可发送一个 HTTP 实体请求。

```java
HttpClient httpClient = new DefaultHttpClient();  
HttpResponse httpResponse = httpClient.execute(httpRequest);  
```

`HttpResponse` 对象是请求之后的响应对象，它描述着发送的状态等一系列响应信息，我们可以在发送成功后作出响应。

```java
if (httpResponse.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {  
  String result = EntityUtils.toString(httpResponse.getEntity());  
  tv.setText(result);  
  Log.i(TAG, \"result = \" + result);  
} else {  
  tv.setText(\"request error!\");  
} 
```