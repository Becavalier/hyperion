---
title: 基于 NumPy 和 TensorFlow 的简单 KNN 实现
intro: 最近花了点时间分别用 NumPy 和 TensorFlow 实现了一个简单基础的 KNN 算法。对于两种实现而言，KNN 算法的原理与常见的问题都是一致的。这里主要记录下实现的代码过程，同时讨论下 KNN 算法本身的一些问题。所有实现均基于 Python3，需要的相关 Lib 可以通过 Pip 进行安装。
comments: true
date: 2017-05-26 22:50:24
tags:
- KNN
- TensorFlow
---


最近花了点时间分别用 NumPy 和 TensorFlow 实现了一个简单基础的 KNN 算法。对于两种实现而言，KNN 算法的原理与常见的问题都是一致的。这里主要记录下实现的代码过程，同时讨论下 KNN 算法本身的一些问题。所有实现均基于 Python3，需要的相关 Lib 可以通过 Pip 进行安装。



#### 1、资源：

1. 仓库地址：[https://github.com/Becavalier/MachineLearning](https://github.com/Becavalier/MachineLearning)；
2. 实验数据地址：[http://archive.ics.uci.edu/ml/](http://archive.ics.uci.edu/ml/)；

#### 2、遇到的问题：

1. 为了防止单一特征的数值过大影响欧氏距离的计算，在进行距离计算前统一进行归一化处理；
2. 训练样本的数量分布不均匀，集中在某几个类型的样本数量过多，若最后采用“K 距离内的多数表决法”，则数量多的样本会对最后结果产生影响。因此最后采用距离权重的方式来进行表决；
3. 欧式距离并不适合该模型的惰性训练和预测，可能原因是：并不是所有给出的特征都与最后需要进行分类的特征有很强的相关性，最后的分类结果大多会受到这些无用特征的影响，这些特征变成了噪声；
4. 计算**距离权重**的方式可以采用距离倒数或者高斯函数的方式；
5. 最优 K 可以通过交叉验证的方式进行测量；

#### 3、待优化：

1. 高斯函数代替距离权重；
2. 交叉检验；
3. TensorFlow 替代；


#### 4、源代码：

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-

&quot; KNN - Machine Learning &quot;

__author__ = 'YHSPY'

from numpy import *
import operator
import argparse
import os
import matplotlib
import matplotlib.pyplot as plt
import tensorflow as tf

&quot; Cloumns setting&quot;
features = ('Sex', 'Length', 'Diameter', 'Height', 'Whole weight', 'Shucked weight', 'Viscera weight', 'Shell weight', 'Rings')
classification_feature = 'Rings'
classification_number = 29


def features_normalization (features):
    row_count = features.shape[0]
    min = features.min(axis = 0)
    max = features.max(axis = 0)

    step = max - min

    normalization_matrix = zeros(features.shape)
    normalization_matrix = features - tile(min, [row_count, 1])
    normalization_matrix = normalization_matrix / tile(step, [row_count, 1])
    return normalization_matrix, step, min


def process_input_samples (path):
    samples_file_handler = open(path, mode='r')
    formatted_samples_class = []
    sample_index = 0

    samples_all_lines = samples_file_handler.readlines()
    samples_all_lines_len = len(samples_all_lines)
    samples_features_len = len(features)

    &quot; Generate a matrix with zero&quot;
    samples_all_matrix = zeros([samples_all_lines_len, samples_features_len - 1])
    for line in samples_all_lines:
        line = line.strip()
        sample_features_list = line.split(',')
        samples_all_matrix[sample_index, :] = sample_features_list[:samples_features_len - 1]
        formatted_samples_class.append(int(sample_features_list[-1]))
        sample_index += 1
    return samples_all_matrix, formatted_samples_class



def handle_samples (path):
    samples_all_matrix, formatted_samples_class = process_input_samples(path)
    normalization_matrix, step, min = features_normalization(samples_all_matrix)
    return normalization_matrix, step, min, formatted_samples_class


def handle_testcase_samples(path, step, min):
    samples_all_matrix, classification_initial_list  = process_input_samples(path)
    &quot; Normalization according to previous training set &quot;
    row_count = samples_all_matrix.shape[0]
    normalization_matrix = zeros(samples_all_matrix.shape)
    normalization_matrix = samples_all_matrix - tile(min, [row_count, 1])
    normalization_matrix = normalization_matrix / tile(step, [row_count, 1])

    return normalization_matrix


def handle_samples_with_tensorflow (path):
    process_input_samples(path)

parser = argparse.ArgumentParser (description='KNN - YHSPY')
parser.add_argument('--samples', help = 'Input the path of sample file for KNN algorithm')
parser.add_argument('--test', help = 'Input the path of predict samples file.')
parser.add_argument('--ts', help = 'Use tensorflow as an analysis tool', action = 'store_true')

&quot; Extract input parameters &quot;
samples_path = parser.parse_args().samples
testcase_samples_path = parser.parse_args().test
use_tensorflow = parser.parse_args().ts

if os.path.exists(samples_path):
    if use_tensorflow:
        handle_samples_with_tensorflow(samples_path)
    else:
        samples_all_matrix, step, min, formatted_samples_class = handle_samples(samples_path)
        samples_all_testcase_matrix = handle_testcase_samples(testcase_samples_path, step, min)
        row_count = samples_all_matrix.shape[0]

        for testcasae in samples_all_testcase_matrix:
            diffMat = tile(testcasae, [row_count, 1]) - samples_all_matrix
            &quot; argsort return the index of elements after sorted&quot;
            distance = ((diffMat ** 2).sum(axis = 1)) ** 0.5
            distanceSorted = distance.argsort()
            voteCount = {}

            &quot; General k&quot;
            for i in range(int(len(samples_all_matrix) ** 0.5)):
                voteLable = formatted_samples_class[distanceSorted[i]]
                voteCount[voteLable] = voteCount.get(voteLable, 0) + (1 / distance[distanceSorted[i]])
            &quot; itermitems return an iterator used for dict &quot;
            sortedVotes = sorted(voteCount.items(), key = operator.itemgetter(1), reverse = True)
            print (sortedVotes[0][0])
else:
    raise Exception('[Exception] Invalid path of input samples.')

```
