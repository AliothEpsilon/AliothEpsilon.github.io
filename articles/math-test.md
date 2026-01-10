---
title: 数学公式测试
date: 2026-01-10
category: 测试
tags:  
  - Markdown
  - 写作
  - 教程
excerpt: 本文档用于测试 MathJax 3.2.2 的数学公式渲染功能。
---

本文档用于测试 MathJax 3.2.2 的数学公式渲染功能。

## 行内公式测试

这是一个行内公式示例：$E = mc^2$。这是另一个行内公式：$a^2 + b^2 = c^2$。

测试上标和下标：$x_1, x_2, \ldots, x_n$ 和 $x^{n+1}$。

测试分数：$\frac{a}{b}$ 和 $\frac{1}{2}$。

## 块级公式测试

### 基本公式

$$
E = mc^2
$$

$$
a^2 + b^2 = c^2
$$

### 积分公式

$$
\int_{a}^{b} f(x) dx = F(b) - F(a)
$$

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

### 求和公式

$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$

$$
\sum_{k=1}^{\infty} \frac{1}{k^2} = \frac{\pi^2}{6}
$$

### 矩阵公式

$$
A = \begin{pmatrix}
a_{11} & a_{12} & a_{13} \\
a_{21} & a_{22} & a_{23} \\
a_{31} & a_{32} & a_{33}
\end{pmatrix}
$$

### 方程组

$$
\begin{cases}
x + y + z = 6 \\
2x + y - z = 1 \\
3x - 2y + z = 4
\end{cases}
$$

### 极限公式

$$
\lim_{x \to 0} \frac{\sin x}{x} = 1
$$

$$
\lim_{n \to \infty} \left(1 + \frac{1}{n}\right)^n = e
$$

### 导数公式

$$
\frac{d}{dx} x^n = nx^{n-1}
$$

$$
\frac{d}{dx} e^x = e^x
$$

### 复杂公式

$$
f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!} (x-a)^n
$$

$$
\oint_{\partial D} \mathbf{E} \cdot d\mathbf{l} = -\frac{d}{dt} \iint_D \mathbf{B} \cdot d\mathbf{S}
$$

### 对齐公式

$$
\begin{aligned}
(a + b)^2 &= a^2 + 2ab + b^2 \\
(a - b)^2 &= a^2 - 2ab + b^2 \\
(a + b)(a - b) &= a^2 - b^2
\end{aligned}
$$

### 矩阵换行示例（使用 aligned）

$$
\begin{aligned}
\mathbf{X} &= 
\begin{bmatrix}
x_1 & x_2 & x_3
\end{bmatrix} \\
&\quad
\begin{bmatrix}
w_1 \\ w_2 \\ w_3
\end{bmatrix}
\end{aligned}
$$

### 希腊字母

$$
\alpha, \beta, \gamma, \delta, \epsilon, \zeta, \eta, \theta, \iota, \kappa, \lambda, \mu, \nu, \xi, \pi, \rho, \sigma, \tau, \upsilon, \phi, \chi, \psi, \omega
$$

$$
\Gamma, \Delta, \Theta, \Lambda, \Xi, \Pi, \Sigma, \Phi, \Psi, \Omega
$$

### 数学符号

$$
\forall x \in \mathbb{R}, \exists y \in \mathbb{R} \text{ such that } x + y = 0
$$

$$
\int_{0}^{\infty} x^n e^{-x} dx = n!
$$

### 统计公式

$$
\bar{x} = \frac{1}{n} \sum_{i=1}^{n} x_i
$$

$$
\sigma^2 = \frac{1}{n} \sum_{i=1}^{n} (x_i - \bar{x})^2
$$

### 线性代数

$$
\mathbf{A}\mathbf{x} = \mathbf{b}
$$

$$
\det(\mathbf{A}) = \sum_{\sigma \in S_n} \text{sgn}(\sigma) \prod_{i=1}^{n} a_{i,\sigma(i)}
$$

### 微分方程

$$
\frac{dy}{dx} + P(x)y = Q(x)
$$

$$
y = e^{-\int P(x)dx} \left[ \int Q(x) e^{\int P(x)dx} dx + C \right]
$$

### 三角函数

$$
\sin^2 \theta + \cos^2 \theta = 1
$$

$$
\tan \theta = \frac{\sin \theta}{\cos \theta}
$$

### 欧拉公式

$$
e^{i\pi} + 1 = 0
$$

$$
e^{ix} = \cos x + i\sin x
$$

### 向量运算

$$
\mathbf{a} \cdot \mathbf{b} = |\mathbf{a}| |\mathbf{b}| \cos \theta
$$

$$
\mathbf{a} \times \mathbf{b} = |\mathbf{a}| |\mathbf{b}| \sin \theta \mathbf{n}
$$

## 深色主题测试

MathJax 应该能够正确适配深色主题，公式颜色会自动调整。

## 总结

以上测试涵盖了 MathJax 3.2.2 的主要功能：
- 行内公式（$...$）
- 块级公式（$$...$$）
- 上标、下标
- 分数
- 积分
- 求和
- 矩阵
- 方程组
- 极限
- 导数
- 对齐公式
- 希腊字母
- 数学符号
- 统计公式
- 线性代数
- 微分方程
- 三角函数
- 欧拉公式
- 向量运算

所有公式都应该正确渲染，并且不受 Markdown 正文行高的影响。
