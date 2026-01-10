---
title: 公式渲染测试
date: 2026-01-10
category: 测试
tags:
  - 测试
  - 公式
excerpt: 测试 KaTeX 公式渲染功能
---

本文用于测试博客系统的数学公式渲染功能，使用 KaTeX 进行渲染。

## 行内公式

行内公式使用 `$` 符号包裹，例如：$E = mc^2$。

更多行内公式示例：
- 勾股定理：$a^2 + b^2 = c^2$
- 欧拉公式：$e^{i\pi} + 1 = 0$
- 二次方程求根公式：$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$

## 块级公式

块级公式使用 `$$` 符号包裹，公式会单独占一行显示。

### 基础数学公式

$$
\int_a^b f(x) dx = F(b) - F(a)
$$

$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$

$$
\prod_{i=1}^{n} i = n!
$$

### 矩阵

$$
\begin{pmatrix}
a & b \\
c & d
\end{pmatrix}
$$

$$
\begin{bmatrix}
1 & 2 & 3 \\
4 & 5 & 6 \\
7 & 8 & 9
\end{bmatrix}
$$

### 分数和根号

$$
\frac{a}{b} + \frac{c}{d} = \frac{ad + bc}{bd}
$$

$$
\sqrt{x^2 + y^2}
$$

$$
\sqrt[n]{x}
$$

### 上下标

$$
x_1, x_2, \ldots, x_n
$$

$$
x^2, x^3, x^n
$$

$$
x_i^2
$$

### 希腊字母

$$
\alpha, \beta, \gamma, \delta, \epsilon, \theta, \lambda, \mu, \pi, \sigma, \omega
$$

$$
\Gamma, \Delta, \Theta, \Lambda, \Sigma, \Omega
$$

### 三角函数

$$
\sin(x), \cos(x), \tan(x)
$$

$$
\sin^2(x) + \cos^2(x) = 1
$$

### 极限和导数

$$
\lim_{x \to \infty} \frac{1}{x} = 0
$$

$$
\lim_{x \to 0} \frac{\sin(x)}{x} = 1
$$

$$
\frac{d}{dx} x^n = nx^{n-1}
$$

$$
\frac{d}{dx} \sin(x) = \cos(x)
$$

### 积分

$$
\int x^n dx = \frac{x^{n+1}}{n+1} + C
$$

$$
\int e^x dx = e^x + C
$$

$$
\int \frac{1}{x} dx = \ln|x| + C
$$

### 微分方程

$$
\frac{dy}{dx} + P(x)y = Q(x)
$$

$$
y'' + ay' + by = 0
$$

### 概率统计

$$
P(A|B) = \frac{P(B|A)P(A)}{P(B)}
$$

$$
\mu = \frac{1}{n}\sum_{i=1}^{n} x_i
$$

$$
\sigma^2 = \frac{1}{n}\sum_{i=1}^{n}(x_i - \mu)^2
$$

### 复杂公式

$$
f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!}(x-a)^n
$$

$$
\oint_C \mathbf{E} \cdot d\mathbf{l} = -\frac{d}{dt}\iint_S \mathbf{B} \cdot d\mathbf{S}
$$

$$
\frac{\partial^2 u}{\partial t^2} = c^2 \nabla^2 u
$$

### 括号和分隔符

$$
\left( \frac{a}{b} \right)
$$

$$
\left[ \frac{a}{b} \right]
$$

$$
\left\{ \frac{a}{b} \right\}
$$

$$
\left| \frac{a}{b} \right|
$$

$$
\left\| \frac{a}{b} \right\|
$$

## 总结

以上测试涵盖了 KaTeX 支持的主要数学公式类型，包括：
- 行内公式和块级公式
- 基础运算符
- 分数和根号
- 上下标
- 希腊字母
- 三角函数
- 极限、导数和积分
- 矩阵
- 复杂的数学表达式

所有公式都应该能够正确渲染显示。
